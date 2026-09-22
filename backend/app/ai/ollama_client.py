import json
from pathlib import Path

from ollama import Client

from app.ai.prompts import SYSTEM_PROMPT
from app.models.schemas import ThreatAnalysis


OLLAMA_HOST = "http://localhost:11434"
MODEL_NAME = "gemma3:4b"

client = Client(host=OLLAMA_HOST)


THREAT_SCHEMA = {
    "type": "object",
    "properties": {
        "risk_level": {
            "type": "string",
            "enum": ["SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL"],
        },
        "threat_type": {
            "type": "string",
        },
        "confidence": {
            "type": "number",
            "minimum": 0,
            "maximum": 1,
        },
        "evidence": {
            "type": "array",
            "items": {"type": "string"},
        },
        "explanation": {
            "type": "string",
        },
        "recommended_action": {
            "type": "string",
        },
        "guardian_action": {
            "type": "string",
            "enum": ["ALLOW", "WARN", "BLOCK"],
        },
    },
    "required": [
        "risk_level",
        "threat_type",
        "confidence",
        "evidence",
        "explanation",
        "recommended_action",
        "guardian_action",
    ],
}


def analyze_image(image_path: str) -> ThreatAnalysis:
    path = Path(image_path).resolve()

    if not path.exists():
        raise FileNotFoundError(f"Image not found: {path}")

    print(f"📷 Sending image to local Gemma: {path}")

    response = client.chat(
        model=MODEL_NAME,
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": """
Analyze the attached image carefully.

IMPORTANT:
This is a mobile email screenshot.

First visually inspect the entire image:
- Read the sender name and sender email address.
- Read the subject line.
- Read the message body.
- Identify URLs or domains visible in the image.
- Identify calls to action.
- Identify urgency, threats, impersonation, credential requests,
  financial targeting, or other social-engineering techniques.

Do NOT describe the image as noise unless it genuinely contains
nothing readable.

Determine whether the content is a cybersecurity threat.

Return ONLY the requested JSON object.
Do not use Markdown.
Do not wrap the JSON in ``` blocks.
""",
                "images": [str(path)],
            },
        ],
        format=THREAT_SCHEMA,
    )

    content = response.message.content.strip()

    try:
        result = json.loads(content)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Gemma returned invalid JSON:\n{content}"
        ) from exc

    return ThreatAnalysis.model_validate(result)