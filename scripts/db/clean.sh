#!/bin/bash

# Script to clean up migration files by removing excessive newlines
# This helps keep migration files clean and consistent

# Set script directory and source logger
source "$(dirname "$0")/../logger.sh"

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
MIGRATIONS_DIR="$SCRIPT_DIR/../supabase/migrations"
BACKUP_DIR="$SCRIPT_DIR/../.backups/migrations"

# Function to create backup of migration files
create_backup() {
    local file="$1"
    local backup_file="$BACKUP_DIR/$(basename "$file").backup.$(date +%Y%m%d_%H%M%S)"
    
    mkdir -p "$BACKUP_DIR"
    cp "$file" "$backup_file"
}

# Function to clean a single migration file
clean_migration_file() {
    local file="$1"
    
    if [[ ! -f "$file" ]]; then
        log_error "File not found: $file"
        return 1
    fi
    
    # Create backup before modifying
    create_backup "$file"
    
    # Remove all empty lines (aggressive cleanup)
    sed -i '/^[[:space:]]*$/d' "$file"
    
    # Remove trailing whitespace from each line
    sed -i 's/[[:space:]]*$//' "$file"
    
    # Ensure file ends with exactly one newline
    sed -i -e '$a\' "$file"
}

# Main function
main() {
    # Check if migrations directory exists
    if [[ ! -d "$MIGRATIONS_DIR" ]]; then
        exit 1
    fi
    
    # Find all SQL migration files
    local migration_files
    mapfile -t migration_files < <(find "$MIGRATIONS_DIR" -name "*.sql" -type f)
    
    if [[ ${#migration_files[@]} -eq 0 ]]; then
        exit 0
    fi
    
    # Process each migration file
    local success_count=0
    local error_count=0
    
    for file in "${migration_files[@]}"; do
        if clean_migration_file "$file"; then
            ((success_count++))
        else
            ((error_count++))
        fi
    done
    
    # Summary
    if [[ $error_count -gt 0 ]]; then
        exit 1
    fi
}

# Script entry point
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
