from urllib.parse import urlparse

from app.models.schemas import GuardianAction, RiskLevel, ThreatAnalysis


SUSPICIOUS_KEYWORDS = {
    "urgent",
    "immediate",
    "verify",
    "suspend",
    "suspended",
    "password",
    "credential",
    "login",
    "account",
    "payment",
    "refund",
    "security alert",
}


def analyze_threat(
    *,
    text: str,
    urls: list[str],
    ai_analysis: ThreatAnalysis,
) -> ThreatAnalysis:
    """
    Combine AI observations with deterministic security signals.

    The AI provides contextual understanding.
    Deterministic rules provide a safety backstop.
    """

    signals: list[str] = []
    score = 0

    normalized_text = text.lower()

    # ---------------------------------------------------------
    # 1. Urgency / pressure
    # ---------------------------------------------------------
    urgency_hits = [
        keyword
        for keyword in (
            "urgent",
            "immediate",
            "today",
            "within 24 hours",
            "act now",
        )
        if keyword in normalized_text
    ]

    if urgency_hits:
        score += 15
        signals.append(
            "Urgency or pressure language detected."
        )

    # ---------------------------------------------------------
    # 2. Account / credential targeting
    # ---------------------------------------------------------
    credential_hits = [
        keyword
        for keyword in (
            "password",
            "login",
            "verify your account",
            "verify identity",
            "credentials",
            "sign in",
        )
        if keyword in normalized_text
    ]

    if credential_hits:
        score += 25
        signals.append(
            "The content requests or pressures the user toward "
            "account or credential verification."
        )

    # ---------------------------------------------------------
    # 3. Suspicious URL structure
    # ---------------------------------------------------------
    for url in urls:
        parsed = urlparse(url)

        hostname = parsed.hostname or ""

        if not hostname:
            score += 20
            signals.append("A malformed or unreadable URL was detected.")
            continue

        # Raw IP addresses are suspicious in many phishing contexts.
        if hostname.replace(".", "").isdigit():
            score += 20
            signals.append(
                f"URL uses an IP address instead of a normal domain: {hostname}"
            )

        # Common suspicious URL patterns.
        suspicious_parts = (
            "verify",
            "secure",
            "login",
            "account",
            "update",
            "confirm",
            "authentication",
        )

        matched_parts = [
            part for part in suspicious_parts
            if part in hostname.lower()
        ]

        if matched_parts:
            score += 15
            signals.append(
                f"URL contains security/account-themed terms: "
                f"{', '.join(matched_parts)}."
            )

        # Excessive subdomains can be suspicious.
        if hostname.count(".") >= 3:
            score += 10
            signals.append(
                f"URL contains an unusually deep subdomain structure: {hostname}"
            )

    # ---------------------------------------------------------
    # 4. Respect strong AI evidence
    # ---------------------------------------------------------
    if ai_analysis.risk_level in {"HIGH", "CRITICAL"}:
        score += 25

    # ---------------------------------------------------------
    # 5. Convert deterministic score to risk
    # ---------------------------------------------------------
    if score >= 70:
        risk_level: RiskLevel = "CRITICAL"
        guardian_action: GuardianAction = "BLOCK"
    elif score >= 45:
        risk_level = "HIGH"
        guardian_action = "BLOCK"
    elif score >= 25:
        risk_level = "MEDIUM"
        guardian_action = "WARN"
    elif score >= 10:
        risk_level = "LOW"
        guardian_action = "WARN"
    else:
        risk_level = "SAFE"
        guardian_action = "ALLOW"

    # ---------------------------------------------------------
    # 6. Preserve AI evidence if deterministic engine found less
    # ---------------------------------------------------------
    combined_evidence = list(dict.fromkeys(
        signals + ai_analysis.evidence
    ))

    return ThreatAnalysis(
        risk_level=risk_level,
        threat_type=ai_analysis.threat_type,
        confidence=max(
            ai_analysis.confidence,
            min(score / 100, 0.99),
        ),
        evidence=combined_evidence,
        explanation=ai_analysis.explanation,
        recommended_action=(
            "Do not interact with the content. Verify the sender "
            "through an official channel."
            if guardian_action == "BLOCK"
            else ai_analysis.recommended_action
        ),
        guardian_action=guardian_action,
    )