from backend.app.security.ocr import extract_text_from_image


text = extract_text_from_image("samples/phishing_test.png")

print("\n===== OCR OUTPUT =====\n")
print(text)
print("\n======================\n")