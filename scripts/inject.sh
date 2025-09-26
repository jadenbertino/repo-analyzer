#!/bin/bash
set -euo pipefail

# Validate Doppler CLI is installed
if [ ! command -v doppler &> /dev/null ]; then
  echo "❌ Please install Doppler CLI: https://docs.doppler.com/docs/install-cli"
  exit 1
fi

# Determine environment, throw if not set
if [ -z "${ENVIRONMENT-}" ]; then
  ENVIRONMENT="development"
  echo "ℹ️  ENVIRONMENT not set, defaulting to 'development'"
fi

# Check if env file exists
ENV_FILE="env/.env.${ENVIRONMENT}"
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Environment file not found: $ENV_FILE"
  exit 1
fi

# Source the environment file
source "$ENV_FILE"

# Validate DOPPLER_TOKEN is set
if [ -z "$DOPPLER_TOKEN" ]; then
  echo "❌ DOPPLER_TOKEN not set in $ENV_FILE"
  exit 1
fi

# Export DOPPLER_TOKEN
export DOPPLER_TOKEN

# Run the command with Doppler
doppler run -- "$@"

# note to self: if you wanted to have a file that just outputs the token, you could do the following:
# 
# If script is being called (not sourced), output the token
# 
# if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
#   echo "$DOPPLER_TOKEN"
# fi
# 
# Usage: 
#
# (bash)
# source "./scripts/get-doppler-token.sh"
#
# or (bash / python)
# DOPPLER_TOKEN=$(./scripts/get-doppler-token.sh)
#
# or (node)
# result = subprocess.run(['./scripts/get-doppler.sh'], 
#                     capture_output=True, text=True, cwd='/home/jaden/projects/interviews/spearbit')
# doppler_token = result.stdout.strip()

