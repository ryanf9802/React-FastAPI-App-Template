import logging
import services.logging.LoggerConfig as LogConfig


class ExcludeLoggersFilter(logging.Filter):
    def filter(self, record):
        for name in LogConfig.IGNORE_LOGGERS:
            if name in record.name:
                return False
        return True
