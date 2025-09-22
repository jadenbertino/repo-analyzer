'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { FormEvent, useState } from 'react'

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
  })
  const [validationErrors, setValidationErrors] = useState({
    email: '',
  })

  const validateForm = () => {
    const errors = { email: '' }
    let isValid = true

    if (!formData.email) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement actual forgot password logic
      console.log('Forgot password data:', formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error sending reset email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value })
    // Clear validation error when user starts typing
    if (validationErrors.email) {
      setValidationErrors({ email: '' })
    }
  }

  if (isSubmitted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold text-center text-green-600'>
              Check your email
            </CardTitle>
            <CardDescription className='text-center'>
              We&apos;ve sent a password reset link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className='text-center space-y-4'>
            <p className='text-sm text-muted-foreground'>
              If you don&apos;t see the email in your inbox, please check your
              spam folder.
            </p>
            <p className='text-sm text-muted-foreground'>
              The link will expire in 24 hours for security reasons.
            </p>
          </CardContent>
          <CardFooter className='flex flex-col space-y-2'>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ email: '' })
                setValidationErrors({ email: '' })
              }}
            >
              Send another email
            </Button>
            <div className='text-sm text-muted-foreground text-center'>
              Remember your password?{' '}
              <Link
                href='/auth/signin'
                className='text-primary hover:underline font-medium'
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center'>
            Forgot password?
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='john@example.com'
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              {validationErrors.email && (
                <p className='text-sm text-red-600'>{validationErrors.email}</p>
              )}
            </div>
            <Button
              type='submit'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <div className='text-sm text-muted-foreground text-center'>
            Remember your password?{' '}
            <Link
              href='/auth/signin'
              className='text-primary hover:underline font-medium'
            >
              Sign in
            </Link>
          </div>
          <div className='text-sm text-muted-foreground text-center'>
            Don&apos;t have an account?{' '}
            <Link
              href='/auth/signup'
              className='text-primary hover:underline font-medium'
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
