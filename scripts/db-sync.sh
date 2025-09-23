#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/logger.sh"

log_info "Ensuring local Supabase is running…"
supabase status >/dev/null 2>&1 || supabase start >/dev/null 2>&1

log_info "Resetting local DB from migrations…"
supabase db reset   # drops, replays migrations, runs seed if present

log_info "Checking upstream migration history…"
UPSTREAM_MIGRATIONS_BEFORE=$(supabase migration list 2>/dev/null || echo "")

log_info "Pulling remote schema diff (updates local migration history)…"
# https://supabase.com/docs/reference/cli/supabase-db-pull
echo "y" | supabase db pull -p $SUPABASE_DB_PASSWORD

log_info "Checking upstream migration history again…"
UPSTREAM_MIGRATIONS_AFTER=$(supabase migration list 2>/dev/null || echo "")

# Check if remote migration history was updated
if [ "$UPSTREAM_MIGRATIONS_BEFORE" != "$UPSTREAM_MIGRATIONS_AFTER" ]; then
    log_warn ""
    log_warn "🔄 Upstream migration history has changed!"
    log_warn ""
    log_warn "Next steps:"
    log_warn "  1. sb migration up — Applies the migration file to your local DB"
    log_warn ""
    log_warn "  2. If you did not get a 'Update remote migration history table -> Y'"
    log_warn "     then you must run:"
    log_warn "     sb migration repair <migrationTimestamp> --status applied"
    log_warn ""
else
    echo "✅ Upstream migration history unchanged"
fi