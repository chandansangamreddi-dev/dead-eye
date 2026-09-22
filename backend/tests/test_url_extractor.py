from backend.app.security.url_extractor import extract_urls


def test_extracts_url():
    text = "Verify your account at https://secure.example.com/login"

    urls = extract_urls(text)

    assert urls == ["https://secure.example.com/login"]


def test_extracts_multiple_urls():
    text = """
    Visit https://example.com/login
    or https://example.org/help
    """

    urls = extract_urls(text)

    assert urls == [
        "https://example.com/login",
        "https://example.org/help",
    ]


def test_removes_trailing_punctuation():
    text = "Visit https://example.com/login."

    urls = extract_urls(text)

    assert urls == ["https://example.com/login"]


def test_empty_text_returns_empty_list():
    assert extract_urls("") == []