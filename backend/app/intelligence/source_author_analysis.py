
import re
from urllib.parse import urlparse


def analyze_source_and_author(text: str) -> dict:
    """
    Detect URLs, domains, and explicit source/author
    attribution in text.

    This does not verify source reliability or authorship.
    """

    # Detect URLs
    url_pattern = r"https?://[^\s<>\"']+"
    raw_urls = re.findall(url_pattern, text)

    urls = [
        url.rstrip(".,!?;:)]}")
        for url in raw_urls
    ]

    # Extract domains
    domains = []

    for url in urls:
        parsed_url = urlparse(url)
        domain = parsed_url.netloc.lower()

        if domain.startswith("www."):
            domain = domain[4:]

        if domain and domain not in domains:
            domains.append(domain)

    # Detect attribution phrases
    patterns = {
        "according_to": r"\baccording to\s+([^,.!?;\n]{2,100})",
        "reported_by": r"\breported by\s+([^,.!?;\n]{2,100})",
        "written_by": r"\bwritten by\s+([^,.!?;\n]{2,100})",
        "author": r"\bauthor\s*:\s*([^,.!?;\n]{2,100})",
        "source": r"\bsource\s*:\s*([^,.!?;\n]{2,100})",
    }

    attributions = []

    for attribution_type, pattern in patterns.items():
        matches = re.findall(
            pattern,
            text,
            flags=re.IGNORECASE,
        )

        for match in matches:
            value = match.strip()

            if value:
                attributions.append({
                    "type": attribution_type,
                    "value": value,
                })

    return {
        "urls_detected": urls,
        "domains_detected": domains,
        "attributions_detected": attributions,
        "has_source_reference": bool(urls or attributions),
        "analysis_type": "rule_based_source_author_detection",
        "warning": (
            "Detected references do not establish source "
            "authenticity, author identity, or reliability."
        ),
    }
