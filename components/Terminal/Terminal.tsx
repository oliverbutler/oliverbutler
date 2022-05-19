import { useMemo } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Spotify } from 'types/Spotify'
import { RowRenderer } from './RowRenderer'
import { RowInfo } from './Rows/RowInfo'
import { RowSnake } from './Rows/RowSnake'
import { RowTree } from './Rows/RowTree'
import { CliProgram, useTerminal } from './useTerminal'

export const Terminal = ({
  spotify,
  posts,
}: {
  spotify: Spotify | null
  posts: PostFrontMatter[]
}) => {
  const CLI_PROGRAMS: CliProgram[] = useMemo(
    () => [
      {
        name: 'info',
        commands: ['info', 'i'],
        component: <RowInfo spotify={spotify} />,
        description: 'Show some info',
      },
      {
        name: 'help',
        commands: ['help', 'h'],
        component: null,
        description: 'Show this help message',
      },
      {
        name: 'snake',
        commands: ['snake', 's'],
        component: <RowSnake />,
        description: 'Play Snake 🐍',
      },
      {
        name: 'tree',
        commands: ['tree', 't', 'posts', 'blog'],
        component: <RowTree posts={posts} />,
        description: 'Show the blog tree',
      },
      // Having a bit of fun
      ...['angus', 'john', 'spencer'].map((name) => ({
        name,
        commands: [name],
        component: <p>{name} is super cool 😎</p>,
      })),
    ],
    [spotify, posts]
  )

  const {
    rows,
    handleClickEnter,
    hasFinishedInitialAnimation,
    handleAnimationComplete,
    inputRef,
    inputText,
    setInputText,
  } = useTerminal(CLI_PROGRAMS)

  return (
    <div className="border-2 border-gray-300/25 bg-gray-400/5 font-mono dark:border-gray-800/25 dark:bg-gray-800/20">
      <div className="flex flex-row items-center p-2 dark:bg-gray-800/20">
        <div className="mr-3 flex flex-row space-x-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-600/80 " />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-600/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-600/80" />
        </div>
      </div>
      <div className="h-72 overflow-y-auto p-3">
        {rows.map((row, index) => (
          <RowRenderer
            key={index}
            row={row}
            animateText={!hasFinishedInitialAnimation && index === 0}
            handleAnimationComplete={handleAnimationComplete}
          />
        ))}
        {hasFinishedInitialAnimation ? (
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
        ) : null}
      </div>
    </div>
  )
}
