import {
  createRepo,
  deleteRepo,
  getRepos,
  RepoQueryParams,
} from '@/app/api/repo/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const QUERY_KEYS = {
  all: ['repos'],
  byUserId: ({ userId, skip, limit }: RepoQueryParams) => [
    ...QUERY_KEYS.all,
    userId,
    { skip, limit },
  ],
} as const

const useRepos = (q: RepoQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.byUserId(q),
    queryFn: () => getRepos(q),
    enabled: !!q.userId,
  })
}

const useCreateRepo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRepo,
    onSuccess: () => {
      // Invalidate repos queries to refetch the list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.all,
      })
    },
  })
}

const useDeleteRepo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRepo,
    onSuccess: () => {
      // Invalidate repos queries to refetch the list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.all,
      })
      toast.success('Repository deleted successfully')
    },
    onError: (error) => {
      toast.error(`Failed to delete repository: ${error.message}`)
    },
  })
}

export { useCreateRepo, useDeleteRepo, useRepos }
