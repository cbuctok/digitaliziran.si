#!/bin/bash
# Hugo build script with markdown linting

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==> Fetching external dependencies..."
mkdir -p static/lib/mermaid static/lib/n8n

curl -sL "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js" \
  -o static/lib/mermaid/mermaid.min.js

curl -sL "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" \
  -o static/lib/n8n/style.css

curl -sL "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.min.js" \
  -o static/lib/n8n/chat.bundle.es.min.js

echo "==> Running markdown linter..."
python3 lint_markdown.py content --fix

echo ""
echo "==> Building Hugo site..."
hugo "$@"

echo ""
echo "==> Build complete!"
