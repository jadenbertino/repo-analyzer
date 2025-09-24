'use client'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useCreateRepo, useRepos } from '@/queries/repos'
import { DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { Nav } from './Nav'
import RepoItem from './RepoItem'

const DashPage = () => {
  const { user, isLoading: authLoading } = useAuthContext()
  const { data: repos, isLoading: reposLoading } = useRepos({
    userId: user?.id,
    skip: 0,
    limit: 10,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    url: '',
  })

  const createRepoMutation = useCreateRepo()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.id) {
      alert('User not authenticated')
      return
    }

    try {
      await createRepoMutation.mutateAsync({
        name: formData.name,
        owner: formData.owner,
        url: formData.url,
        user_id: user.id,
      })

      // Reset form and close modal on success
      setFormData({ name: '', owner: '', url: '' })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating repo:', error)
      // You might want to show a toast or error message here
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <Nav title='Repos' />
      <main>
        <div className='mb-6'>
          <button
            onClick={() => setIsModalOpen(true)}
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400'
          >
            + Create
          </button>
        </div>

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

      <Modal
        open={isModalOpen}
        onClose={setIsModalOpen}
      >
        <div className='sm:flex sm:items-start'>
          <div className='mt-3 text-center sm:mt-0 sm:text-left w-full'>
            <DialogTitle
              as='h3'
              className='text-base font-semibold text-gray-900 dark:text-white'
            >
              Create New Repository
            </DialogTitle>
            <div className='mt-4'>
              <form
                onSubmit={handleFormSubmit}
                className='space-y-4'
              >
                <Input
                  id='name'
                  name='name'
                  label='Repository Name'
                  type='text'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder='my-awesome-repo'
                />

                <Input
                  id='owner'
                  name='owner'
                  label='Owner'
                  type='text'
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                  placeholder='username or organization'
                />

                <Input
                  id='url'
                  name='url'
                  label='Repository URL'
                  type='url'
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                  placeholder='https://github.com/owner/repo'
                />

                <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    disabled={createRepoMutation.isPending}
                    className='inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:hover:bg-indigo-400'
                  >
                    {createRepoMutation.isPending
                      ? 'Creating...'
                      : 'Create Repository'}
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(false)}
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
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
