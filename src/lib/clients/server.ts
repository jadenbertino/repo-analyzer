import { SERVER_ENV } from '@/env/server'
import { createClient } from '@supabase/supabase-js'
import pino from 'pino'

// Factory to create wrapped logger with consistent API
function createLogger(
  basePinoLogger: pino.Logger,
): Record<pino.Level, (message: string, data?: object | unknown) => void> {
  return {
    trace: createLogMethod(basePinoLogger, 'trace'),
    debug: createLogMethod(basePinoLogger, 'debug'),
    info: createLogMethod(basePinoLogger, 'info'),
    warn: createLogMethod(basePinoLogger, 'warn'),
    error: createLogMethod(basePinoLogger, 'error'),
    fatal: createLogMethod(basePinoLogger, 'fatal'),
  }
}

function createLogMethod(basePinoLogger: pino.Logger, level: pino.Level) {
  return (message: string, data?: object | unknown) => {
    if (data && typeof data === 'object') {
      basePinoLogger[level](data, message)
    } else {
      basePinoLogger[level](message)
    }
  }
}

const serverLogger = createLogger(pino())

const supabaseAdmin = createClient(
  SERVER_ENV.SUPABASE_URL,
  SERVER_ENV.SUPABASE_SERVICE_ROLE_KEY,
)

export { serverLogger, supabaseAdmin }
