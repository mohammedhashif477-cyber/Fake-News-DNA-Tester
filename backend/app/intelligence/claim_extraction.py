
import re


# Sentences that mainly ask the reader to take an action
# rather than presenting a factual claim.
ACTION_PATTERNS = [
    r"^(?:please\s+)?(?:share|forward|send|repost|spread)\b",
    r"^everyone\s+(?:must|should|needs to)\s+"
    r"(?:share|forward|send|repost|spread)\b",
    r"^(?:don't forget to|remember to)\s+"
    r"(?:share|forward|send|repost)\b",
]


# Common English factual and reporting indicators.
FACTUAL_INDICATORS = [
    "is",
    "are",
    "was",
    "were",
    "has",
    "have",
    "had",
    "will",
    "did",
    "reported",
    "according to",
    "claims that",
    "claim that",
    "announced",
    "confirmed",
    "found that",
    "shows that",
    "can cause",
    "can cure",
    "can increase",
    "can reduce",
    "may cause",
    "may cure",
    "will cause",
    "will increase",
    "will reduce",
]


def is_action_sentence(sentence: str) -> bool:
    """
    Identify sentences that mainly contain calls to action.
    This is a simple rule-based filter.
    """

    sentence_lower = sentence.lower().strip()

    return any(
        re.search(pattern, sentence_lower)
        for pattern in ACTION_PATTERNS
    )


def contains_factual_indicator(sentence: str) -> bool:
    """
    Check whether a sentence contains a known factual
    or reporting indicator.
    """

    sentence_lower = sentence.lower()

    return any(
        indicator in sentence_lower
        for indicator in FACTUAL_INDICATORS
    )


def extract_claims(text: str) -> list[str]:
    """
    Extract candidate factual claims from submitted text.

    This is a preliminary rule-based extractor.
    It does not determine whether claims are true or false.
    """

    sentences = re.split(r"(?<=[.!?])\s+", text.strip())

    claims = []

    for sentence in sentences:
        sentence = sentence.strip()

        if not sentence:
            continue

        # Ignore standalone calls to action.
        if is_action_sentence(sentence):
            continue

        # Include sentences containing factual indicators.
        if contains_factual_indicator(sentence):
            claims.append(sentence)

    return claims
