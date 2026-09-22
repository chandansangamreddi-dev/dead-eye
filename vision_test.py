import base64
from pathlib import Path

import httpx


IMAGE_PATH = Path("samples/phishing_test.png")

image_data = base64.b64encode(
    IMAGE_PATH.read_bytes()
).decode("utf-8")


payload = {
    "model": "gemma4:latest",
    "messages": [
        {
            "role": "user",
            "content": (
                "Look carefully at this image. "
                "It is a screenshot of a mobile email. "
                "Read the visible text and describe exactly what "
                "you see. Identify the sender, subject, important "
                "message text, URL/domain, and call-to-action. "
                "Do not analyze cybersecurity yet. "
                "Just tell me what is visibly present."
            ),
            "images": [image_data],
        }
    ],
    "stream": False,
}


response = httpx.post(
    "http://localhost:11434/api/chat",
    json=payload,
    timeout=300,
)

response.raise_for_status()

data = response.json()

print("\n🏹 DEAD EYE — VISION SMOKE TEST\n")
print(data["message"]["content"])