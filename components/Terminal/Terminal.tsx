import { signIn, signOut, useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { RowCommand } from './Rows/RowCommand'
import { RowHelp } from './Rows/RowHelp'
import { RowInfo } from './Rows/RowInfo'
import { RowLeaderBoard } from './Rows/RowLeaderBoard'
import { RowTree } from './Rows/RowTree'
import { CliProgram, TerminalRow, useTerminal } from './useTerminal'
import { GameWrapper } from './GameWrapper/GameWrapper'

export const RowRenderer = ({ row }: { row: TerminalRow }) => {
  switch (row.type) {
    case 'program':
      return <>{row.program.component({ closeFullscreen: () => undefined })}</>
    case 'command':
    case 'unknown-command':
      return <RowCommand text={row.text} unknown={row.type === 'unknown-command'} />
    default:
      return null
  }
}

export const Terminal = ({ posts }: { posts: PostFrontMatter[] }) => {
  const { data } = useSession()
  const user = data?.user

  const CLI_PROGRAMS = useMemo(
    (): CliProgram[] => [
      {
        name: 'info',
        commands: ['info', 'i'],
        component: () => <RowInfo />,
      },
      {
        name: 'help',
        commands: ['help', 'h'],
        component: () => <RowHelp />,
      },
      {
        name: 'snake',
        commands: ['snake', 's'],
        component: ({ closeFullscreen }) => (
          <GameWrapper game="SNAKE" closeFullscreen={closeFullscreen} />
        ),
        fullscreen: true,
      },
      {
        name: 'flappy-bird',
        commands: ['flappy-bird', 'fb'],
        component: ({ closeFullscreen }) => (
          <GameWrapper game="FLAPPY_BIRD" closeFullscreen={closeFullscreen} />
        ),
        fullscreen: true,
      },
      {
        name: 'vim',
        commands: ['vim'],
        component: () => (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="rick roll" src="https://i.giphy.com/media/g7GKcSzwQfugw/giphy.webp" />
        ),
      },
      {
        name: 'tree',
        commands: ['tree', 't', 'posts', 'blog'],
        component: () => <RowTree posts={posts} />,
      },
      {
        name: 'logout',
        commands: ['logout'],
        component: () => null,
        onLaunch: () => signOut(),
      },
      {
        name: 'login',
        commands: ['login'],
        component: () => null,
        onLaunch: () => signIn(),
      },
      {
        name: 'leaderboard',
        commands: ['leaderboard', 'lb'],
        component: () => <RowLeaderBoard />,
      },
      // Having a bit of fun
      ...['angus', 'john', 'spencer'].map((name) => ({
        name,
        commands: [name],
        component: () => <p>{name} is super cool 😎</p>,
      })),
    ],
    [posts]
  )

  const { rows, handleClickEnter, inputRef, inputText, setInputText, fullProgram, setFullProgram } =
    useTerminal(CLI_PROGRAMS)

  return (
    <div className="border-2 border-gray-300/25 bg-gray-500/5 font-mono text-sm dark:border-gray-800/25 dark:bg-gray-800/20">
      <div className="flex flex-row items-center p-2 dark:bg-gray-800/20">
        <div className="mr-3 flex flex-row space-x-1.5">
          <button
            className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-600/80 "
            onClick={() => setFullProgram(null)}
          />
          <button className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600/80" />
          <button className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-600/80" />
        </div>
        <span className=" text-sm text-gray-500">
          {fullProgram ? fullProgram.name + '.app' : null}
        </span>
      </div>
      <div className="h-80 overflow-y-auto">
        {fullProgram ? (
          fullProgram.component({ closeFullscreen: () => setFullProgram(null) })
        ) : (
          <div className="p-3">
            {rows.map((row, index) => (
              <RowRenderer key={index} row={row} />
            ))}
            <pre>
              <span className="text-primary-500">{user ? user.email : 'guest'}</span>
              <span className="text-sky-500"> $ </span>
              <input
                className="bg-transparent outline-none"
                onKeyDown={handleClickEnter}
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.currentTarget.value)}
              />
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
