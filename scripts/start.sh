#!/usr/bin/env bash
set +m

export $(grep -v '^#' ./.env | xargs)
BASE_DIR="$(pwd)"
LOG_DIR="$BASE_DIR/logs"; mkdir -p "$LOG_DIR"
PID_DIR="$LOG_DIR/pid" ; mkdir -p "$PID_DIR"
UI_LOG="$LOG_DIR/UI_log.log"; API_LOG="$LOG_DIR/API_log.log"
UI_PID_FILE="$PID_DIR/UI.pid"; API_PID_FILE="$PID_DIR/API.pid"

# Clear old logs
> "$UI_LOG"
> "$API_LOG"

# Function to kill previous run
kill_process() {
  pid_file="$1"
  if [[ -f "$pid_file" ]]; then
    pid=$(<"$pid_file")
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid"
      sleep 2
      if kill -0 "$pid" 2>/dev/null; then
        echo -e "\e[31m[App] Force‑killing $pid...\e[0m"
        kill -9 "$pid"
      fi
    fi
    rm -f "$pid_file"
  fi
}


echo -e "\n\e[90m[App] Starting UI and API development servers...\e[0m"

kill_process "$UI_PID_FILE"
kill_process "$API_PID_FILE"

# Launch UI
(
  exec &> "$UI_LOG"
  cd "$BASE_DIR/ui" || exit 1
  exec npm run dev
) &
UI_PID=$!
echo "$UI_PID" > "$UI_PID_FILE"

# Launch API
(
  exec &> "$API_LOG"
  cd "$BASE_DIR/api" || exit 1
  source .venv/bin/activate
  exec uvicorn src.root:app \
    --host "$HOST_IP" --port "$API_HOST_PORT" --reload \
    --env-file "$BASE_DIR/.env"
) &
API_PID=$!
echo "$API_PID" > "$API_PID_FILE"

# Wait for “ready” or early failure (timeout = 60s)
timeout=60
start_ts=$(date +%s)
ui_ready=false
api_ready=false

while (( $(date +%s) - start_ts < timeout )); do
  # If either process died early → fail
  if ! kill -0 "$UI_PID" 2>/dev/null; then
    echo -e "\n\e[31m[App] UI failed to start — see $UI_LOG\e[0m"
    break
  fi
  if ! kill -0 "$API_PID" 2>/dev/null; then
    echo -e "\n\e[31m[App] API failed to start — see $API_LOG\e[0m"
    break
  fi

  # Check logs for readiness
  if ! $ui_ready && grep -q "Local:" "$UI_LOG"; then
    ui_ready=true
  fi
  if ! $api_ready && grep -q "Uvicorn running" "$API_LOG"; then
    api_ready=true
  fi

  # Both ready → success
  if $ui_ready && $api_ready; then
    echo -e "\n\e[32m[App] UI and API Development Servers are running.\e[0m\n"
    echo -e "\033[1;93mUI ➜\033[0m \033[4;96mhttp://localhost:$UI_HOST_PORT\033[0m"
    echo -e "\033[1;93mAPI ➜\033[0m \033[4;96mhttp://localhost:$API_HOST_PORT/docs\033[0m"
    break
  fi

  sleep 1
done

# If loop ended without both being ready
if ! $ui_ready || ! $api_ready; then
  echo -e "\n\e[31m[App] Setup did not complete successfully. Check logs:\e[0m"
  echo " • UI ➜ $UI_LOG"
  echo " • API ➜ $API_LOG"
fi

echo ""
