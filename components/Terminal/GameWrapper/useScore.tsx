import { apiRequest, ApiRoute, useQuery } from '@/lib/utils/useApi'
import { Game } from '@prisma/client'
import { GetHighScores } from 'pages/api/score/high'
import { AddNewScore, GetMyScores } from 'pages/api/score/my'

export const useScore = (game: Game) => {
  const currentHighScore = useQuery<GetMyScores>(ApiRoute.SCORE_MY, { query: { game } })

  const gameGlobalHighScore = useQuery<GetHighScores>(ApiRoute.SCORE_HIGH, {
    query: { game },
  })

  const addNewScore = async (score: number) => {
    if (isNotAuthed) {
      return
    }
    const { data } = await apiRequest<AddNewScore>('post', ApiRoute.SCORE_MY, {
      game,
      score,
    })

    currentHighScore.mutate()
    gameGlobalHighScore.mutate()
    return data
  }

  //@ts-ignore
  const isNotAuthed = currentHighScore?.data?.name === 'Unauthorized'

  const highScores = isNotAuthed ? null : currentHighScore.data

  const globalHighScores = gameGlobalHighScore?.data ?? undefined

  return {
    highScores,
    addNewScore,
    globalHighScores,
  }
}
