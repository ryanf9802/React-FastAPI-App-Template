#!/usr/bin/env bash

BASE_DIR="$(pwd)"

echo -e "\n\e[93m[App Reset] Resetting environment...\e[0m"

rm -rf "$BASE_DIR/logs"
rm -rf "$BASE_DIR/api/.venv"
rm -rf "$BASE_DIR/ui/node_modules"


echo -e "\n\e[32m[App Reset] Successfully reset environment.\e[0m"

echo ""