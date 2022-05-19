import { RowCommand } from './Rows/RowCommand'
import { TerminalRow } from './useTerminal'

export const RowRenderer = ({
  row,
  animateText,
  handleAnimationComplete,
}: {
  row: TerminalRow
  animateText: boolean
  handleAnimationComplete: () => void
}) => {
  switch (row.type) {
    case 'program':
      return <>{row.program.component}</>
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
