
import re


FALLACY_PATTERNS = {
    "false_dilemma": [
        r"\beither\b.{1,100}\bor\b.{1,100}",
        r"\bonly two choices\b",
        r"\bthere is no other option\b",
    ],
    "ad_hominem": [
        r"\byou are (stupid|idiot|ignorant)\b",
        r"\bhe is (stupid|an idiot|ignorant)\b",
        r"\bshe is (stupid|an idiot|ignorant)\b",
    ],
    "bandwagon": [
        r"\beveryone knows\b",
        r"\beverybody believes\b",
        r"\bmillions believe\b",
        r"\bmost people believe\b",
    ],
    "appeal_to_fear": [
        r"\byou should be afraid\b",
        r"\bpanic now\b",
        r"\bbefore it is too late\b",
        r"\bthey are coming for you\b",
    ],
    "hasty_generalization": [
        r"\ball (politicians|doctors|journalists|people) are\b",
        r"\bno (politician|doctor|journalist|person) ever\b",
    ],
}


def scan_logical_fallacies(text: str) -> dict:
    detected = []

    for fallacy_name, patterns in FALLACY_PATTERNS.items():
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)

            if match:
                detected.append({
                    "type": fallacy_name,
                    "matched_text": match.group(0),
                    "analysis_type": "rule_based_pattern_detection",
                })
                break

    return {
        "fallacies_detected": detected,
        "total_indicators": len(detected),
        "analysis_type": "rule_based_logical_fallacy_detection",
        "warning": (
            "These are possible reasoning indicators, "
            "not definitive proof of a logical fallacy "
            "or misinformation."
        ),
    }
