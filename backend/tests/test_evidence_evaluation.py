
from app.intelligence.evidence_evaluation import (
    evaluate_evidence,
)


def test_relevant_snippet_with_confirmation_cue():
    claim = "The city announced a new metro line"

    results = [
        {
            "title": "Metro project confirmed",
            "url": "https://example.com/metro",
            "snippet": (
                "According to officials, the city announced "
                "a new metro line."
            ),
            "score": 0.9,
        }
    ]

    output = evaluate_evidence(claim, results)

    assert len(output["results"]) == 1
    assert (
        output["results"][0]["relation"]
        == "potentially_supports"
    )


def test_relevant_snippet_with_debunking_cue():
    claim = "The city announced a new metro line"

    results = [
        {
            "title": "Metro announcement claim debunked",
            "url": "https://example.com/fact-check",
            "snippet": (
                "The viral claim about the metro line "
                "is false and has been debunked."
            ),
            "score": 0.8,
        }
    ]

    output = evaluate_evidence(claim, results)

    assert (
        output["results"][0]["relation"]
        == "potentially_contradicts"
    )


def test_unrelated_result_is_context_only():
    claim = "The city announced a new metro line"

    results = [
        {
            "title": "Latest cricket news",
            "url": "https://example.com/cricket",
            "snippet": "The team won the final match.",
            "score": 0.5,
        }
    ]

    output = evaluate_evidence(claim, results)

    assert (
        output["results"][0]["relation"]
        == "context_only"
    )


def test_empty_results():
    output = evaluate_evidence(
        "A sample claim",
        [],
    )

    assert output["results"] == []
