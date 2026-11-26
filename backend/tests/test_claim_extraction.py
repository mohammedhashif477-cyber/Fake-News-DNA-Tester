
from app.intelligence.claim_extraction import extract_claims


def test_extracts_simple_factual_claim():
    text = "The city announced a new metro line."

    claims = extract_claims(text)

    assert claims == [
        "The city announced a new metro line."
    ]


def test_extracts_multiple_factual_claims():
    text = (
        "The city announced a new metro line. "
        "The project will connect five stations."
    )

    claims = extract_claims(text)

    assert len(claims) == 2


def test_ignores_standalone_call_to_action():
    text = (
        "The city announced a new metro line. "
        "Please share this message."
    )

    claims = extract_claims(text)

    assert claims == [
        "The city announced a new metro line."
    ]


def test_extracts_claim_with_health_indicator():
    text = (
        "Drinking lemon water can cure every disease."
    )

    claims = extract_claims(text)

    assert claims == [
        "Drinking lemon water can cure every disease."
    ]


def test_extracts_follow_up_sentence_with_this_claim():
    text = (
        "A report claims that lemon water can cure every disease. "
        "Officials say there is no scientific evidence supporting this claim."
    )

    claims = extract_claims(text)

    assert len(claims) == 2
    assert "this claim" in claims[1].lower()
