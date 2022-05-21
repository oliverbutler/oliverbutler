import { useSession } from 'next-auth/react'
import { Spotify } from 'types/Spotify'

export const RowInfo = ({ spotify }: { spotify: Spotify | null }) => {
  const { data } = useSession()
  const user = data?.user

  return (
    <pre className="pb-3 text-sm">
      <pre className="mt-2">
        Welcome {user ? user.name : 'guest'}! Type{' '}
        <code className="italic text-primary-400">help</code> to get started
      </pre>
    </pre>
  )
}
