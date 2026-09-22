import re
from urllib.parse import urlparse

from backend.app.models.schemas import (
    AIObservation,
    GuardianAction,
    RiskLevel,
    ThreatAnalysis,
)


def analyze_threat(observation: AIObservation) -> ThreatAnalysis:
    """
    Convert AI observations and visible text into a deterministic
    security verdict.

    The AI observes.
    The Threat Engine decides.
    """

    score = 0
    evidence: list[str] = []

    text = observation.visible_text.lower()

    # ---------------------------------------------------------
    # 1. AI semantic observations
    # ---------------------------------------------------------

    if observation.urgency:
        score += 20
        evidence.append(
            "Urgency or pressure language detected."
        )

    if observation.credential_request:
        score += 30
        evidence.append(
            "The content requests or pressures the user "
            "to verify account or credential information."
        )

    if observation.account_threat:
        score += 20
        evidence.append(
            "The message threatens account suspension or loss "
            "of access."
        )

    if observation.financial_targeting:
        score += 20
        evidence.append(
            "The content appears to target financial information "
            "or financial assets."
        )

    if observation.impersonation:
        score += 20
        evidence.append(
            "The content appears to impersonate another organization "
            "or trusted entity."
        )

    # ---------------------------------------------------------
    # 2. Deterministic text signals
    # ---------------------------------------------------------

    credential_patterns = (
        r"\bverify your identity\b",
        r"\bverify your account\b",
        r"\benter your password\b",
        r"\bprovide your password\b",
        r"\bconfirm your password\b",
        r"\benter your credentials\b",
        r"\bconfirm your identity\b",
    )

    if any(re.search(pattern, text) for pattern in credential_patterns):
        if not observation.credential_request:
            score += 30
            evidence.append(
                "The visible text requests identity or credential verification."
            )

    account_threat_patterns = (
        r"\baccount.{0,40}\bsuspend",
        r"\bsuspend.{0,40}\baccount",
        r"\baccount.{0,40}\brestrict",
        r"\bloss of access\b",
        r"\bpermanent loss\b",
        r"\baccount.{0,40}\bblocked",
    )

    if any(re.search(pattern, text) for pattern in account_threat_patterns):
        if not observation.account_threat:
            score += 20
            evidence.append(
                "The visible text contains an account access threat."
            )

    urgency_patterns = (
        r"\bwithin \d+ hours?\b",
        r"\bimmediately\b",
        r"\burgent\b",
        r"\bfinal notice\b",
        r"\bact now\b",
        r"\bimmediate action\b",
    )

    if any(re.search(pattern, text) for pattern in urgency_patterns):
        if not observation.urgency:
            score += 20
            evidence.append(
                "The visible text contains urgent or time-pressure language."
            )

    financial_patterns = (
        r"\byour funds\b",
        r"\baccount balance\b",
        r"\bbank account\b",
        r"\bcredit card\b",
        r"\bdebit card\b",
        r"\bpayment\b",
        r"\btransaction\b",
    )

    if any(re.search(pattern, text) for pattern in financial_patterns):
        if not observation.financial_targeting:
            score += 20
            evidence.append(
                "The visible text references financial assets or information."
            )

    # ---------------------------------------------------------
    # 3. URL analysis
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
    # 4. Determine final risk
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
    # 5. Confidence
    # ---------------------------------------------------------

    confidence = min(score / 100, 0.99)

    # ---------------------------------------------------------
    # 6. Threat type
    # ---------------------------------------------------------

    if score >= 25:
        threat_type = "Phishing / Social Engineering"
    else:
        threat_type = "No significant threat detected"

    # ---------------------------------------------------------
    # 7. Explanation
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