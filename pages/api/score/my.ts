/* eslint-disable import/no-anonymous-default-export */
import { getCurrentUser } from '@/lib/utils/currentUser'
import { prisma } from '@/lib/utils/database'
import {
  apiError,
  apiResponse,
  APIResponseWithBody,
  APIResponseWithQuery,
  ApplicationError,
} from '@/lib/utils/useApi'
import { Game, Score } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export type GetMyScores = APIResponseWithQuery<{ game: Game }, Score[], ApplicationError>

export type AddNewScore = APIResponseWithBody<
  { game: Game; score: number },
  Score,
  ApplicationError
>

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    case 'POST':
      return post(req, res)
    default:
      return apiError<GetMyScores>(res, { name: 'Method not allowed' }, 405)
  }
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { game, score } = req.body

  if (!game || !score) {
    return apiError<AddNewScore>(res, { name: 'Bad request' }, 400)
  }

  const user = await getCurrentUser(req)

  if (!user) {
    return apiError<AddNewScore>(res, { name: 'Unauthorized' }, 401)
  }

  const newScore = await prisma.score.create({
    data: {
      game,
      userId: user.id,
      score,
    },
  })

  return apiResponse<AddNewScore>(res, newScore, 201)
}

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { game } = req.query

  if (!game) {
    return apiError<GetMyScores>(res, { name: 'Bad Request' }, 400)
  }

  const user = await getCurrentUser(req)

  if (!user) {
    return apiError<GetMyScores>(res, { name: 'Unauthorized' }, 401)
  }

  const scores = await prisma.score.findMany({
    where: {
      game: game as Game,
      userId: user.id,
    },
    orderBy: {
      score: 'desc',
    },
    take: 5,
  })

  return apiResponse<GetMyScores>(res, scores)
}
