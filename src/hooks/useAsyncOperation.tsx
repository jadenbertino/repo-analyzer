'use client'

import { useCallback, useState } from 'react'

interface UseAsyncOperationState {
  isLoading: boolean
  isError: boolean
  error: Error | null
}

interface UseAsyncOperationActions {
  setIsLoading: (loading: boolean) => void
  setError: (error: Error | null) => void
  setIsError: (isError: boolean) => void
  reset: () => void
  execute: <T>(asyncFn: () => Promise<T>) => Promise<T | null>
}

type UseAsyncOperationReturn = UseAsyncOperationState & UseAsyncOperationActions

const useAsyncOperation = ({
  initialLoading,
}: {
  initialLoading: boolean
}): UseAsyncOperationReturn => {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [error, setError] = useState<Error | null>(null)
  const [isError, setIsError] = useState(false)

  const reset = useCallback(() => {
    setIsLoading(initialLoading)
    setError(null)
    setIsError(false)
  }, [initialLoading])

  const handleSetError = useCallback((newError: Error | null) => {
    setError(newError)
    setIsError(!!newError)
  }, [])

  const execute = useCallback(
    async <T,>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        setIsLoading(true)
        setError(null)
        setIsError(false)

        const result = await asyncFn()

        setIsLoading(false)
        return result
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An unknown error occurred')
        handleSetError(error)
        setIsLoading(false)
        return null
      }
    },
    [handleSetError],
  )

  return {
    isLoading,
    isError,
    error,
    setIsLoading,
    setError: handleSetError,
    setIsError,
    reset,
    execute,
  }
}

export { useAsyncOperation }
export type {
  UseAsyncOperationActions,
  UseAsyncOperationReturn,
  UseAsyncOperationState,
}
