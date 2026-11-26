
def detect_emotional_manipulation(text: str) -> dict:
    """
    Detect emotionally charged language in text.

    This module identifies language patterns only.
    It does not determine whether a news claim is true or false.
    """

    emotional_words = {
        "fear": [
            "terrifying",
            "danger",
            "threat",
            "panic",
            "disaster",
            "fear",
            "crisis",
        ],
        "anger": [
            "furious",
            "outrage",
            "hateful",
            "corrupt",
            "betrayal",
            "revenge",
            "angry",
        ],
        "urgency": [
            "urgent",
            "immediately",
            "act now",
            "before it's too late",
            "share immediately",
            "warning",
        ],
        "excitement": [
            "amazing",
            "incredible",
            "wonderful",
            "unbelievable",
            "miracle",
        ],
    }

    text_lower = text.lower()

    detected_emotions = {}

    for emotion, words in emotional_words.items():
        matches = [
            word for word in words
            if word in text_lower
        ]

        if matches:
            detected_emotions[emotion] = matches

    total_matches = sum(
        len(words) for words in detected_emotions.values()
    )

    return {
        "emotional_language_detected": bool(detected_emotions),
        "detected_emotions": detected_emotions,
        "total_emotional_indicators": total_matches,
        "analysis_type": "rule_based_emotional_language_detection",
        "warning": (
            "Emotional language alone does not prove "
            "that a news claim is false or misleading."
        ),
    }
