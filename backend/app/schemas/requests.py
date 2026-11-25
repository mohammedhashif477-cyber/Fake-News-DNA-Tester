
from typing import Literal

from pydantic import BaseModel, Field


SupportedLanguage = Literal["auto", "en", "hi", "ml", "ta", "kn"]

SupportedDomain = Literal[
    "auto",
    "political",
    "religious",
    "social",
    "environmental",
    "health_medical",
    "financial_economic",
    "technology_ai",
    "social_media_viral",
    "other",
]


class TextAnalysisRequest(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        max_length=10000,
        description="Original text to investigate"
    )

    language: SupportedLanguage = "auto"

    domain: SupportedDomain = "auto"

    include_provenance: bool = False
