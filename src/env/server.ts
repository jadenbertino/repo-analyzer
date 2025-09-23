import { z } from 'zod'
import { CLIENT_ENV } from './client'

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string(), // Supabase Project > Settings > API Keys > Service Role Key
})

const serverValidation = serverSchema.safeParse(process.env)
if (!serverValidation.success) {
  const errors = z.flattenError(serverValidation.error)
  console.error('❌ Invalid server environment variables:', errors)
  throw new Error('Invalid server environment variables')
}

const SERVER_ENV = {
  ...CLIENT_ENV, // all client (public) env vars are also available on the server
  ...serverValidation.data,
}

export { SERVER_ENV }
