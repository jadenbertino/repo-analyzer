'use client'

import { AuthProvider } from '@/context/Auth'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) => {
    // Sentry.captureException(error)
    // },
  }),
  mutationCache: new MutationCache({
    // onError: (error) => {
    // Sentry.captureException(error)
    // },
  }),
})

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export { Providers }
