from typing import Literal

from pydantic import BaseModel, Field


RiskLevel = Literal["SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL"]
GuardianAction = Literal["ALLOW", "WARN", "BLOCK"]


class AIObservation(BaseModel):
    visible_text: str = ""
    sender: str = ""
    subject: str = ""
    urls: list[str] = []
    call_to_action: str = ""

    urgency: bool = False
    credential_request: bool = False
    financial_targeting: bool = False
    impersonation: bool = False
    account_threat: bool = False


class ThreatAnalysis(BaseModel):
    risk_level: RiskLevel
    threat_type: str
    confidence: float = Field(ge=0.0, le=1.0)

    evidence: list[str]

    explanation: str

    recommended_action: str

    guardian_action: GuardianAction