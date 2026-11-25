
from fastapi import APIRouter

from app.schemas.requests import TextAnalysisRequest
from app.services.text_analysis import analyze_text as analyze_text_service


router = APIRouter(
    prefix="/api/v1/analyze",
    tags=["Text Analysis"]
)


@router.post("/text")
def analyze_text(request: TextAnalysisRequest):
    return analyze_text_service(request)
