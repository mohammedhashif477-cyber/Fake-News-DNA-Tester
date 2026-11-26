
from app.schemas.requests import TextAnalysisRequest

from app.intelligence.claim_extraction import extract_claims
from app.intelligence.credibility_scoring import (
    calculate_credibility_indicators,
)
from app.intelligence.emotional_manipulation import (
    detect_emotional_manipulation,
)
from app.intelligence.logical_fallacy_scanning import (
    scan_logical_fallacies,
)
from app.intelligence.source_author_analysis import (
    analyze_source_and_author,
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
    logical_fallacy_analysis = scan_logical_fallacies(
    request.text
)
    source_author_analysis = analyze_source_and_author(
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
            "logical_fallacy_analysis": logical_fallacy_analysis,
            "source_author_analysis": source_author_analysis,
        },
    }
