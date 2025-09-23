#!/usr/bin/env bash
set -euo pipefail

echo "Ensuring local Supabase is running…"
supabase status >/dev/null 2>&1 || supabase start >/dev/null 2>&1

echo "Resetting local DB from migrations…"
supabase db reset   # drops, replays migrations, runs seed if present

# https://supabase.com/docs/reference/cli/supabase-db-pull
echo "Pulling remote schema diff (updates local migration history)…"
supabase db pull -p $SUPABASE_DB_PASSWORD # may prompt to update remote migration history