
from app.intelligence.evidence_retrieval import (
    retrieve_evidence,
)


def test_missing_api_key(monkeypatch):
    monkeypatch.delenv("TAVILY_API_KEY", raising=False)

    result = retrieve_evidence(
        "Example claim for testing"
    )

    assert result["status"] == "api_key_missing"
    assert result["results"] == []
