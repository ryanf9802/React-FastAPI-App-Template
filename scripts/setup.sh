#!/usr/bin/env bash
set +m
BASE_DIR="$(pwd)"
LOG_DIR="$BASE_DIR/logs/setup"; mkdir -p "$LOG_DIR"
UI_LOG="$LOG_DIR/ui_setup.log"; API_LOG="$LOG_DIR/api_setup.log"
> "$UI_LOG"; > "$API_LOG"

echo -e "\n\e[90m[App Setup] Starting UI and API setups...\e[0m"

(
  exec &> "$UI_LOG"
  cd "$BASE_DIR/ui" || exit 1
  npm install --force --loglevel verbose
) & pid_ui=$!

(
  exec &> "$API_LOG"
  cd "$BASE_DIR/api" || exit 1

  python3.13 -m venv .venv
  source .venv/bin/activate
  python3.13 -m pip install -r requirements.txt
  deactivate

  mkdir -p "$BASE_DIR/.vscode"
  cat > "$BASE_DIR/.vscode/settings.json" <<EOF
{
  "python.defaultInterpreterPath": "${workspaceFolder}/api/.venv/bin/python",
  "python.pythonPath":            "${workspaceFolder}/api/.venv/bin/python"
}
EOF
) & pid_api=$!


# Wait and capture exit codes
wait "$pid_ui"; code_ui=$?
wait "$pid_api"; code_api=$?

if [[ $code_ui -eq 0 && $code_api -eq 0 ]]; then
  echo -e "\n\e[32m[App Setup] Both UI and API setups have completed successfully.\e[0m"
else
  echo -e "\n\e[31m[App Setup] Setup failed. Check logs:\e[0m"
  echo " • UI:  $UI_LOG"
  echo " • API: $API_LOG"
fi

echo ""