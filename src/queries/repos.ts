import { getRepos, RepoQueryParams } from '@/app/api/repo/client'
import { queryOptions, useQuery } from '@tanstack/react-query'

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

export { useRepos }
