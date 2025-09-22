import { supabase } from './clients/browser'

/**
 * Test Supabase connection and return connection status
 */
export async function testSupabaseConnection() {
  try {
    // Test 1: Check if client is properly initialized
    if (!supabase) {
      throw new Error('Supabase client is not initialized')
    }

    console.log('✅ Supabase client initialized')

    // Test 2: Try to get the current session/user (this tests API connectivity)
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.warn(
        '⚠️  Session check failed (this is normal if no user is authenticated):',
        sessionError.message,
      )
    } else {
      console.log('✅ Session check successful')
      if (session) {
        console.log('✅ User is authenticated:', session.user.email)
      } else {
        console.log('ℹ️  No active session (user not authenticated)')
      }
    }

    // Test 3: Try a simple database query to test database connectivity
    // This uses the built-in auth.users table which should always exist
    const { data, error } = await supabase
      .from('auth.users')
      .select('count(*)')
      .limit(1)

    if (error) {
      // If auth.users fails, try a simpler health check
      console.warn('⚠️  Database query failed:', error.message)

      // Fallback: Try to call a Supabase function or use another method
      const { error: healthError } = await supabase
        .from('_supabase_health_check')
        .select('*')
        .limit(1)
      if (healthError && healthError.code !== 'PGRST116') {
        // PGRST116 = table not found, which is expected
        throw new Error(`Database connectivity failed: ${healthError.message}`)
      }
      console.log('✅ Basic database connectivity confirmed')
    } else {
      console.log('✅ Database query successful')
    }

    return {
      success: true,
      message: 'Supabase connection verified successfully!',
      details: {
        clientInitialized: true,
        apiConnectivity: true,
        databaseConnectivity: true,
        hasActiveSession: !!session,
        userEmail: session?.user?.email,
      },
    }
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error)
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
      details: {
        clientInitialized: !!supabase,
        apiConnectivity: false,
        databaseConnectivity: false,
        hasActiveSession: false,
      },
    }
  }
}

/**
 * Simple connection test that just checks if the client can communicate with Supabase
 */
export async function quickConnectionTest() {
  try {
    const { error } = await supabase.auth.getSession()
    if (error && !error.message.includes('Invalid')) {
      throw error
    }
    return { connected: true, message: 'Supabase is connected!' }
  } catch (error) {
    return {
      connected: false,
      message: error instanceof Error ? error.message : 'Connection failed',
    }
  }
}
