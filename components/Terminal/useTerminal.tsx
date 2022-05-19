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
  component: React.ReactNode
  description?: string
}

export const useTerminal = (programs: CliProgram[]) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = useState('')
  const [rows, setRows] = useState<TerminalRow[]>([{ type: 'command', text: 'info' }])

  const [hasFinishedInitialAnimation, setHasFinishedInitialAnimation] = useState(false)

  const handleClickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle ctl+l clear
    if ((e.key === 'l' && e.ctrlKey) || (e.key === 'Enter' && inputText === 'clear')) {
      setRows([])
      setInputText('')
    }

    // Handle on click enter
    if (e.key === 'Enter') {
      if (inputText === '') {
        return
      }

      const program = programs.find((program) => program.commands.includes(inputText))

      if (program) {
        // Inject the help component (avoid dependency cycle)
        if (program.name === 'help') program.component = <RowHelp programs={programs} />
        setRows([...rows, { type: 'command', text: inputText }, { type: 'program', program }])
      } else {
        appendRowWithCommand({ type: 'unknown-command', text: inputText }, inputText)
      }
      setInputText('')
    }

    // Handle go back a command
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

  const handleAnimationComplete = () => {
    if (!hasFinishedInitialAnimation) {
      setHasFinishedInitialAnimation(true)
      setRows([...rows, { type: 'program', program: programs[0] }])
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

  return {
    handleClickEnter,
    rows,
    hasFinishedInitialAnimation,
    handleAnimationComplete,
    inputRef,
    inputText,
    setInputText,
  }
}
