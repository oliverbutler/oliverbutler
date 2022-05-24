import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from './database'

export const getCurrentUser = async (req: NextApiRequest) => {
  const session = await getSession({ req })

  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id: session.id } })

  return user
}
