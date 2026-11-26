import pytest

from app.schemas.requests import TextAnalysisRequest
from app.services import text_analysis


def stub_analysis_functions(monkeypatch, claims):
    """Replace analysis modules with predictable test results."""
    monkeypatch.setattr(
        text_analysis,
        "extract_claims",
        lambda text: claims,
    )
    monkeypatch.setattr(
        text_analysis,
        "calculate_credibility_indicators",
        lambda text: {"score": 0},
    )
    monkeypatch.setattr(
        text_analysis,
        "detect_emotional_manipulation",
        lambda text: {"detected": []},
    )
    monkeypatch.setattr(
        text_analysis,
        "scan_logical_fallacies",
        lambda text: {"detected": []},
    )
    monkeypatch.setattr(
        text_analysis,
        "analyze_source_and_author",
        lambda text: {"sources": []},
    )


def make_request(
    text="Sample claim for testing.",
    include_provenance=False,
):
    return TextAnalysisRequest(
        text=text,
        language="en",
        domain="social",
        include_provenance=include_provenance,
    )


def test_successful_retrieval_and_evaluation(monkeypatch):
    claims = ["The sample claim is true."]
    stub_analysis_functions(monkeypatch, claims)

    evidence_result = {
        "status": "success",
        "query": claims[0],
        "results": [{"title": "Sample source"}],
    }

    evaluation_result = {
        "claim": claims[0],
        "results": [
            {
                "relation": "context_only",
                "title": "Sample source",
            }
        ],
    }

    monkeypatch.setattr(
        text_analysis,
        "retrieve_evidence",
        lambda claim: evidence_result,
    )
    monkeypatch.setattr(
        text_analysis,
        "evaluate_evidence",
        lambda claim, results: evaluation_result,
    )

    response = text_analysis.analyze_text(make_request())
    input_data = response["input"]
    item = input_data["evidence_for_claims"][0]

    assert response["status"] == "analysis_with_evidence_candidates"
    assert item["evidence"]["status"] == "success"
    assert item["evidence_evaluation"]["status"] == "success"
    assert item["evidence_evaluation"]["results"][0]["relation"] == "context_only"


def test_retrieval_failure_skips_evaluation(monkeypatch):
    claims = ["A sample claim."]
    stub_analysis_functions(monkeypatch, claims)

    def fail_retrieval(claim):
        raise RuntimeError("Simulated retrieval failure")

    def unexpected_evaluation(claim, results):
        pytest.fail("Evaluation should not run after retrieval failure")

    monkeypatch.setattr(
        text_analysis,
        "retrieve_evidence",
        fail_retrieval,
    )
    monkeypatch.setattr(
        text_analysis,
        "evaluate_evidence",
        unexpected_evaluation,
    )

    response = text_analysis.analyze_text(make_request())
    item = response["input"]["evidence_for_claims"][0]

    assert item["evidence"]["status"] == "retrieval_error"
    assert item["evidence_evaluation"]["status"] == "not_evaluated"


def test_evaluation_failure_keeps_response_available(monkeypatch):
    claims = ["A sample claim."]
    stub_analysis_functions(monkeypatch, claims)

    monkeypatch.setattr(
        text_analysis,
        "retrieve_evidence",
        lambda claim: {
            "status": "success",
            "results": [{"title": "Sample source"}],
        },
    )

    def fail_evaluation(claim, results):
        raise RuntimeError("Simulated evaluation failure")

    monkeypatch.setattr(
        text_analysis,
        "evaluate_evidence",
        fail_evaluation,
    )

    response = text_analysis.analyze_text(make_request())
    item = response["input"]["evidence_for_claims"][0]

    assert response["status"] == "analysis_with_evidence_candidates"
    assert item["evidence"]["status"] == "success"
    assert item["evidence_evaluation"]["status"] == "evaluation_error"


def test_only_first_three_claims_are_searched(monkeypatch):
    claims = [
        "Claim one.",
        "Claim two.",
        "Claim three.",
        "Claim four.",
        "Claim five.",
    ]
    stub_analysis_functions(monkeypatch, claims)

    searched_claims = []

    def fake_retrieval(claim):
        searched_claims.append(claim)
        return {
            "status": "success",
            "results": [],
        }

    monkeypatch.setattr(
        text_analysis,
        "retrieve_evidence",
        fake_retrieval,
    )
    monkeypatch.setattr(
        text_analysis,
        "evaluate_evidence",
        lambda claim, results: {
            "claim": claim,
            "results": [],
        },
    )

    response = text_analysis.analyze_text(make_request())
    summary = response["input"]["evidence_search_summary"]

    assert searched_claims == claims[:3]
    assert summary["total_candidate_claims"] == 5
    assert summary["searched_claims"] == 3
    assert summary["unsearched_claims"] == 2
    assert summary["maximum_claims_per_request"] == 3


@pytest.mark.parametrize(
    ("include_provenance", "expected_status"),
    [
        (True, "not_implemented"),
        (False, "not_requested"),
    ],
)
def test_provenance_status(
    monkeypatch,
    include_provenance,
    expected_status,
):
    claims = []
    stub_analysis_functions(monkeypatch, claims)

    response = text_analysis.analyze_text(
        make_request(include_provenance=include_provenance)
    )

    assert (
        response["input"]["provenance_analysis_status"]
        == expected_status
    )


def test_evidence_search_summary_with_no_claims(monkeypatch):
    claims = []
    stub_analysis_functions(monkeypatch, claims)

    response = text_analysis.analyze_text(make_request())
    summary = response["input"]["evidence_search_summary"]

    assert summary["total_candidate_claims"] == 0
    assert summary["searched_claims"] == 0
    assert summary["unsearched_claims"] == 0
