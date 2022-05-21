import { prisma } from '@/lib/utils/database'
import { NextApiRequest, NextApiResponse } from 'next'

type HighScore = {
  game: 'SNAKE'
  score: number
  user: {
    name: string | null
  }
}

export type GetHighScores = {
  highScores: HighScore[]
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const highScores = await prisma.score.findMany({
    distinct: ['userId'],
    orderBy: {
      score: 'desc',
    },
    select: {
      score: true,
      game: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    take: 5,
  })

  const response: GetHighScores = {
    highScores,
  }

  return res.json(response)
}
