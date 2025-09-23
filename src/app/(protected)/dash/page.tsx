'use client'

import { useAuthContext } from '@/hooks/useAuthContext'
import { useRepos } from '@/queries/repos'
import { Nav } from './Nav'
import RepoItem from './RepoItem'

const DashPage = () => {
  const { user, isLoading: authLoading } = useAuthContext()
  const { data: repos, isLoading: reposLoading } = useRepos({
    userId: user?.id,
    skip: 0,
    limit: 10,
  })

  return (
    <div>
      <Nav title='Repos' />
      <main>
        <ul
          role='list'
          className='divide-y divide-gray-100 dark:divide-white/5'
        >
          {authLoading || reposLoading
            ? 'loading'
            : repos?.length
              ? repos.map((project) => (
                  <li key={project.id}>
                    <RepoItem
                      key={project.id}
                      repo={project}
                    />
                  </li>
                ))
              : 'no repos'}
        </ul>
      </main>
    </div>
  )
}

// const projects: RepoItemType[] = [
//   {
//     id: 1,
//     url: 'https://github.com/acme/graphql-api',
//     owner: 'acme',
//     name: 'GraphQL API',
//     owner_name: 'Leslie Alexander',
//     user_id: 'user_123',
//     status: 'Healthy',
//     updated_at: '2023-03-17T00:00Z',
//   },
//   {
//     id: 2,
//     url: 'https://github.com/acme/benefits-plan',
//     owner: 'acme',
//     name: 'New benefits plan',
//     owner_name: 'Leslie Alexander',
//     user_id: 'user_123',
//     status: 'Reviewing',
//     updated_at: '2023-05-05T00:00Z',
//   },
//   {
//     id: 3,
//     url: 'https://github.com/acme/onboarding-emails',
//     owner: 'acme',
//     name: 'Onboarding emails',
//     owner_name: 'Courtney Henry',
//     user_id: 'user_456',
//     status: 'Importing',
//     updated_at: '2023-05-25T00:00Z',
//   },
//   {
//     id: 4,
//     url: 'https://github.com/acme/ios-app',
//     owner: 'acme',
//     name: 'iOS app',
//     owner_name: 'Leonard Krasner',
//     user_id: 'user_789',
//     status: 'Bugs',
//     updated_at: '2023-06-07T00:00Z',
//   },
//   {
//     id: 5,
//     url: 'https://github.com/acme/marketing-site',
//     owner: 'acme',
//     name: 'Marketing site redesign',
//     owner_name: 'Courtney Henry',
//     user_id: 'user_456',
//     status: 'Archived',
//     updated_at: '2023-06-10T00:00Z',
//   },
// ]

export default DashPage
