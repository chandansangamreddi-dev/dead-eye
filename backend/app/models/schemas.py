from typing import Literal

from pydantic import BaseModel, Field


RiskLevel = Literal["SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL"]
GuardianAction = Literal["ALLOW", "WARN", "BLOCK"]


class ThreatAnalysis(BaseModel):
    risk_level: RiskLevel
    threat_type: str
    confidence: float = Field(ge=0.0, le=1.0)

    evidence: list[str]

    explanation: str

    recommended_action: str

    guardian_action: GuardianAction