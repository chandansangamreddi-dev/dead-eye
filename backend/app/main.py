from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes_analysis import router as analysis_router
from backend.app.api.routes_health import router as health_router


app = FastAPI(
    title="DEAD EYE",
    description="Local AI-powered cybersecurity analysis engine",
    version="0.1.0",
)


# ---------------------------------------------------------
# Frontend access
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# API routes
# ---------------------------------------------------------

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