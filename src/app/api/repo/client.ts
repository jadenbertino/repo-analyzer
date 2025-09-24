import { supabase } from '@/lib/clients/browser'
import { RepoInsert, RepoRow } from '@/lib/database'

type RepoQueryParams = {
  userId: string | undefined
  skip: number
  limit: number
}

async function getRepos(q: RepoQueryParams): Promise<RepoRow[]> {
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

async function createRepo(params: RepoInsert): Promise<RepoRow> {
  const { data, error } = await supabase
    .from('repo')
    .insert(params)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export { createRepo, getRepos }
export type { RepoInsert, RepoQueryParams }
