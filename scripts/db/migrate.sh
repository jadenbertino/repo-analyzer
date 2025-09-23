#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/../logger.sh"

FILENAME="${1:-}"
if [ -z "$FILENAME" ]; then
    log_error "Provide filename for the migration as first argument"
    exit 1
fi

supabase db diff -f $FILENAME
log_success "Created migration file: $FILENAME"

log_info "Resetting local DB from migrations to verify migration integrity"
supabase db reset
log_success "Migration files verified"

# Update types & schemas
bash scripts/db/types.sh