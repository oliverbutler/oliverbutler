import { useEffect, useRef, useState } from 'react'
import { RowHelp } from './Rows/RowHelp'

export type TerminalRow =
  | {
      type: 'program'
      program: CliProgram
    }
  | {
      type: 'command' | 'unknown-command'
      text: string
    }

export type CliProgram = {
  name: string
  commands: string[]
  component: ({ closeFullscreen }: { closeFullscreen: () => void }) => React.ReactNode
  fullscreen?: boolean
  onLaunch?: () => void
}

export const useTerminal = (programs: CliProgram[]) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = useState('')
  const [rows, setRows] = useState<TerminalRow[]>([{ type: 'program', program: programs[0] }])
  const [fullProgram, setFullProgram] = useState<CliProgram | null>(null)

  const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = inputText.trim().toLowerCase()

    // Handle ctl+l clear
    if ((e.key === 'l' && e.ctrlKey) || (e.key === 'Enter' && inputText === 'clear')) {
      setRows([])
      setInputText('')
    }

    // Handle on click enter
    if (e.key === 'Enter') {
      if (text === '') {
        return
      }

      const program = programs.find((program) => program.commands.includes(text))

      if (program) {
        if (program.onLaunch) {
          program.onLaunch()
        }

        if (program.fullscreen) {
          setFullProgram(program)
          setRows([...rows, { type: 'command', text }])
        } else {
          setRows([...rows, { type: 'command', text }, { type: 'program', program }])
        }
      } else {
        setRows([...rows, { type: 'unknown-command', text }])
      }
      setInputText('')
    }

    // Handle go back a command
    if (e.key === 'ArrowUp') {
      const commands = rows.filter(
        (row) => row.type === 'command' || row.type === 'unknown-command'
      )

      const lastCommand = commands[commands.length - 1]

      if (lastCommand) {
        setInputText((lastCommand as { text: string }).text)

        setTimeout(function () {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = 10000
          }
        }, 0)
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [rows])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return {
    handleClickEnter,
    rows,
    inputRef,
    inputText,
    setInputText,
    fullProgram,
    setFullProgram,
  }
}
