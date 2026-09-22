from pathlib import Path
import tempfile
from backend.app.security.url_extractor import extract_urls
from backend.app.security.ocr import extract_text_from_image
from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.app.ai.ollama_client import analyze_image
from backend.app.security.threat_engine import analyze_threat

router = APIRouter()


@router.post("/analyze")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are supported.",
        )

    suffix = Path(file.filename or "").suffix or ".png"
    temp_path = None

    try:
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded image is empty.",
            )

        with tempfile.NamedTemporaryFile(
            suffix=suffix,
            delete=False,
        ) as temp_file:
            temp_file.write(image_bytes)
            temp_path = temp_file.name

        ocr_text = extract_text_from_image(temp_path)
        
        observation = analyze_image(temp_path)
        observation.visible_text = ocr_text

        observation.urls = extract_urls(observation.visible_text)

        threat_analysis = analyze_threat(observation)

        return {
            "observation": observation.model_dump(),
            "analysis": threat_analysis.model_dump(),
        }

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Image analysis failed: {exc}",
        ) from exc
    finally:
        if temp_path:
            Path(temp_path).unlink(missing_ok=True)