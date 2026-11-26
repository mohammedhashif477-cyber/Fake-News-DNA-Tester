
from app.intelligence.source_author_analysis import (
    analyze_source_and_author,
)


def test_detect_url_and_domain():
    text = "Read more: https://www.example.com/news/article"

    result = analyze_source_and_author(text)

    assert result["urls_detected"]
    assert "example.com" in result["domains_detected"]


def test_detect_source_attribution():
    text = "According to the Health Ministry, a report was released."

    result = analyze_source_and_author(text)

    assert result["has_source_reference"]
    assert any(
        item["type"] == "according_to"
        for item in result["attributions_detected"]
    )


def test_detect_author():
    text = "Written by John Smith."

    result = analyze_source_and_author(text)

    assert any(
        item["type"] == "written_by"
        for item in result["attributions_detected"]
    )


def test_no_source_reference():
    text = "The weather is pleasant today."

    result = analyze_source_and_author(text)

    assert result["has_source_reference"] is False
    assert result["domains_detected"] == []
