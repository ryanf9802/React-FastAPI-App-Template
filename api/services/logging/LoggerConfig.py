import logging

LOGGING_LEVEL = logging.DEBUG

IGNORE_LOGGERS = [
    "watchfiles",
    "uvicorn.error",
    "python_multipart.multipart",
    "passlib.handlers.bcrypt",
]

LOG_OUTPUT_DIR = "/app/logs/"

LOG_FILE_NAME = "log.log"
