from starlette.middleware.cors import CORSMiddleware as starletteCORSMW
import os

from dotenv import load_dotenv
load_dotenv(dotenv_path="../.env")

HOST_IP = os.getenv("HOST_IP")
UI_HOST_PORT = os.getenv("UI_HOST_PORT")

allowed_origins = [
    f"http://{HOST_IP}:{UI_HOST_PORT}",
    f"http://localhost:{UI_HOST_PORT}"
    ]

class CORSMiddleware(starletteCORSMW):
    def __init__(self, app):
        allow_origins = allowed_origins
        allow_methods = ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
        allow_headers = [
            "Authorization",
            "Accept",
            "Accept-Language",
            "Content-Language",
            "Content-Type",
            "X-Requested-With",
            "X-PINGOTHER",
            "request-uuid",
        ]
        expose_headers = ["request-uuid", "Content-Type"]

        super().__init__(
            app,
            allow_origins=allow_origins,
            allow_credentials=True,
            allow_methods=allow_methods,
            allow_headers=allow_headers,
            expose_headers=expose_headers,
        )