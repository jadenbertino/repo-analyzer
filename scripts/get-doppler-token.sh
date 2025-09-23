#!/bin/bash
set -e

# Determine environment, throw if not set
if [ -z "$ENVIRONMENT" ]; then
  echo "❌ ENVIRONMENT not set"
  exit 1
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

# If script is being called (not sourced), output the token
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "$DOPPLER_TOKEN"
fi

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