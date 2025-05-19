from fastapi import FastAPI

import logging
import services.logging.Logger as Logger

from src.middleware import LogRequestMiddleware, RequestUIDMiddleware, CORSMiddleware

Logger.initialize_logging()
logger = logging.getLogger(__name__)


# ------------------------------------------------------------------------------------------------------------

# All routers must be added here to be present in the application

app = FastAPI()

# ------------------------------------------------------------------------------------------------------------

# Note that for some reason, the last middleware added here is the first applied in request logic

app.add_middleware(LogRequestMiddleware)
app.add_middleware(RequestUIDMiddleware)
app.add_middleware(CORSMiddleware)

# ------------------------------------------------------------------------------------------------------------

logger.info("FastAPI Server Initialized")


@app.get("/", response_model=str, status_code=200)
def root():
    return "Root route"
