import logging

from services.database.models import User
from services.database import get_session

class AuthService:
    def __init__(self, request_uid: str) -> None:
        self.request_uid = request_uid
        self.logger = logging.getLogger(f"AuthService | {request_uid}")

    def get_user(self, identifier: str) -> User:
        with get_session() as db:
            user = db.query(User).filter(User.email == identifier).first()
        return user
