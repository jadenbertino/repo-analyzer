import { z } from 'zod'

// Define client env schema
const ClientEnvSchema = z.object({
  ENVIRONMENT: z.enum(['development', 'staging', 'production']),

  // Supabase
  SUPABASE_URL: z.string(),
  SUPABASE_PUBLIC_KEY: z.string(),
})
type ClientEnv = z.infer<typeof ClientEnvSchema>

// Gather client env vars
// Need to set `process.env.KEYNAME` rather than `...process.env` because next.js inlines at build time
type ClientEnvKeys = keyof ClientEnv
const rawClientEnv: Record<ClientEnvKeys, string | undefined> = {
  ENVIRONMENT: process.env['NEXT_PUBLIC_ENVIRONMENT'],
  SUPABASE_URL: process.env['NEXT_PUBLIC_SUPABASE_URL'],
  SUPABASE_PUBLIC_KEY: process.env['NEXT_PUBLIC_SUPABASE_PUBLIC_KEY'],
}

// Validate client env
const clientValidation = ClientEnvSchema.safeParse(rawClientEnv)
if (!clientValidation.success) {
  // Map the unprefixed error keys back to their NEXT_PUBLIC_ versions for clearer error messages
  const errors = z.flattenError(clientValidation.error)
  let errorString = JSON.stringify(errors)

  // Replace each ClientEnvKeys with NEXT_PUBLIC_ prefixed version
  // e.g. "ENVIRONMENT" -> "NEXT_PUBLIC_ENVIRONMENT"
  for (const key of Object.keys(rawClientEnv) as ClientEnvKeys[]) {
    const regex = new RegExp(`"${key}"`, 'g')
    errorString = errorString.replace(regex, `"NEXT_PUBLIC_${key}"`)
  }

  console.error(`❌ Invalid client environment variables:`, errorString)
  throw new Error('Invalid client environment variables')
}

const CLIENT_ENV = clientValidation.data

export { CLIENT_ENV }
