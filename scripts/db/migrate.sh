#!/usr/bin/env bash
set -euo pipefail

FILENAME="$1"
if [ -z "$FILENAME" ]; then
    log_error "❌ Provide filename for the migration as first argument"
    exit 1
fi

supabase db diff -f $FILENAME
supabase db reset
supabase db push