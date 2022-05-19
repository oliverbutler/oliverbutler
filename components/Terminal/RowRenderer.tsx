import { RowCommand } from './Rows/RowCommand'
import { TerminalRow } from './useTerminal'

export const RowRenderer = ({ row }: { row: TerminalRow }) => {
  switch (row.type) {
    case 'program':
      return <>{row.program.component}</>
    case 'command':
    case 'unknown-command':
      return <RowCommand text={row.text} unknown={row.type === 'unknown-command'} />
    default:
      return null
  }
}
