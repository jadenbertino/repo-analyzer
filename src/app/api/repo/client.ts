import { supabase } from '@/lib/clients/browser'
import { Repo } from '@/lib/database'

type RepoQueryParams = {
  userId: string | undefined
  skip: number
  limit: number
}

async function getRepos(q: RepoQueryParams): Promise<Repo[]> {
  if (!q.userId) {
    throw new Error('userId is required')
  }
  const { data, error } = await supabase
    .from('repo')
    .select('*')
    .eq('user_id', q.userId)
    .range(q.skip, q.limit)
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export { getRepos }
export type { RepoQueryParams }
