import logging
from datetime import datetime

# Level to capture in logs
LOGGING_LEVEL = logging.DEBUG

# Loggers to ignore
IGNORE_LOGGERS = [
    "watchfiles",
]

# Log output directory
LOG_OUTPUT_DIR = "../logs/"

# Log file name
# LOG_FILE_NAME = f"{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.log"
LOG_FILE_NAME = f"API_log.log"
