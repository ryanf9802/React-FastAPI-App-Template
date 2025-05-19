import os
import logging
from logging.handlers import RotatingFileHandler
from services.logging.util.logger_util import ExcludeLoggersFilter
import services.logging.LoggerConfig as LogConfig


def initialize_logging():
    log_dir = os.path.abspath(LogConfig.LOG_OUTPUT_DIR)
    os.makedirs(log_dir, exist_ok=True)
    log_path = os.path.join(log_dir, LogConfig.LOG_FILE_NAME)

    root = logging.getLogger()

    for handler in root.handlers[:]:
        root.removeHandler(handler)

    file_handler = RotatingFileHandler(
        filename=log_path,
        mode="a",
        maxBytes=10 * 1024 * 1024,
        backupCount=5,
        encoding="utf-8",
    )
    file_formatter = logging.Formatter(
        "%(asctime)s | %(name)s | %(levelname)s | %(message)s",
        "%Y-%m-%d %H:%M:%S"
    )
    file_handler.setFormatter(file_formatter)
    file_handler.addFilter(ExcludeLoggersFilter())
    root.addHandler(file_handler)

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(file_formatter)
    console_handler.addFilter(ExcludeLoggersFilter())
    root.addHandler(console_handler)

    logging.captureWarnings(True)

    root.setLevel(LogConfig.LOGGING_LEVEL)
