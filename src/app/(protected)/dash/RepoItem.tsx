import { RepoRow, RepoStatus } from '@/lib/database'
import { cn } from '@/lib/utils'
import { useDeleteRepo } from '@/queries/repos'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVertical, Loader2 } from 'lucide-react'
import { useMemo } from 'react'

export default function RepoItem({ repo }: { repo: RepoRow }) {
  const deleteRepoMutation = useDeleteRepo()

  const handleDelete = () => {
    deleteRepoMutation.mutate(repo.id)
  }

  return (
    <div className='flex items-center justify-between gap-x-6 py-5'>
      <div className='min-w-0'>
        <div className='flex items-start gap-x-3'>
          <p className='text-sm/6 font-semibold text-gray-900 dark:text-white'>
            {repo.name}
          </p>
          <RepoStatusBadge status={repo.status} />
        </div>
        <div className='mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500 dark:text-gray-400'>
          <p className='whitespace-nowrap'>
            Updated at{' '}
            <time dateTime={repo.updated_at}>
              {new Date(repo.updated_at).toLocaleDateString()}
            </time>
          </p>
          <svg
            viewBox='0 0 2 2'
            className='size-0.5 fill-current'
          >
            <circle
              r={1}
              cx={1}
              cy={1}
            />
          </svg>
          <p className='truncate'>Owner: {repo.owner}</p>
        </div>
      </div>
      <div className='flex flex-none items-center gap-x-4'>
        <a
          // href={repo.}
          className='hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:block dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20'
        >
          View repo<span className='sr-only'>, {repo.name}</span>
        </a>
        <Menu
          as='div'
          className='relative flex-none'
        >
          <MenuButton className='relative flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer'>
            <span className='sr-only'>Open options</span>
            <EllipsisVertical
              aria-hidden='true'
              className='size-5'
            />
          </MenuButton>
          <MenuItems
            transition
            className='absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'
          >
            <MenuItem as='div'>
              <button
                onClick={handleDelete}
                disabled={deleteRepoMutation.isPending}
                className='flex w-full items-center gap-2 px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed dark:text-white dark:data-focus:bg-white/5'
              >
                {deleteRepoMutation.isPending ? (
                  <Loader2 className='size-3 animate-spin' />
                ) : null}
                Delete<span className='sr-only'>, {repo.name}</span>
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}

function RepoStatusBadge({ status }: { status: string }) {
  const statusStyles: Record<RepoStatus, string> = useMemo(
    () => ({
      // Importing:
      // 'bg-blue-50 text-blue-700 inset-ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:inset-ring-blue-500/20',
      reviewing:
        'bg-orange-50 text-orange-700 inset-ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:inset-ring-orange-500/20',
      bugs: 'bg-red-50 text-red-700 inset-ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:inset-ring-red-500/20',
      healthy:
        'bg-green-50 text-green-700 inset-ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:inset-ring-green-500/20',
      error:
        'bg-red-50 text-red-700 inset-ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:inset-ring-red-500/20',
      archived:
        'bg-yellow-50 text-yellow-800 inset-ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-500 dark:inset-ring-yellow-400/20',
    }),
    [],
  )

  return (
    <p
      className={cn(
        'mt-0.5 rounded-md px-2 py-0.5 text-xs font-medium inset-ring',
        statusStyles?.[status as RepoStatus],
      )}
    >
      {status}
    </p>
  )
}
