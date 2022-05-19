import { CliProgram } from '../useTerminal'

export const RowHelp = ({ programs }: { programs: CliProgram[] }) => (
  <pre className="mb-3 flex flex-col text-sm">
    {programs
      .filter((p) => p.description)
      .map((program) => (
        <span key={program.name}>
          <span className="text-primary-500">{program.name}</span> - {program.description}
        </span>
      ))}
  </pre>
)
