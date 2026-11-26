
import re


def calculate_credibility_indicators(text: str) -> dict:
    """
    Identify basic textual signals that may affect credibility.

    This is a rule-based preliminary analysis.
    It does not verify whether a claim is true or false.
    """

    sensational_words = [
        "shocking",
        "breaking",
        "miracle",
        "secret",
        "exposed",
        "unbelievable",
        "urgent",
        "viral",
        "incredible",
    ]

    certainty_words = [
        "definitely",
        "always",
        "never",
        "100%",
        "undoubtedly",
        "guaranteed",
    ]

    source_phrases = [
        "according to",
        "reported by",
        "said by",
        "official statement",
        "source:",
    ]

    text_lower = text.lower()

    sensational_matches = [
        word for word in sensational_words
        if word in text_lower
    ]

    certainty_matches = [
        word for word in certainty_words
        if word in text_lower
    ]

    source_matches = [
        phrase for phrase in source_phrases
        if phrase in text_lower
    ]

    urls = re.findall(
        r"https?://\S+",
        text
    )

    return {
        "sensational_words_detected": sensational_matches,
        "certainty_words_detected": certainty_matches,
        "source_references_detected": source_matches,
        "urls_detected": len(urls),
        "has_source_reference": bool(source_matches or urls),
        "analysis_type": "rule_based_textual_indicators",
        "warning": (
            "These indicators do not establish whether "
            "the claim is true or false."
        ),
    }
