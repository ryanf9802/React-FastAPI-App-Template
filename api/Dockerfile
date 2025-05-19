FROM python:3.13-slim AS base
WORKDIR /app

RUN pip install --no-cache-dir uv

COPY pyproject.toml poetry.lock* ./
RUN uv sync

COPY . .

EXPOSE 8000

# At runtime, launch the FastAPI app via uv
CMD ["uv", "run", "python", "-B", "-m", "uvicorn", "root:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
