import { useSession } from 'next-auth/react'

export const RowCommand = ({ text, unknown }: { text: string; unknown: boolean }) => {
  const { data } = useSession()
  const user = data?.user

  const username = user ? user?.email : 'guest'

  return (
    <pre>
      <span className="text-primary-500">{username}</span>
      <span className="text-sky-500"> $ </span>
      <span className={unknown ? 'text-red-500' : ''}>
        {text}
        {unknown && ' - use "help" for a list of commands'}
      </span>
    </pre>
  )
}
