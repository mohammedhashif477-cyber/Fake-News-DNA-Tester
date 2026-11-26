
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
]

CONTRADICTION_CUES = [
    "false",
    "not true",
    "incorrect",
    "debunked",
    "no evidence",
    "misleading",
    "denied",
    "does not support",
]


def _get_terms(text: str) -> set[str]:
    """
    Convert text into a set of meaningful lowercase terms.
    This is a basic lexical comparison, not semantic analysis.
    """
    words = re.findall(r"\b[a-zA-Z0-9]+\b", text.lower())

    return {
        word
        for word in words
        if word not in STOPWORDS and len(word) > 2
    }


def _contains_phrase(text: str, phrases: list[str]) -> bool:
    text = text.lower()

    return any(phrase in text for phrase in phrases)


def evaluate_evidence(
    claim: str,
    evidence_results: list[dict],
) -> dict:
    """
    Categorize retrieved snippets as preliminary evidence candidates.

    This function does not verify facts. It uses keyword overlap
    and explicit wording cues, so its classifications require review.
    """

    claim_terms = _get_terms(claim)
    evaluated_results = []

    for item in evidence_results:
        title = item.get("title") or ""
        snippet = item.get("snippet") or ""
        text = f"{title} {snippet}".strip()
        evidence_terms = _get_terms(text)

        matched_terms = sorted(claim_terms & evidence_terms)

        if claim_terms:
            relevance = len(matched_terms) / len(claim_terms)
        else:
            relevance = 0.0

        has_contradiction_cue = _contains_phrase(
            text,
            CONTRADICTION_CUES,
        )

        has_support_cue = _contains_phrase(
            text,
            SUPPORT_CUES,
        )

        if relevance < 0.2:
            relation = "context_only"
            explanation = (
                "Limited keyword overlap with the claim."
            )

        elif has_contradiction_cue:
            relation = "potentially_contradicts"
            explanation = (
                "The snippet contains wording associated "
                "with denial or debunking. Human review is needed."
            )

        elif has_support_cue:
            relation = "potentially_supports"
            explanation = (
                "The snippet contains wording associated "
                "with confirmation. Human review is needed."
            )

        else:
            relation = "context_only"
            explanation = (
                "The result is relevant by keyword overlap, "
                "but its stance is unclear."
            )

        evaluated_results.append({
            "title": title,
            "url": item.get("url"),
            "snippet": snippet,
            "retrieval_score": item.get("score"),
            "matched_terms": matched_terms,
            "keyword_relevance": round(relevance, 3),
            "relation": relation,
            "explanation": explanation,
        })

    return {
        "claim": claim,
        "results": evaluated_results,
        "message": (
            "Preliminary keyword-based evidence categorization. "
            "These labels are not factual verification and "
            "may be inaccurate."
        ),
    }
