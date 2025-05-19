FROM python:3.13-slim

RUN apt-get update && \
  apt-get install -y lnav && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

# install Python dependencies
COPY pyproject.toml ./
RUN pip install --no-cache-dir awscli uv
RUN uv sync

# mount source
COPY . .

# unbuffered logs
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

# run your existing uv sync + uvicorn command
CMD ["sh", "-c", "uv run python -B -m uvicorn root:app --reload --host 0.0.0.0 --port 8000"]
