import os
import logging
import services.logging.util.logger_util as LogUtil
import services.logging.LoggerConfig as LogConfig


def initialize_logging():
    if not os.path.isdir("../logs"):
        os.mkdir("../logs/")

    logger = logging.getLogger()
    logging_handler = logging.FileHandler(
        os.path.join(LogConfig.LOG_OUTPUT_DIR, LogConfig.LOG_FILE_NAME),
        mode="a",
        encoding="utf-8",
    )
    logging_handler.setFormatter(
        logging.Formatter(
            "%(name)s | %(levelname)s |  %(asctime)s |  %(message)s", "%H:%M:%S UTC%z"
        )
    )
    logging_handler.addFilter(LogUtil.ExcludeLoggersFilter())
    logger.addHandler(logging_handler)
    logging.captureWarnings(True)
    logger.setLevel(LogConfig.LOGGING_LEVEL)
