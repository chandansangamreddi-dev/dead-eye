from pathlib import Path

import easyocr
from PIL import Image, ImageEnhance


_reader = None


def get_reader():
    global _reader

    if _reader is None:
        _reader = easyocr.Reader(
            ["en"],
            gpu=False,
        )

    return _reader


def preprocess_image(image_path: str) -> str:
    image = Image.open(image_path).convert("RGB")

    width, height = image.size

    # Upscale smaller screenshots to improve OCR accuracy.
    if width < 1600:
        scale = 2
        image = image.resize(
            (width * scale, height * scale),
            Image.Resampling.LANCZOS,
        )

    image = ImageEnhance.Contrast(image).enhance(1.15)
    image = ImageEnhance.Sharpness(image).enhance(1.25)

    output_path = Path(image_path).with_name(
        f"{Path(image_path).stem}_ocr.png"
    )

    image.save(output_path)

    return str(output_path)


def extract_text_from_image(image_path: str) -> str:
    reader = get_reader()

    processed_path = preprocess_image(image_path)

    try:
        results = reader.readtext(processed_path)

        lines = []

        for _, text, confidence in results:
            if confidence >= 0.4:
                lines.append(text)

        return "\n".join(lines)

    finally:
        Path(processed_path).unlink(missing_ok=True)