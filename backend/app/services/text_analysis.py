
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
from app.intelligence.evidence_evaluation import (
    evaluate_evidence,
)


MAX_EVIDENCE_CLAIMS = 3


def analyze_text(request: TextAnalysisRequest):
    """
    Analyze submitted text using preliminary indicators
    and retrieve and evaluate candidate evidence.

    Retrieved evidence and keyword-based evaluation
    do not establish whether a claim is true or false.
    """

    claims = extract_claims(request.text)

    credibility_indicators = (
        calculate_credibility_indicators(request.text)
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

    evidence_for_claims = []

    claims_to_search = claims[:MAX_EVIDENCE_CLAIMS]

    for claim in claims_to_search:
        try:
            evidence = retrieve_evidence(claim)

        except Exception:
            evidence = {
                "status": "retrieval_error",
                "query": claim,
                "results": [],
                "message": "Evidence retrieval failed.",
            }

        if evidence.get("status") == "success":
            try:
                evaluation_result = evaluate_evidence(
                    claim,
                    evidence.get("results", []),
                )

                evidence_evaluation = {
                    "status": "success",
                    **evaluation_result,
                }

            except Exception:
                evidence_evaluation = {
                    "status": "evaluation_error",
                    "claim": claim,
                    "results": [],
                    "message": (
                        "Evidence evaluation failed."
                    ),
                }

        else:
            evidence_evaluation = {
                "status": "not_evaluated",
                "claim": claim,
                "results": [],
                "message": (
                    "Evidence evaluation was skipped "
                    "because retrieval was unsuccessful."
                ),
            }

        evidence_for_claims.append({
            "claim": claim,
            "evidence": evidence,
            "evidence_evaluation": evidence_evaluation,
        })

    searched_claim_count = len(claims_to_search)

    unsearched_claim_count = max(
        0,
        len(claims) - searched_claim_count,
    )

    provenance_status = (
        "not_implemented"
        if request.include_provenance
        else "not_requested"
    )

    return {
        "status": "analysis_with_evidence_candidates",
        "message": (
            "Candidate claims and textual indicators "
            "generated. Evidence search was attempted "
            f"for up to {MAX_EVIDENCE_CLAIMS} claims. "
            "Retrieved sources and keyword-based "
            "classifications are preliminary evidence "
            "candidates, not verified facts. "
            "Automated factual verification and "
            "provenance analysis are not implemented."
        ),
        "input": {
            "language": request.language,
            "domain": request.domain,
            "include_provenance": request.include_provenance,
            "text_length": len(request.text),
            "candidate_claims": claims,
            "credibility_indicators": credibility_indicators,
            "emotional_analysis": emotional_analysis,
            "logical_fallacy_analysis": (
                logical_fallacy_analysis
            ),
            "source_author_analysis": (
                source_author_analysis
            ),
            "evidence_for_claims": evidence_for_claims,
            "evidence_search_summary": {
                "total_candidate_claims": len(claims),
                "searched_claims": searched_claim_count,
                "unsearched_claims": (
                    unsearched_claim_count
                ),
                "maximum_claims_per_request": (
                    MAX_EVIDENCE_CLAIMS
                ),
            },
            "provenance_analysis_status": (
                provenance_status
            ),
        },
    }
