import { useMemo } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Spotify } from 'types/Spotify'
import { RowCommand } from './Rows/RowCommand'
import { RowInfo } from './Rows/RowInfo'
import { RowSnake } from './Rows/RowSnake'
import { RowTree } from './Rows/RowTree'
import { CliProgram, TerminalRow, useTerminal } from './useTerminal'

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

export const Terminal = ({
  spotify,
  posts,
}: {
  spotify: Spotify | null
  posts: PostFrontMatter[]
}) => {
  const CLI_PROGRAMS = useMemo(
    (): CliProgram[] => [
      {
        name: 'info',
        commands: ['info', 'i'],
        component: () => <RowInfo spotify={spotify} />,
        description: 'Show some info',
      },
      {
        name: 'help',
        commands: ['help', 'h'],
        component: () => null,
        description: 'Show this help message',
      },
      {
        name: 'snake',
        commands: ['snake', 's'],
        component: ({ closeFullscreen }) => <RowSnake closeFullscreen={closeFullscreen} />,
        description: 'Play Snake 🐍',
        fullscreen: true,
      },
      {
        name: 'vim',
        commands: ['vim'],
        component: () => (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="rick roll" src="https://i.giphy.com/media/g7GKcSzwQfugw/giphy.webp" />
        ),
        description: 'A super cool editor',
      },
      {
        name: 'tree',
        commands: ['tree', 't', 'posts', 'blog'],
        component: () => <RowTree posts={posts} />,
        description: 'Show the blog tree',
      },
      // Having a bit of fun
      ...['angus', 'john', 'spencer'].map((name) => ({
        name,
        commands: [name],
        component: () => <p>{name} is super cool 😎</p>,
      })),
    ],
    [spotify, posts]
  )

  const { rows, handleClickEnter, inputRef, inputText, setInputText, fullProgram, setFullProgram } =
    useTerminal(CLI_PROGRAMS)

  return (
    <div className="border-2 border-gray-300/25 bg-gray-400/5 font-mono dark:border-gray-800/25 dark:bg-gray-800/20">
      <div className="flex flex-row items-center p-2 dark:bg-gray-800/20">
        <div className="mr-3 flex flex-row space-x-1.5">
          <button
            className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-600/80 "
            onClick={() => setFullProgram(null)}
          />
          <button className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600/80" />
          <button className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-600/80" />
        </div>
        <span className=" text-sm text-gray-400">
          {fullProgram ? fullProgram.name + '.app' : null}
        </span>
      </div>
      <div className="h-80 overflow-y-auto p-3">
        {fullProgram ? (
          fullProgram.component({ closeFullscreen: () => setFullProgram(null) })
        ) : (
          <>
            {rows.map((row, index) => (
              <RowRenderer key={index} row={row} />
            ))}
            <pre>
              <span className="text-primary-400">olly</span>
              <span className="text-sky-400"> $ </span>
              <input
                className="bg-transparent outline-none"
                onKeyDown={handleClickEnter}
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.currentTarget.value)}
              />
            </pre>
          </>
        )}
      </div>
    </div>
  )
}
