#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/logger.sh"

log_info "Ensuring local Supabase is running…"
if ! supabase status >/dev/null 2>&1; then
    supabase start
    log_info "Started local Supabase instance"
fi

log_info "Resetting local DB from migrations…"
supabase db reset # drops, replays migrations, runs seed if present

log_info "Pulling remote schema diff (updates local migration history)…"
FILENAME="remote_changes"
supabase db diff --linked -f $FILENAME

# Check if a migration file was created with the filename pattern
if ls supabase/migrations/*$FILENAME* 1> /dev/null 2>&1; then
    log_info "Migration file detected with pattern '$FILENAME'. Resetting DB again…"
    bash ./scripts/clean-migrations.sh
    supabase db reset
    echo "⚠️  A migration file containing '$FILENAME' was created. Please review and commit this file to your repository."
fi
