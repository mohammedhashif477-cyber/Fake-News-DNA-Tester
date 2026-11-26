
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


def test_mixed_support_and_contradiction_cues():
    claim = "Lemon water can cure every disease"

    results = [
        {
            "title": "Lemon water health report",
            "url": "https://example.com/lemon",
            "snippet": (
                "Experts confirmed that lemon water is popular, "
                "but there is no evidence it can cure every disease."
            ),
            "score": 0.9,
        }
    ]

    output = evaluate_evidence(claim, results)

    result = output["results"][0]

    assert result["relation"] == "context_only"
    assert "confirmed" in result["detected_support_cues"]
    assert (
        "no evidence"
        in result["detected_contradiction_cues"]
    )


def test_not_false_is_not_detected_as_contradiction():
    claim = "The metro project was announced"

    results = [
        {
            "title": "Metro announcement",
            "url": "https://example.com/metro",
            "snippet": (
                "The claim that the metro project was announced "
                "is not false."
            ),
            "score": 0.8,
        }
    ]

    output = evaluate_evidence(claim, results)

    result = output["results"][0]

    assert result["relation"] == "context_only"
    assert (
        "false"
        not in result["detected_contradiction_cues"]
    )


def test_no_evidence_cue_detected():
    claim = "Lemon water can cure every disease"

    results = [
        {
            "title": "Medical fact check",
            "url": "https://example.com/fact-check",
            "snippet": (
                "There is no evidence that lemon water "
                "can cure every disease."
            ),
            "score": 0.9,
        }
    ]

    output = evaluate_evidence(claim, results)

    result = output["results"][0]

    assert (
        result["relation"]
        == "potentially_contradicts"
    )
    assert (
        "no evidence"
        in result["detected_contradiction_cues"]
    )


def test_detected_cues_are_returned():
    claim = "The city announced a new metro line"

    results = [
        {
            "title": "Metro project confirmed",
            "url": "https://example.com/metro",
            "snippet": (
                "Officials confirmed that the city announced "
                "a new metro line."
            ),
            "score": 0.9,
        }
    ]

    output = evaluate_evidence(claim, results)

    result = output["results"][0]

    assert "confirmed" in result["detected_support_cues"]
    assert result["detected_contradiction_cues"] == []
