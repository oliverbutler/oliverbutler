import { CliProgram } from '../useTerminal'

const info = {
  info: 'Show some info',
  help: 'Show this help message',
  login: 'Login (via GitHub)',
  logout: 'Logout',
}

const games = {
  leaderboard: 'Show the leader board',
  snake: 'Play Snake 🐍',
}

export const RowHelp = ({ programs }: { programs: CliProgram[] }) => (
  <pre className="mb-3 flex flex-col text-sm">
    <div className="flex flex-col">
      <p>{`===> General <===`}</p>
      {Object.keys(info).map((program) => (
        <span key={program}>
          <span className="text-primary-500">{program}</span> - {info[program]}
        </span>
      ))}
    </div>
    <div className="mt-2 flex flex-col">
      <p>{`===> Games <===`}</p>
      {Object.keys(games).map((program) => (
        <span key={program}>
          <span className="text-primary-500">{program}</span> - {games[program]}
        </span>
      ))}
    </div>
  </pre>
)
