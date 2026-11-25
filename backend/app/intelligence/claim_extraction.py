
import re


def extract_claims(text: str) -> list[str]:
    """
    Extract candidate factual claims from the submitted text.

    This is a basic rule-based version.
    It does not verify whether claims are true or false.
    """

    # Split the text into sentences
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())

    claims = []

    for sentence in sentences:
        sentence = sentence.strip()

        # Ignore empty sentences
        if not sentence:
            continue

        # Keep sentences that contain a basic factual indicator
        factual_indicators = [
            "is", "are", "was", "were", "has", "have",
            "will", "did", "reported", "according to"
        ]

        if any(
            indicator in sentence.lower().split()
            for indicator in factual_indicators
        ):
            claims.append(sentence)

    return claims
