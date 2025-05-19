from contextlib import asynccontextmanager
from fastapi import APIRouter, FastAPI

import logging
import services.logging.Logger as Logger
from services.auth.router import router as auth_router

from src.middleware import LogRequestMiddleware, RequestUIDMiddleware, CORSMiddleware

Logger.initialize_logging()
logger = logging.getLogger(__name__)


# ------------------------------------------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(_: FastAPI):
    pass
    yield
    pass

app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

api_router.include_router(auth_router)

app.add_middleware(LogRequestMiddleware)
app.add_middleware(RequestUIDMiddleware)
app.add_middleware(CORSMiddleware)

app.include_router(api_router)

logger.info("FastAPI Server Initialized")
