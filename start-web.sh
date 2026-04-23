#!/usr/bin/env bash
set -e

echo "Starting Atlas-Recon Web Dyno"

# Prefer corepack; fallback to global pnpm install
if command -v corepack >/dev/null 2>&1; then
  corepack enable || true
  corepack prepare pnpm@10.28.0 --activate || npm i -g pnpm@10.28.0
else
  npm i -g pnpm@10.28.0
fi

echo "pnpm version: $(pnpm -v)"

# Start backend
pnpm --filter ./backend start
