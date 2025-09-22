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
import { AlertTriangle, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-lg'>
        <CardHeader className='space-y-1 text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10'>
            <AlertTriangle className='h-8 w-8 text-destructive' />
          </div>
          <div className='space-y-2'>
            <p className='text-base font-semibold text-primary'>404</p>
            <CardTitle className='text-4xl font-bold tracking-tight sm:text-5xl'>
              Page not found
            </CardTitle>
          </div>
          <CardDescription className='text-lg'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='rounded-lg bg-muted p-4'>
            <p className='text-sm text-muted-foreground text-center'>
              The page you&apos;re looking for might have been moved, deleted,
              or doesn&apos;t exist.
            </p>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col items-center space-y-3 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-3'>
          <Button
            asChild
            className='w-full sm:w-auto'
          >
            <Link
              href='/'
              className='inline-flex items-center'
            >
              <Home className='mr-2 h-4 w-4' />
              Go back home
            </Link>
          </Button>
          <Button
            asChild
            variant='outline'
            className='w-full sm:w-auto'
          >
            <Link
              href='/contact'
              className='inline-flex items-center'
            >
              Contact support
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
