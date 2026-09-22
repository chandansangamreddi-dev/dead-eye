import re


URL_PATTERN = re.compile(
    r"https?://[^\s<>\"]+",
    re.IGNORECASE,
)


def extract_urls(text: str) -> list[str]:
    """
    Extract URLs directly from visible text.

    This intentionally uses deterministic regex extraction
    instead of relying on an LLM to reproduce URLs exactly.
    """
    if not text:
        return []

    urls = URL_PATTERN.findall(text)

    cleaned_urls = []

    for url in urls:
        url = url.rstrip(".,!?;:)")

        if url not in cleaned_urls:
            cleaned_urls.append(url)

    return cleaned_urls