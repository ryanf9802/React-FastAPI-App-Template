import logging
import os

class DatabaseService:
    DB_DIR = "./services/database/state"
    DB_PATH = os.path.join(DB_DIR, "db.db")

    DB_SCHEMA_SCRIPT_DIR = "./services/database/util"
    DB_SCHEMA_SCRIPT_PATH = os.path.join(DB_SCHEMA_SCRIPT_DIR, "schema.sql")

    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)

    def initialize(self):
        pass

    def destroy(self):
        pass

    def _create_directory_db(self):
        pass

    @classmethod
    def is_initialized(cls) -> bool:
        if os.path.exists(DatabaseService.DB_PATH):
            return True
        return False

    def _get_table_creation_script(self) -> str:
        with open(DatabaseService.DB_SCHEMA_SCRIPT_PATH, "r", encoding="utf-8") as f:
            return f.read()
