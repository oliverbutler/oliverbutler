import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('GITHUB_ID and GITHUB_SECRET must be set in .env');
}

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error('GITHUB_ID and GITHUB_SECRET must be set in .env');
}

declare module 'next-auth' {
  export interface Session {
    id: string
  }
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      session.id = user.id
      return Promise.resolve(session)
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
})
