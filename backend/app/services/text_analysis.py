
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
from app.intelligence.evidence_retrieval import (
    retrieve_evidence,
)


def analyze_text(request: TextAnalysisRequest):
    """
    Analyze submitted text using preliminary indicators
    and retrieve candidate evidence for extracted claims.

    Retrieved evidence does not establish whether a claim
    is true or false.
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

    # Limit searches to the first 3 candidate claims
    # to control API usage.
    evidence_for_claims = []

    for claim in claims[:3]:
        try:
            evidence = retrieve_evidence(claim)
        except Exception:
            evidence = {
                "status": "retrieval_error",
                "query": claim,
                "results": [],
                "message": "Evidence retrieval failed.",
            }

        evidence_for_claims.append({
            "claim": claim,
            "evidence": evidence,
            })

    return {
        "status": "analysis_with_evidence_candidates",
        "message": (
            "Candidate claims and textual indicators "
            "generated. Evidence search was attempted "
            "for up to 3 claims. Retrieved sources are "
            "evidence candidates, not verified facts. "
            "Automated factual verification is not "
            "implemented."
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
            "evidence_for_claims": evidence_for_claims,
        },
    }
