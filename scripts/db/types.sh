#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/../logger.sh"
TYPES_FILEPATH="src/lib/database.types.ts"
SCHEMA_FILEPATH="src/lib/_database.ts"

# Generate Supabase TypeScript types
log_info "Generating Supabase types..."
supabase gen types typescript --local > $TYPES_FILEPATH

# Convert types to Zod schemas
log_info "Generating Zod schemas..."
pnpx supazod \
  -i $TYPES_FILEPATH \
  -o $SCHEMA_FILEPATH \
  -s public \
  --table-operation-pattern "{table}{operation}" \
  --capitalize-names true

log_success "Schema generation complete!"
log_info "Please manually re-import everything into src/lib/database.ts for clarity"
# e.g.
#
# import { z } from 'zod'
# import * as _ from './_database'

# const IconSchema = {
#   Row: _.iconRowSchema,
#   Insert: _.iconInsertSchema,
#   Update: _.iconUpdateSchema,
#   Relationships: _.iconRelationshipsSchema,
# }
# type Icon = z.infer<typeof IconSchema.Row>

# const ProviderSchema = {
#   Row: _.providerRowSchema,
#   Insert: _.providerInsertSchema,
#   Update: _.providerUpdateSchema,
# }
# type Provider = z.infer<typeof ProviderSchema.Row>

# export { IconSchema, ProviderSchema }
# export type { Icon, Provider }
