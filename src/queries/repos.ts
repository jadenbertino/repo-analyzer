import { createRepo, getRepos, RepoQueryParams } from '@/app/api/repo/client'
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const QUERY_KEYS = {
  all: ['repos'],
  byUserId: ({ userId, skip, limit }: RepoQueryParams) => [
    ...QUERY_KEYS.all,
    userId,
    { skip, limit },
  ],
} as const

const QUERY_OPTIONS = {
  byUserId: (q: RepoQueryParams) =>
    queryOptions({
      queryKey: QUERY_KEYS.byUserId(q),
      queryFn: () => getRepos(q),
      enabled: !!q.userId,
    }),
}

const useRepos = (q: RepoQueryParams) => {
  return useQuery(QUERY_OPTIONS.byUserId(q))
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

export { useCreateRepo, useRepos }
