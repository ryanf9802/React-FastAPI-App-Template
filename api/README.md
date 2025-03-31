# App API

## Dependencies

> Last Updated: March 27, 2025 by _Ryan Fitzpatrick_

### fastapi[standard]

Installs the FastAPI framework **with all “standard” extras**, including Starlette, Pydantic, CLI tools, HTTP support, templating, validation, and more. Below is every package brought in by `fastapi[standard]`, along with its pinned version and purpose:

| Package           | Version   | Purpose                                                 |
| ----------------- | --------- | ------------------------------------------------------- |
| annotated‑types   | 0.7.0     | Type annotation helpers for FastAPI                     |
| anyio             | 4.9.0     | Async I/O compatibility layer used by Starlette/FastAPI |
| certifi           | 2025.1.31 | SSL/TLS certificate bundle for HTTPS requests           |
| click             | 8.1.8     | CLI interface utilities (used by fastapi-cli)           |
| dnspython         | 2.7.0     | DNS toolkit (required by email_validator)               |
| email_validator   | 2.2.0     | Validates and normalizes email addresses                |
| fastapi           | 0.115.12  | Core FastAPI framework                                  |
| fastapi-cli       | 0.0.7     | Command‑line scaffolding & management for FastAPI       |
| h11               | 0.14.0    | HTTP/1.1 protocol implementation (used by Uvicorn)      |
| httpcore          | 1.0.7     | Core HTTP client engine for HTTPX                       |
| httptools         | 0.6.4     | High‑performance HTTP parser (used by Uvicorn)          |
| httpx             | 0.28.1    | Async HTTP client                                       |
| idna              | 3.10      | Internationalized Domain Name support                   |
| Jinja2            | 3.1.6     | Templating engine for HTML responses                    |
| markdown-it-py    | 3.0.0     | Markdown parser used for documentation                  |
| MarkupSafe        | 3.0.2     | Escapes text for safe HTML rendering                    |
| mdurl             | 0.1.2     | URL handling for markdown-it-py                         |
| pydantic          | 2.10.6    | Data validation and settings management                 |
| pydantic_core     | 2.27.2    | Core parsing engine for Pydantic                        |
| Pygments          | 2.19.1    | Syntax highlighting (docs, tracebacks)                  |
| python-dotenv     | 1.1.0     | Loads environment variables from `.env` files           |
| python-multipart  | 0.0.20    | Parses multipart/form-data (file uploads)               |
| PyYAML            | 6.0.2     | YAML parsing/emitting                                   |
| rich              | 13.9.4    | Rich text formatting in console output                  |
| rich-toolkit      | 0.14.0    | Utilities/extensions for Rich                           |
| shellingham       | 1.5.4     | Detects user’s shell for CLI tools                      |
| sniffio           | 1.3.1     | Async I/O library detection                             |
| starlette         | 0.46.1    | ASGI framework underpinning FastAPI                     |
| typer             | 0.15.2    | CLI creation library used by FastAPI                    |
| typing_extensions | 4.13.0    | Backported typing features                              |
| uvicorn           | 0.34.0    | ASGI server for running FastAPI                         |
| uvloop            | 0.21.0    | Ultra‑fast asyncio event loop                           |
| watchfiles        | 1.0.4     | File change watcher for auto‑reload                     |
| websockets        | 15.0.1    | WebSocket protocol implementation                       |
