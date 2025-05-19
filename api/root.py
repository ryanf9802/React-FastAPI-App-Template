from contextlib import asynccontextmanager
from fastapi import APIRouter, FastAPI

import logging
import services.logging.Logger as Logger
from services.auth.router import router as auth_router
from services.health.router import router as health_router
from services.database import Base, engine

from util.middleware import LogRequestMiddleware, RequestUIDMiddleware, CORSMiddleware

Logger.initialize_logging()
logger = logging.getLogger(__name__)


# ------------------------------------------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(_: FastAPI):
    # Create database tables on application startup
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created")
    
    yield
    
    logger.info("Application shutting down")

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

api_router.include_router(auth_router)
api_router.include_router(health_router)

app.add_middleware(LogRequestMiddleware)
app.add_middleware(RequestUIDMiddleware)
app.add_middleware(CORSMiddleware)

app.include_router(api_router)

logger.info("FastAPI Server Initialized")
