from pathlib import Path
import tempfile

from fastapi import APIRouter, File, HTTPException, UploadFile

from backend.app.ai.ollama_client import analyze_image

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

        # Create a temporary file that remains available to Ollama
        # as a separate process.
        with tempfile.NamedTemporaryFile(
            suffix=suffix,
            delete=False,
        ) as temp_file:
            temp_file.write(image_bytes)
            temp_path = temp_file.name

        result = analyze_image(temp_path)

        return result.model_dump()

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Image analysis failed: {exc}",
        ) from exc

    finally:
        # Remove the temporary image after Ollama has finished.
        if temp_path:
            Path(temp_path).unlink(missing_ok=True)