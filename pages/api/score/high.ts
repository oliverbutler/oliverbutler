/* eslint-disable import/no-anonymous-default-export */
import { getCurrentUser } from '@/lib/utils/currentUser'
import { prisma } from '@/lib/utils/database'
import {
  apiError,
  APIResponse,
  apiResponse,
  APIResponseWithQuery,
  ApplicationError,
} from '@/lib/utils/useApi'
import { Game, Score } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

type HighScore = {
  game: Game
  score: number
  userId: string
  user: {
    name: string | null
  }
}

export type GetHighScores = APIResponseWithQuery<
  { game: Game | 'all' },
  HighScore[],
  ApplicationError
>

export type AddGameScoreBody = {
  game: Game
  score: number
}

export type CreateHighScore = APIResponse<Score, ApplicationError>

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    case 'POST':
      return post(req, res)
    default:
      return apiError<GetHighScores>(res, { name: 'Method not allowed' }, 405)
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { game, score } = req.body as AddGameScoreBody

  if (!game || !score) {
    return apiError<CreateHighScore>(res, { name: 'Bad Request' }, 400)
  }

  const user = await getCurrentUser(req)

  if (!user) {
    return apiError<CreateHighScore>(res, { name: 'Unauthorized' }, 401)
  }

  const newScore = await prisma.score.create({
    data: {
      game,
      score,
      userId: user.id,
    },
  })

  return apiResponse<CreateHighScore>(res, newScore)
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { game } = req.query as GetHighScores['query']

  const highScores = await prisma.score.findMany({
    where: {
      game: game === 'all' ? undefined : { equals: game },
    },
    distinct: ['userId'],
    orderBy: {
      score: 'desc',
    },
    select: {
      score: true,
      game: true,
      userId: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    take: 5,
  })

  return apiResponse<GetHighScores>(res, highScores)
}
