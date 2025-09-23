#!/bin/bash

# Logging functions with emoji prefixes

log_trace() {
    echo "🔬 [TRACE] $*"
}

log_debug() {
    echo "🔍 [DEBUG] $*"
}

log_verbose() {
    echo "📝 [VERBOSE] $*"
}

log_info() {
    echo "ℹ️  [INFO] $*"
}

log_success() {
    echo "✅ [SUCCESS] $*"
}

log_notice() {
    echo "💡 [NOTICE] $*"
}

log_warn() {
    echo "⚠️  [WARN] $*"
}

log_error() {
    echo "❌ [ERROR] $*"
}

log_critical() {
    echo "🚨 [CRITICAL] $*"
}

log_fatal() {
    echo "☠️  [FATAL] $*"
}
