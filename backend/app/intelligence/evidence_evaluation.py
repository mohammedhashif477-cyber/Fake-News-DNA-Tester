
import re


STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were",
    "be", "been", "being", "to", "of", "in", "on",
    "at", "for", "and", "or", "but", "with", "by",
    "from", "as", "that", "this", "it", "its",
    "has", "have", "had", "will", "would", "can",
    "could", "should", "do", "does", "did",
}


SUPPORT_CUES = [
    "confirmed",
    "confirms",
    "according to",
    "officially announced",
    "verified",
    "evidence shows",
    "found that",
    "study found",
    "research shows",
    "supports the claim",
    "provides evidence for",
]


CONTRADICTION_CUES = [
    "no evidence",
    "there is no evidence",
    "there is insufficient evidence",
    "not enough evidence",
    "lack of evidence",
    "not supported by evidence",
    "does not support",
    "does not cure",
    "cannot cure",
    "not a cure",
    "not proven",
    "not been proven",
    "not scientifically proven",
    "not established",
    "has not been established",
    "false claim",
    "is false",
    "not true",
    "incorrect",
    "debunked",
    "misleading",
    "denied",
]


def _get_terms(text: str) -> set[str]:
    """
    Convert text into meaningful lowercase English terms.

    This is lexical comparison, not semantic analysis.
    """

    words = re.findall(
        r"\b[a-zA-Z0-9]+\b",
        text.lower(),
    )

    return {
        word
        for word in words
        if word not in STOPWORDS and len(word) > 2
    }


def _find_cues(
    text: str,
    phrases: list[str],
) -> list[str]:
    """
    Return cue phrases found in the text.

    Matching is case-insensitive and supports flexible
    whitespace between words.
    """

    text = text.lower()
    found_cues = []

    for phrase in phrases:
        pattern = re.escape(phrase)
        pattern = pattern.replace(r"\ ", r"\s+")

        pattern = (
            r"(?<!\w)"
            + pattern
            + r"(?!\w)"
        )

        if re.search(pattern, text):
            found_cues.append(phrase)

    return found_cues


def _remove_simple_negated_cues(
    text: str,
    cues: list[str],
) -> list[str]:
    """
    Ignore a few common phrases where a cue is negated.

    This is a simple rule-based safeguard, not full
    natural-language negation understanding.
    """

    text = text.lower()

    if re.search(
        r"\b(?:not|isn't|is not)\s+false\b",
        text,
    ):
        cues = [
            cue for cue in cues
            if cue not in {"false", "is false"}
        ]

    if re.search(
        r"\b(?:not|isn't|is not)\s+misleading\b",
        text,
    ):
        cues = [
            cue for cue in cues
            if cue != "misleading"
        ]

    return cues


def evaluate_evidence(
    claim: str,
    evidence_results: list[dict],
) -> dict:
    """
    Categorize retrieved snippets as preliminary
    evidence candidates.

    Uses keyword overlap and wording cues.

    This function does not verify facts and does not
    perform semantic stance detection.
    """

    claim_terms = _get_terms(claim)
    evaluated_results = []

    for item in evidence_results:
        title = item.get("title") or ""
        snippet = item.get("snippet") or ""

        text = f"{title} {snippet}".strip()

        evidence_terms = _get_terms(text)

        matched_terms = sorted(
            claim_terms & evidence_terms
        )

        if claim_terms:
            relevance = (
                len(matched_terms)
                / len(claim_terms)
            )
        else:
            relevance = 0.0

        contradiction_cues = _find_cues(
            text,
            CONTRADICTION_CUES,
        )

        support_cues = _find_cues(
            text,
            SUPPORT_CUES,
        )

        contradiction_cues = (
            _remove_simple_negated_cues(
                text,
                contradiction_cues,
            )
        )

        support_cues = (
            _remove_simple_negated_cues(
                text,
                support_cues,
            )
        )

        has_contradiction = bool(
            contradiction_cues
        )

        has_support = bool(support_cues)

        if relevance < 0.2:
            relation = "context_only"

            explanation = (
                "Limited keyword overlap with "
                "the claim."
            )

        elif (
            has_contradiction
            and has_support
        ):
            relation = "context_only"

            explanation = (
                "The snippet contains both supporting "
                "and contradicting wording. Its overall "
                "position is unclear and requires review."
            )

        elif has_contradiction:
            relation = "potentially_contradicts"

            explanation = (
                "The snippet contains wording associated "
                "with denial, lack of evidence, or "
                "debunking. Human review is needed."
            )

        elif has_support:
            relation = "potentially_supports"

            explanation = (
                "The snippet contains wording associated "
                "with confirmation or supporting evidence. "
                "Human review is needed."
            )

        else:
            relation = "context_only"

            explanation = (
                "The result has keyword overlap with "
                "the claim, but its stance is unclear."
            )

        evaluated_results.append({
            "title": title,
            "url": item.get("url"),
            "snippet": snippet,
            "retrieval_score": item.get("score"),
            "matched_terms": matched_terms,
            "keyword_relevance": round(
                relevance,
                3,
            ),
            "relation": relation,
            "explanation": explanation,
            "detected_support_cues": support_cues,
            "detected_contradiction_cues": (
                contradiction_cues
            ),
        })

    return {
        "claim": claim,
        "results": evaluated_results,
        "message": (
            "Preliminary keyword-based evidence "
            "categorization. These labels are not "
            "factual verification and may be inaccurate."
        ),
    }
