import { Game } from '@prisma/client'
import { initContract } from '@ts-rest/core'
import { z } from 'zod'

const c = initContract()

const GameEnum = z.nativeEnum(Game)

const ScoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  game: GameEnum,
  score: z.number(),
})

const HighScoreSchema = z.object({
  id: z.string(),
  userId: z.string(),
  game: GameEnum,
  score: z.number(),
  user: z.object({
    name: z.string().nullable(),
  }),
})

export const scoreApi = c.router({
  getMyScores: {
    method: 'GET',
    path: '/score/my',
    query: z.object({
      game: GameEnum,
    }),
    responses: {
      200: z.object({
        scores: z.array(ScoreSchema),
      }),
    },
  },
  getHighScores: {
    method: 'GET',
    path: '/score/high',
    responses: {
      200: z.object({
        scores: z.array(HighScoreSchema),
      }),
    },
    query: z.object({
      game: GameEnum,
    }),
  },

  addNewScore: {
    method: 'POST',
    path: '/score/my',
    responses: {
      201: z.object({
        score: ScoreSchema,
      }),
    },
    body: z.object({
      game: GameEnum,
      score: z.number(),
    }),
  },
})

export const api = c.router({
  score: scoreApi,
})
