// Test script to verify error mapping works correctly
const { z } = require('zod')

// Simulate the validation function to test error mapping
function testErrorMapping() {
  console.log('🧪 Testing NEW string replace error mapping approach...\n')

  const ClientEnvSchema = z.object({
    ENVIRONMENT: z.enum(['development', 'staging', 'production']),
    SUPABASE_URL: z.string(),
    SUPABASE_PUBLIC_KEY: z.string(),
  })

  const rawClientEnv = {
    ENVIRONMENT: undefined,
    SUPABASE_URL: undefined,
    SUPABASE_PUBLIC_KEY: undefined,
  }

  // Test case 1: Invalid type
  console.log('Test 1: Invalid ENVIRONMENT type (number instead of string)')
  const test1Data = {
    ENVIRONMENT: 123, // Should be string
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_PUBLIC_KEY: 'valid-key',
  }

  const result1 = ClientEnvSchema.safeParse(test1Data)
  if (!result1.success) {
    // NEW APPROACH: String replace
    const errors = z.flattenError(result1.error)
    let errorString = JSON.stringify(errors)

    // Replace each ClientEnvKeys with NEXT_PUBLIC_ prefixed version
    for (const key of Object.keys(rawClientEnv)) {
      const regex = new RegExp(`"${key}"`, 'g')
      errorString = errorString.replace(regex, `"NEXT_PUBLIC_${key}"`)
    }

    const prefixedErrors = JSON.parse(errorString)
    console.log('❌ Mapped errors:', prefixedErrors)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test case 2: Missing required fields
  console.log('Test 2: Missing required fields')
  const test2Data = {
    ENVIRONMENT: 'development',
    // Missing SUPABASE_URL and SUPABASE_PUBLIC_KEY
  }

  const result2 = ClientEnvSchema.safeParse(test2Data)
  if (!result2.success) {
    // NEW APPROACH: String replace
    const errors = z.flattenError(result2.error)
    let errorString = JSON.stringify(errors)

    // Replace each ClientEnvKeys with NEXT_PUBLIC_ prefixed version
    for (const key of Object.keys(rawClientEnv)) {
      const regex = new RegExp(`"${key}"`, 'g')
      errorString = errorString.replace(regex, `"NEXT_PUBLIC_${key}"`)
    }

    const prefixedErrors = JSON.parse(errorString)
    console.log('❌ Mapped errors:', prefixedErrors)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test case 3: Multiple errors
  console.log('Test 3: Multiple validation errors')
  const test3Data = {
    ENVIRONMENT: 'invalid-environment', // Invalid enum
    SUPABASE_URL: '', // Empty string
    SUPABASE_PUBLIC_KEY: '', // Empty string
  }

  const result3 = ClientEnvSchema.safeParse(test3Data)
  if (!result3.success) {
    // NEW APPROACH: String replace
    const errors = z.flattenError(result3.error)
    let errorString = JSON.stringify(errors)

    // Replace each ClientEnvKeys with NEXT_PUBLIC_ prefixed version
    for (const key of Object.keys(rawClientEnv)) {
      const regex = new RegExp(`"${key}"`, 'g')
      errorString = errorString.replace(regex, `"NEXT_PUBLIC_${key}"`)
    }

    const prefixedErrors = JSON.parse(errorString)
    console.log('❌ Mapped errors:', prefixedErrors)
  }

  console.log('\n' + '='.repeat(50) + '\n')

  // Test case 4: Valid data (should pass)
  console.log('Test 4: Valid data (should pass)')
  const test4Data = {
    ENVIRONMENT: 'development',
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_PUBLIC_KEY: 'valid-key-123',
  }

  const result4 = ClientEnvSchema.safeParse(test4Data)
  if (result4.success) {
    console.log('✅ Validation passed! Data:', result4.data)
  } else {
    console.log('❌ Unexpected validation failure')
  }

  console.log('\n🎉 Error mapping test completed!')
}

testErrorMapping()
