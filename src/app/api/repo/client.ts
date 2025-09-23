type RepoQueryParams = {
  userId: string
  skip: number
  limit: number
}

function getRepos(q: RepoQueryParams) {
  return fetch(`/api/repo/client`, {
    method: 'GET',
    body: JSON.stringify(q),
  })
}

export { getRepos }
export type { RepoQueryParams }
