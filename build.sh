#!/bin/bash
# Hugo build script with markdown linting

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Running markdown linter..."
python3 lint_markdown.py content --fix

echo ""
echo "==> Building Hugo site..."
hugo "$@"

echo ""
echo "==> Build complete!"
