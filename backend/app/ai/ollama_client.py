import json
from pathlib import Path

from ollama import Client

from backend.app.ai.prompts import SYSTEM_PROMPT
from backend.app.models.schemas import AIObservation


OLLAMA_HOST = "http://localhost:11434"
MODEL_NAME = "gemma3:4b"

client = Client(host=OLLAMA_HOST)


OBSERVATION_SCHEMA = {
    "type": "object",
    "properties": {
        "visible_text": {"type": "string"},
        "sender": {"type": "string"},
        "subject": {"type": "string"},
        "urls": {
            "type": "array",
            "items": {"type": "string"},
        },
        "call_to_action": {"type": "string"},
        "urgency": {"type": "boolean"},
        "credential_request": {"type": "boolean"},
        "financial_targeting": {"type": "boolean"},
        "impersonation": {"type": "boolean"},
        "account_threat": {"type": "boolean"},
    },
    "required": [
        "visible_text",
        "sender",
        "subject",
        "urls",
        "call_to_action",
        "urgency",
        "credential_request",
        "financial_targeting",
        "impersonation",
        "account_threat",
    ],
}


def analyze_image(image_path: str) -> AIObservation:
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
        format=OBSERVATION_SCHEMA,
    )

    content = response.message.content.strip()

    try:
        result = json.loads(content)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Gemma returned invalid JSON:\n{content}"
        ) from exc

    return AIObservation.model_validate(result)