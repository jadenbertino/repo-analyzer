#!/bin/bash
set -euo pipefail

# Load DOPPLER_TOKEN
source ./scripts/get-doppler-token.sh

# Validate Doppler CLI is installed
if [ ! command -v doppler &> /dev/null ]; then
  echo "❌ Please install Doppler CLI: https://docs.doppler.com/docs/install-cli"
  exit 1
fi

# Run the command with Doppler
doppler run -- "$@"