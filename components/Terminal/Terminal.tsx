import { useEffect, useRef, useState } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
import { Spotify } from 'types/Spotify'
import { RowCommand } from './Rows/RowCommand'
import { RowHelp } from './Rows/RowHelp'
import { RowInfo } from './Rows/RowInfo'
import { RowJohn } from './Rows/RowJohn'
import { RowSnake } from './Rows/RowSnake'
import { RowTree } from './Rows/RowTree'

type TerminalRow =
  | {
      type: 'info' | 'help' | 'snake' | 'tree' | 'john'
    }
  | {
      type: 'command' | 'unknown-command'
      text: string
    }

const RowRenderer = ({
  row,
  spotify,
  animateText,
  handleAnimationComplete,
  posts,
}: {
  row: TerminalRow
  spotify: Spotify | null
  animateText: boolean
  handleAnimationComplete: () => void
  posts: PostFrontMatter[]
}) => {
  switch (row.type) {
    case 'info':
      return <RowInfo spotify={spotify} />
    case 'help':
      return <RowHelp />
    case 'snake':
      return <RowSnake />
    case 'tree':
      return <RowTree posts={posts} />
    case 'john':
      return <RowJohn />
    case 'command':
    case 'unknown-command':
      return (
        <RowCommand
          animateText={animateText}
          text={row.text}
          unknown={row.type === 'unknown-command'}
          handleAnimationComplete={handleAnimationComplete}
        />
      )
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
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = useState('')
  const [rows, setRows] = useState<TerminalRow[]>([{ type: 'command', text: 'info' }])

  const [hasFinishedInitialAnimation, setHasFinishedInitialAnimation] = useState(false)

  const handleAnimationComplete = () => {
    if (!hasFinishedInitialAnimation) {
      setHasFinishedInitialAnimation(true)
      setRows([...rows, { type: 'info' }])
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [rows])

  useEffect(() => {
    handleFocusInput()
  }, [hasFinishedInitialAnimation])

  const appendRowWithCommand = (row: TerminalRow, inputText: string) => {
    setRows([...rows, { type: 'command', text: inputText }, row])
  }

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle ctl+l clear
    if (e.key === 'l' && e.ctrlKey) {
      setRows([])
      setInputText('')
    }

    // Handle on click enter
    if (e.key === 'Enter') {
      if (inputText === 'clear') {
        setRows([])
      } else if (inputText === 'help') {
        appendRowWithCommand({ type: 'help' }, inputText)
      } else if (inputText === 'info') {
        appendRowWithCommand({ type: 'info' }, inputText)
      } else if (inputText === 'snake') {
        appendRowWithCommand({ type: 'snake' }, inputText)
      } else if (inputText === 'tree') {
        appendRowWithCommand({ type: 'tree' }, inputText)
      } else if (inputText === 'john') {
        appendRowWithCommand({ type: 'john' }, inputText)
      } else {
        rows.push({ type: 'unknown-command', text: inputText })
      }

      setInputText('')
    }

    if (e.key === 'ArrowUp') {
      const commands = rows.filter((row) => row.type === 'command')

      const lastCommand = commands[commands.length - 1]

      if (lastCommand) {
        setInputText(lastCommand.type === 'command' ? lastCommand.text : '')

        setTimeout(function () {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = 10000
          }
        }, 0)
      }
    }
  }

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
            spotify={spotify}
            animateText={!hasFinishedInitialAnimation && index === 0}
            handleAnimationComplete={handleAnimationComplete}
            posts={posts}
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
