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
import { CheckCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export default function CheckEmailPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
            <CheckCircle className='h-6 w-6 text-green-600' />
          </div>
          <CardTitle className='text-2xl font-bold'>Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a confirmation link to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-3 rounded-lg border p-3'>
            <Mail className='h-5 w-5 text-muted-foreground' />
            <div className='flex-1 space-y-1'>
              <p className='text-sm font-medium'>Confirmation email sent</p>
              <p className='text-xs text-muted-foreground'>
                Check your inbox and click the link to activate your account
              </p>
            </div>
          </div>
          <div className='rounded-lg bg-muted p-3'>
            <p className='text-sm text-muted-foreground'>
              <strong>Next steps:</strong>
            </p>
            <ol className='mt-2 text-sm text-muted-foreground space-y-1'>
              <li>1. Check your email inbox</li>
              <li>2. Click the confirmation link</li>
              <li>3. Return here to sign in</li>
            </ol>
          </div>
          <div className='text-center'>
            <p className='text-sm text-muted-foreground'>
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <Link
                href='/auth/signup'
                className='text-primary hover:underline font-medium'
              >
                try signing up again
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            className='w-full'
          >
            <Link href='/auth/signin'>Continue to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
