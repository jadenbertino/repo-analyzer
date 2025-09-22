import { z } from 'zod'

/* ************************** ⭐ SCHEMA DEFINITION ⭐ ************************** */

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const
const LogLevelSchema = z.enum(LOG_LEVELS)
type LogLevel = z.infer<typeof LogLevelSchema>

const ClientEnvSchema = z.object({
  ENVIRONMENT: z.enum(['development', 'staging', 'production']),
  LOG_LEVEL: LogLevelSchema,

  // Supabase
  SUPABASE_URL: z.string(),
  SUPABASE_PUBLIC_KEY: z.string(),
})
type ClientEnv = z.infer<typeof ClientEnvSchema>

/* ************************** ⭐ VALIDATE ENV ⭐ ************************** */

// Need to set `process.env.KEYNAME` rather than `...process.env` because next.js inlines at build time
type ClientEnvKeys = keyof ClientEnv
const rawClientEnv: Record<ClientEnvKeys, string | undefined> = {
  ENVIRONMENT: process.env['NEXT_PUBLIC_ENVIRONMENT'],
  LOG_LEVEL: process.env['NEXT_PUBLIC_LOG_LEVEL'],

  SUPABASE_URL: process.env['NEXT_PUBLIC_SUPABASE_URL'],
  SUPABASE_PUBLIC_KEY: process.env['NEXT_PUBLIC_SUPABASE_PUBLIC_KEY'],
}
const clientValidation = ClientEnvSchema.safeParse(rawClientEnv)

/* ************************** ⭐ HANDLE ERRORS ⭐ ************************** */

if (!clientValidation.success) {
  // Map the unprefixed error keys back to their NEXT_PUBLIC_ versions for clearer error messages
  // e.g. "ENVIRONMENT" -> "NEXT_PUBLIC_ENVIRONMENT"
  const errors = z.flattenError(clientValidation.error)
  let errorString = JSON.stringify(errors)
  for (const key of Object.keys(rawClientEnv) as ClientEnvKeys[]) {
    const regex = new RegExp(`"${key}"`, 'g')
    errorString = errorString.replace(regex, `"NEXT_PUBLIC_${key}"`)
  }

  console.error(`❌ Invalid client environment variables:`, errorString)
  throw new Error('Invalid client environment variables')
}

/* ************************** ⭐ EXPORT VALIDATED ENV ⭐ ************************** */

const CLIENT_ENV = clientValidation.data

export { CLIENT_ENV, LOG_LEVELS, type LogLevel }
