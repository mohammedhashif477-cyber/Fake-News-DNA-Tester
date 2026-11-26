
from app.schemas.requests import TextAnalysisRequest

from app.intelligence.claim_extraction import extract_claims
from app.intelligence.credibility_scoring import (
    calculate_credibility_indicators,
)
from app.intelligence.emotional_manipulation import (
    detect_emotional_manipulation,
)


def analyze_text(request: TextAnalysisRequest):
    """
    Temporary text analysis service.

    Extracts candidate claims and identifies textual indicators.
    Factual verification is not implemented yet.
    """

    claims = extract_claims(request.text)

    credibility_indicators = calculate_credibility_indicators(
        request.text
    )

    emotional_analysis = detect_emotional_manipulation(
        request.text
    )

    return {
        "status": "received_not_analyzed",
        "message": (
            "Text received. Candidate claims and textual "
            "indicators generated. Factual verification "
            "is not implemented."
        ),
        "input": {
            "language": request.language,
            "domain": request.domain,
            "include_provenance": request.include_provenance,
            "text_length": len(request.text),
            "candidate_claims": claims,
            "credibility_indicators": credibility_indicators,
            "emotional_analysis": emotional_analysis,
        },
    }
