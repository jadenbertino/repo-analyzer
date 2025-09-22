import { CLIENT_ENV } from '@/env/client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  CLIENT_ENV.SUPABASE_URL,
  CLIENT_ENV.SUPABASE_PUBLIC_KEY,
)

export { supabase }
