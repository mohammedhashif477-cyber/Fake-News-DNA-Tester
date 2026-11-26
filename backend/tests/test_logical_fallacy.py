
from app.intelligence.logical_fallacy_scanning import (
    scan_logical_fallacies,
)


def test_detects_false_dilemma():
    result = scan_logical_fallacies(
        "Either you support this plan or you hate progress."
    )

    assert result["total_indicators"] >= 1
    assert any(
        item["type"] == "false_dilemma"
        for item in result["fallacies_detected"]
    )


def test_detects_appeal_to_fear():
    result = scan_logical_fallacies(
        "You should be afraid before it is too late."
    )

    assert any(
        item["type"] == "appeal_to_fear"
        for item in result["fallacies_detected"]
    )


def test_neutral_text_returns_no_indicators():
    result = scan_logical_fallacies(
        "The meeting will take place on Monday."
    )

    assert result["total_indicators"] == 0
