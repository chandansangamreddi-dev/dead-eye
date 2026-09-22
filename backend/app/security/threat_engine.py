from urllib.parse import urlparse

from backend.app.models.schemas import (
    AIObservation,
    GuardianAction,
    RiskLevel,
    ThreatAnalysis,
)


def analyze_threat(observation: AIObservation) -> ThreatAnalysis:
    """
    Convert AI observations into a deterministic security verdict.

    The AI observes.
    The Threat Engine decides.
    """

    score = 0
    evidence: list[str] = []

    # ---------------------------------------------------------
    # 1. Urgency
    # ---------------------------------------------------------
    if observation.urgency:
        score += 20
        evidence.append(
            "Urgency or pressure language detected."
        )

    # ---------------------------------------------------------
    # 2. Credential request
    # ---------------------------------------------------------
    if observation.credential_request:
        score += 30
        evidence.append(
            "The content requests or pressures the user "
            "to verify account or credential information."
        )

    # ---------------------------------------------------------
    # 3. Account threat
    # ---------------------------------------------------------
    if observation.account_threat:
        score += 20
        evidence.append(
            "The message threatens account suspension or loss "
            "of access."
        )

    # ---------------------------------------------------------
    # 4. Financial targeting
    # ---------------------------------------------------------
    if observation.financial_targeting:
        score += 20
        evidence.append(
            "The content appears to target financial information "
            "or financial assets."
        )

    # ---------------------------------------------------------
    # 5. Impersonation
    # ---------------------------------------------------------
    if observation.impersonation:
        score += 20
        evidence.append(
            "The content appears to impersonate another organization "
            "or trusted entity."
        )

    # ---------------------------------------------------------
    # 6. URL analysis
    # ---------------------------------------------------------
    for url in observation.urls:
        parsed = urlparse(url)

        hostname = parsed.hostname or ""

        if not hostname:
            score += 20
            evidence.append(
                "A malformed or unreadable URL was detected."
            )
            continue

        hostname_lower = hostname.lower()

        suspicious_terms = (
            "verify",
            "secure",
            "login",
            "account",
            "update",
            "confirm",
            "authentication",
        )

        matched_terms = [
            term
            for term in suspicious_terms
            if term in hostname_lower
        ]

        if matched_terms:
            score += 15
            evidence.append(
                "The URL contains security or account-related "
                "terms: " + ", ".join(matched_terms) + "."
            )

        if hostname.count(".") >= 3:
            score += 10
            evidence.append(
                "The URL contains an unusually deep subdomain structure."
            )

    # ---------------------------------------------------------
    # 7. Determine final risk
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
    # 8. Confidence based on deterministic signal strength
    # ---------------------------------------------------------
    confidence = min(score / 100, 0.99)

    # ---------------------------------------------------------
    # 9. Determine threat type
    # ---------------------------------------------------------
    if score >= 25:
        threat_type = "Phishing / Social Engineering"
    else:
        threat_type = "No significant threat detected"

    # ---------------------------------------------------------
    # 10. Final explanation
    # ---------------------------------------------------------
    if guardian_action == "BLOCK":
        explanation = (
            "Multiple security indicators were detected. "
            "The content should not be interacted with until "
            "its legitimacy is independently verified."
        )
        recommended_action = (
            "Do not click links or provide sensitive information. "
            "Verify the sender through an official channel."
        )

    elif guardian_action == "WARN":
        explanation = (
            "Some suspicious indicators were detected. "
            "Review the content carefully before interacting with it."
        )
        recommended_action = (
            "Verify the sender and destination before proceeding."
        )

    else:
        explanation = (
            "No significant security indicators were detected."
        )
        recommended_action = (
            "No immediate security action is required."
        )

    return ThreatAnalysis(
        risk_level=risk_level,
        threat_type=threat_type,
        confidence=confidence,
        evidence=evidence,
        explanation=explanation,
        recommended_action=recommended_action,
        guardian_action=guardian_action,
    )