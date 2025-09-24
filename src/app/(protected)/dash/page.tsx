'use client'

import Modal from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthContext } from '@/hooks/useAuthContext'
import { useCreateRepo, useRepos } from '@/queries/repos'
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
          <Button onClick={() => setIsModalOpen(true)}>+ Create</Button>
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
        <DialogHeader>
          <DialogTitle>Create New Repository</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleFormSubmit}
          className='space-y-4'
        >
          <div className='space-y-2'>
            <Label htmlFor='name'>Repository Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder='my-awesome-repo'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='owner'>Owner</Label>
            <Input
              id='owner'
              name='owner'
              type='text'
              value={formData.owner}
              onChange={handleInputChange}
              required
              placeholder='username or organization'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='url'>Repository URL</Label>
            <Input
              id='url'
              name='url'
              type='url'
              value={formData.url}
              onChange={handleInputChange}
              required
              placeholder='https://github.com/owner/repo'
            />
          </div>

          <div className='mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
            <Button
              type='button'
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={createRepoMutation.isPending}
            >
              {createRepoMutation.isPending
                ? 'Creating...'
                : 'Create Repository'}
            </Button>
          </div>
        </form>
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
