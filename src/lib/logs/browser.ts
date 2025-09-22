import type { LogLevel } from '@/env/client'
import { CLIENT_ENV, LOG_LEVELS } from '@/env/client'
import { serialize } from '../utils'

type LogMethod = (message: string, data?: object | unknown) => void

const clientLogger: Record<LogLevel, LogMethod> = {
  debug: createLogMethod('debug'),
  info: createLogMethod('info'),
  warn: createLogMethod('warn'),
  error: createLogMethod('error'),
}

function createLogMethod(level: LogLevel): LogMethod {
  return (message: string, data?: object | unknown) => {
    const shouldLog =
      LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(CLIENT_ENV.LOG_LEVEL)
    if (shouldLog) {
      console.log(
        `[${level.toUpperCase()}] ${message}`,
        data ? serialize(data) : '',
      )
    }
  }
}

export { clientLogger }
