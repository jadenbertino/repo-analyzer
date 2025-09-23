#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/../logger.sh"

FILENAME="${1:-}"
if [ -z "$FILENAME" ]; then
    log_error "Provide filename for the migration as first argument"
    exit 1
fi

log_debug "Ensuring local Supabase is running…"
if ! supabase status >/dev/null 2>&1; then
    supabase start
    log_debug "Started local Supabase instance"
fi

log_debug "Diffing local DB with remote DB to create migration file"
supabase db diff -f $FILENAME
bash scripts/db/clean.sh
log_success "Created migration file: $FILENAME"

log_info "Resetting local DB from migrations to verify migration integrity"
supabase db reset
log_success "Migration files verified"

# Update types & schemas
bash scripts/db/types.sh