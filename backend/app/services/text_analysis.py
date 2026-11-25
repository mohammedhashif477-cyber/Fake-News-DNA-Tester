
from app.schemas.requests import TextAnalysisRequest
from app.intelligence.claim_extraction import extract_claims


def analyze_text(request: TextAnalysisRequest):
    """
    Temporary text analysis service.
    Extracts candidate claims but does not verify them.
    """

    claims = extract_claims(request.text)

    return {
        "status": "received_not_analyzed",
        "message": "Text received. Candidate claims extracted, but verification is not implemented.",
        "input": {
            "language": request.language,
            "domain": request.domain,
            "include_provenance": request.include_provenance,
            "text_length": len(request.text),
            "candidate_claims": claims
        }
    }

