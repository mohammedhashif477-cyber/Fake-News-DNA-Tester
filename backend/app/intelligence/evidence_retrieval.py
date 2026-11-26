
import os

import httpx


TAVILY_SEARCH_URL = "https://api.tavily.com/search"


def retrieve_evidence(query: str) -> dict:
    """
    Retrieve web search results related to a claim.

    This module retrieves evidence candidates only.
    It does not determine whether a claim is true or false.
    """

    api_key = os.getenv("TAVILY_API_KEY")

    if not api_key:
        return {
            "status": "api_key_missing",
            "query": query,
            "results": [],
            "message": "Tavily API key is not configured.",
        }

    payload = {
        "api_key": api_key,
        "query": query,
        "search_depth": "basic",
        "max_results": 5,
        "include_answer": False,
        "include_raw_content": False,
    }

    try:
        response = httpx.post(
            TAVILY_SEARCH_URL,
            json=payload,
            timeout=20.0,
        )

        response.raise_for_status()
        data = response.json()

    except httpx.HTTPStatusError as exc:
        return {
            "status": "search_error",
            "query": query,
            "results": [],
            "message": (
                f"Tavily returned HTTP "
                f"{exc.response.status_code}."
            ),
        }

    except httpx.RequestError:
        return {
            "status": "connection_error",
            "query": query,
            "results": [],
            "message": "Could not connect to Tavily.",
        }

    results = []

    for item in data.get("results", []):
        results.append({
            "title": item.get("title"),
            "url": item.get("url"),
            "snippet": item.get("content"),
            "score": item.get("score"),
        })

    return {
        "status": "success",
        "query": query,
        "results": results,
        "result_count": len(results),
        "message": (
            "Search results retrieved. "
            "Results are evidence candidates, not verified facts."
        ),
    }
