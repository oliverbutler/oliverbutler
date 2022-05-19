export const RowCommand = ({ text, unknown }: { text: string; unknown: boolean }) => (
  <pre>
    <span className="text-primary-400">olly</span>
    <span className="text-sky-400"> $ </span>
    <span className={unknown ? 'text-red-400' : ''}>
      {text}
      {unknown && ' - use "help" for a list of commands'}
    </span>
  </pre>
)
