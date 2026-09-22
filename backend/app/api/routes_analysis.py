from fastapi import APIRouter, File, UploadFile

router = APIRouter()


@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "Image received successfully.",
    }