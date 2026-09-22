from pathlib import Path

from backend.app.security.ocr import extract_text_from_image


SAMPLE_IMAGE = Path("samples/phishing_test.png")


def test_ocr_extracts_text():
    text = extract_text_from_image(str(SAMPLE_IMAGE))

    assert text
    assert "URGENT" in text.upper()