from backend.app.models.schemas import AIObservation
from backend.app.security.threat_engine import analyze_threat


def test_phishing_observation_is_blocked():
    observation = AIObservation(
        visible_text="Your account will be suspended. Verify your password immediately.",
        sender="SecureBank Support",
        subject="URGENT ACCOUNT NOTICE",
        urls=["https://secure-account-verification.example/verify"],
        call_to_action="Verify My Account Now",
        urgency=True,
        credential_request=True,
        financial_targeting=False,
        impersonation=True,
        account_threat=True,
    )

    result = analyze_threat(observation)

    assert result.risk_level in ("HIGH", "CRITICAL")
    assert result.guardian_action == "BLOCK"
    assert result.confidence > 0.7
    assert len(result.evidence) > 0


def test_benign_observation_is_allowed():
    observation = AIObservation(
        visible_text="Your order has been delivered successfully.",
        sender="Amazon",
        subject="Order Delivered",
        urls=["https://amazon.com/orders"],
        call_to_action="View Order",
        urgency=False,
        credential_request=False,
        financial_targeting=False,
        impersonation=False,
        account_threat=False,
    )

    result = analyze_threat(observation)

    assert result.risk_level == "SAFE"
    assert result.guardian_action == "ALLOW"
    assert result.confidence == 0.0
    assert len(result.evidence) == 0