from fastapi import FastAPI

from backend.app.api.routes_analysis import router as analysis_router
from backend.app.api.routes_health import router as health_router


app = FastAPI(
    title="DEAD EYE",
    description="Local AI-powered cybersecurity analysis engine",
    version="0.1.0",
)


app.include_router(
    health_router,
    prefix="/api",
)

app.include_router(
    analysis_router,
    prefix="/api",
)


@app.get("/")
def root():
    return {
        "name": "DEAD EYE",
        "status": "online",
    }