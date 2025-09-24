#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/../logger.sh"

TYPES_FILEPATH="src/lib/database.types.ts"
SCHEMA_FILEPATH="src/lib/_database.ts"
CLEANED_SCHEMA_FILEPATH="src/lib/database.ts"

# Generate Supabase TypeScript types
log_info "Generating Supabase types..."
if ! pnpm dlx supabase gen types typescript --local > $TYPES_FILEPATH; then
    echo "❌ [ERROR] Failed to generate Supabase types" >&2
    exit 1
fi

# Convert types to Zod schemas
log_info "Generating Zod schemas..."
if ! pnpm dlx supazod \
  -i $TYPES_FILEPATH \
  -o $SCHEMA_FILEPATH \
  -s public \
  --table-operation-pattern "{table}{operation}" \
  --capitalize-names true > /dev/null; then
    echo "❌ [ERROR] Failed to generate Zod schemas" >&2
    exit 1
fi

log_success "Schema generation complete!"

# Auto-generate structured database.ts file
log_info "Auto-generating structured database.ts..."
generate_structured_database() {
    local schema_file="$SCHEMA_FILEPATH"
    local output_file="$CLEANED_SCHEMA_FILEPATH"
    
    # Extract table names from schema file
    local table_names=($(grep -oP 'export const public\K[A-Z][a-zA-Z]*(?=(?:Row|Insert|Update|Relationships)Schema)' "$schema_file" | sort -u))
    
    # Extract enum names from schema file (schemas that don't end with Row|Insert|Update|Relationships)
    local enum_names=($(grep -oP 'export const public\K[A-Z][a-zA-Z]*(?=Schema)' "$schema_file" | grep -vE '(Row|Insert|Update|Relationships)$' | sort -u))
    
    # Check if we found any table names
    if [ ${#table_names[@]} -eq 0 ]; then
        echo "❌ [ERROR] No table names found in $schema_file" >&2
        return 1
    fi
    
    log_info "Found ${#table_names[@]} tables: ${table_names[*]}"
    if [ ${#enum_names[@]} -gt 0 ]; then
        log_info "Found ${#enum_names[@]} enums: ${enum_names[*]}"
    fi
    
    # Start building the output file
    cat > "$output_file" << 'EOF'
import { z } from 'zod'
import * as _ from './_database'

EOF

    # Generate schema objects for each table
    if [ ${#table_names[@]} -gt 0 ]; then
        echo "// =============================================" >> "$output_file"
        echo "// TABLE SCHEMAS" >> "$output_file"
        echo "// =============================================" >> "$output_file"
        echo "" >> "$output_file"
        
        for table in "${table_names[@]}"; do
            local lower_table=$(echo "$table" | sed 's/\([A-Z]\)/_\L\1/g' | sed 's/^_//')
            
            echo "const ${table}Schema = {" >> "$output_file"
            echo "  Row: _.public${table}RowSchema," >> "$output_file"
            echo "  Insert: _.public${table}InsertSchema," >> "$output_file"
            echo "  Update: _.public${table}UpdateSchema," >> "$output_file"
            
            # Check if relationships schema exists
            if grep -q "public${table}RelationshipsSchema" "$schema_file"; then
                echo "  Relationships: _.public${table}RelationshipsSchema," >> "$output_file"
            fi
            
            echo "}" >> "$output_file"
            
            # Generate individual types for each operation
            echo "type ${table}Row = z.infer<typeof ${table}Schema.Row>" >> "$output_file"
            echo "type ${table}Insert = z.infer<typeof ${table}Schema.Insert>" >> "$output_file"
            echo "type ${table}Update = z.infer<typeof ${table}Schema.Update>" >> "$output_file"
            
            # Check if relationships schema exists and generate type for it
            if grep -q "public${table}RelationshipsSchema" "$schema_file"; then
                echo "type ${table}Relationships = z.infer<typeof ${table}Schema.Relationships>" >> "$output_file"
            fi
            
            echo "" >> "$output_file"
        done
    fi
    
    # Generate enum schemas and types
    if [ ${#enum_names[@]} -gt 0 ]; then
        echo "// =============================================" >> "$output_file"
        echo "// ENUM SCHEMAS" >> "$output_file"
        echo "// =============================================" >> "$output_file"
        echo "" >> "$output_file"
        
        for enum in "${enum_names[@]}"; do
            echo "const ${enum}Schema = _.public${enum}Schema" >> "$output_file"
            echo "type $enum = z.infer<typeof ${enum}Schema>" >> "$output_file"
            echo "" >> "$output_file"
        done
    fi
    
    # Generate exports
    if [ ${#table_names[@]} -gt 0 ] || [ ${#enum_names[@]} -gt 0 ]; then
        echo "// =============================================" >> "$output_file"
        echo "// EXPORTS" >> "$output_file"
        echo "// =============================================" >> "$output_file"
        echo "" >> "$output_file"
        echo -n "export { " >> "$output_file"
        local first=true
        
        # Export table schemas
        for table in "${table_names[@]}"; do
            if [ "$first" = true ]; then
                echo -n "${table}Schema" >> "$output_file"
                first=false
            else
                echo -n ", ${table}Schema" >> "$output_file"
            fi
        done
        
        # Export enum schemas
        for enum in "${enum_names[@]}"; do
            if [ "$first" = true ]; then
                echo -n "${enum}Schema" >> "$output_file"
                first=false
            else
                echo -n ", ${enum}Schema" >> "$output_file"
            fi
        done
        
        echo " }" >> "$output_file"
        echo -n "export type { " >> "$output_file"
        first=true
        
        # Export table types (individual operation types)
        for table in "${table_names[@]}"; do
            # Export Row type
            if [ "$first" = true ]; then
                echo -n "${table}Row" >> "$output_file"
                first=false
            else
                echo -n ", ${table}Row" >> "$output_file"
            fi
            
            # Export Insert type
            echo -n ", ${table}Insert" >> "$output_file"
            
            # Export Update type
            echo -n ", ${table}Update" >> "$output_file"
            
            # Export Relationships type if it exists
            if grep -q "public${table}RelationshipsSchema" "$schema_file"; then
                echo -n ", ${table}Relationships" >> "$output_file"
            fi
        done
        
        # Export enum types
        for enum in "${enum_names[@]}"; do
            if [ "$first" = true ]; then
                echo -n "$enum" >> "$output_file"
                first=false
            else
                echo -n ", $enum" >> "$output_file"
            fi
        done
        
        echo " }" >> "$output_file"
    else
        echo "// No tables found - empty exports" >> "$output_file"
        echo "export {}" >> "$output_file"
        echo "export type {}" >> "$output_file"
    fi
    
    # Build list of all generated types
    local all_types=()
    for table in "${table_names[@]}"; do
        all_types+=("${table}Row" "${table}Insert" "${table}Update")
        if grep -q "public${table}RelationshipsSchema" "$schema_file"; then
            all_types+=("${table}Relationships")
        fi
    done
    all_types+=("${enum_names[@]}")
    
    log_success "Generated structured database.ts with individual operation types for: ${all_types[*]}"
    
    # Format with prettier
    log_info "Formatting database.ts with prettier..."
    if ! pnpm dlx prettier --write "$output_file" > /dev/null 2>&1; then
        echo "⚠️  [WARNING] Failed to format with prettier, but file was generated successfully" >&2
    else
        log_success "Formatted database.ts with prettier"
    fi
}

generate_structured_database
