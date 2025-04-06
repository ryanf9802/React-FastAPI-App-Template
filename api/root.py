from fastapi import FastAPI

import logging
import services.logging.Logger as Logger

from routers import example_user_router

import src.middleware.middleware as middleware

Logger.initialize_logging()
logger = logging.getLogger(__name__)


# ------------------------------------------------------------------------------------------------------------

# All routers must be added here to be present in the application

app = FastAPI()

app.include_router(example_user_router.router)

# ------------------------------------------------------------------------------------------------------------

# Note that for some reason, the last middleware added here is the first applied in request logic

app.add_middleware(middleware.LogRequestMiddleware)
app.add_middleware(middleware.RequestNUIDMiddleware)
app.add_middleware(middleware.CORSMiddleware)

# ------------------------------------------------------------------------------------------------------------

logger.info("FastAPI Server Initialized")

