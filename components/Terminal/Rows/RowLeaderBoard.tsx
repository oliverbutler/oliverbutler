import { LoaderText } from '@/components/LoaderText'
import { ApiRoute, useQuery } from '@/lib/utils/useApi'
import { GetHighScores } from 'pages/api/score/high'

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
  const { data } = useQuery<GetHighScores>(ApiRoute.SCORE_HIGH, { query: { game: 'all' } })

  return (
    <div className="mb-3">
      {data ? (
        <ul>
          <div>{'===> Snake 🐍 <==='}</div>
          {data.map((score, index) => (
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
