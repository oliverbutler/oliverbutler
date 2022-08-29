import { LoaderText } from '@/components/LoaderText'
import { Game } from '@prisma/client'
import { apiClient } from 'pages/_app'

export const getAwardEmoji = (index: number) => {
  switch (index) {
    case 0:
      return '🥇'
    case 1:
      return '🥈'
    case 2:
      return '🥉'
    default:
      return ' '
  }
}

export const RowLeaderBoard = () => {
  const globalHighScores = apiClient.score.getHighScores.useQuery([`global-scores-${Game.SNAKE}`], {
    query: { game: Game.SNAKE },
  })

  const highScores = globalHighScores.data?.body.scores

  return (
    <div className="mb-3">
      {highScores ? (
        <ul>
          <div>{'===> Snake 🐍 <==='}</div>
          {highScores.map((score, index) => (
            <li key={score.score}>
              {getAwardEmoji(index) + ' '}
              {score.score} {score.user.name}
            </li>
          ))}
        </ul>
      ) : (
        <LoaderText />
      )}
    </div>
  )
}
