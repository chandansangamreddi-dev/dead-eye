from app.models.schemas import ThreatAnalysis
from app.security.threat_engine import analyze_threat


def test_phishing_content_is_blocked():
    ai_result = ThreatAnalysis(
        risk_level="HIGH",
        threat_type="Phishing",
        confidence=0.90,
        evidence=["Suspicious phishing indicators"],
        explanation="Suspicious account verification message.",
        recommended_action="Do not click the link.",
        guardian_action="BLOCK",
    )

    result = analyze_threat(
        text=(
            "URGENT! Your account will be suspended today. "
            "Verify your account immediately."
        ),
        urls=[
            "https://secure-account-verification.example/verify"
        ],
        ai_analysis=ai_result,
    )

    assert result.risk_level in {"HIGH", "CRITICAL"}
    assert result.guardian_action == "BLOCK"


def test_benign_content_is_allowed():
    ai_result = ThreatAnalysis(
        risk_level="SAFE",
        threat_type="None",
        confidence=0.95,
        evidence=[],
        explanation="No meaningful security concerns detected.",
        recommended_action="No action required.",
        guardian_action="ALLOW",
    )

    result = analyze_threat(
        text="Your library membership expires next month.",
        urls=[],
        ai_analysis=ai_result,
    )

    assert result.risk_level == "SAFE"
    assert result.guardian_action == "ALLOW"