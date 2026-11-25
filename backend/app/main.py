from fastapi import FastAPI

app = FastAPI(
    title="Fake News DNA Tester",
    description="An AI-powered misinformation investigation platform",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Fake News DNA Tester backend is running!",
        "status": "success"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "message": "Backend is working properly"
    }


@app.get("/api/info")
def project_info():
    return {
        "project": "Fake News DNA Tester",
        "description": "An AI-powered misinformation investigation platform",
        "backend": "FastAPI",
        "version": "1.0.0"
    }