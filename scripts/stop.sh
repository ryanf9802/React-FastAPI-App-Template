#!/usr/bin/env bash
set -e

BASE_DIR="$(pwd)"
PID_DIR="$BASE_DIR/logs/pid"
UI_PID_FILE="$PID_DIR/UI.pid"
API_PID_FILE="$PID_DIR/API.pid"

# ANSI colour codes
COLOR_INFO="\e[90m"
COLOR_WARN="\e[31m"
COLOR_SUCCESS="\e[32m"
COLOR_RESET="\e[0m"

kill_process() {
  local pid_file="$1"
  if [[ -f "$pid_file" ]]; then
    pid=$(<"$pid_file")
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid"
      sleep 2
      if kill -0 "$pid" 2>/dev/null; then
        echo -e "${COLOR_WARN}[App] Force‑killing PID $pid...${COLOR_RESET}"
        kill -9 "$pid"
      else
        echo -e "${COLOR_INFO}[App] Stopped PID $pid.${COLOR_RESET}"
      fi
    else
      echo -e "${COLOR_INFO}[App] PID $pid not running.${COLOR_RESET}"
    fi
    rm -f "$pid_file"
  else
    echo -e "${COLOR_INFO}[App] No PID file at $pid_file.${COLOR_RESET}"
  fi
}

echo -e "\n${COLOR_INFO}[App] Shutting down UI and API development servers...${COLOR_RESET}\n"

kill_process "$UI_PID_FILE"
kill_process "$API_PID_FILE"

echo -e "\n${COLOR_SUCCESS}[App] Stop successful.${COLOR_RESET}"

echo ""