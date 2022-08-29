import { getCurrentUser } from '@/lib/utils/currentUser'
import { prisma } from '@/lib/utils/database'
import { createNextRoute, createNextRouter } from '@ts-rest/next'
import { api } from 'server/api'

const scoreRouter = createNextRoute(api.score, {
  getHighScores: async ({ query: { game } }) => {
    const highScores = await prisma.score.findMany({
      where: {
        game,
      },
      distinct: ['userId'],
      orderBy: {
        score: 'desc',
      },
      select: {
        id: true,
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

    return {
      status: 200,
      body: {
        scores: highScores,
      },
    }
  },
  getMyScores: async ({ req, query }) => {
    const user = await getCurrentUser(req)

    if (!user) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized',
        },
      }
    }

    const myScores = await prisma.score.findMany({
      where: {
        userId: user.id,
        game: query.game,
      },
      orderBy: {
        score: 'desc',
      },
      select: {
        id: true,
        score: true,
        game: true,
        userId: true,
      },
      take: 5,
    })

    return {
      status: 200,
      body: { scores: myScores },
    }
  },
  addNewScore: async ({ body: { score, game }, req }) => {
    const user = await getCurrentUser(req)

    if (!user) {
      return {
        status: 401,
        body: {
          message: 'Unauthorized',
        },
      }
    }

    const newScore = await prisma.score.create({
      data: {
        score,
        game,
        userId: user.id,
      },
    })

    return {
      status: 200,
      body: {
        score: newScore,
      },
    }
  },
})

const router = createNextRoute(api, {
  score: scoreRouter,
})

export default createNextRouter(api, router)
