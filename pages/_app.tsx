import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import { initQueryClient } from '@ts-rest/react-query'
import { api } from 'server/api'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export const apiClient = initQueryClient(api, {
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  baseHeaders: {},
})

export const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        {isDevelopment && isSocket && <ClientReload />}
        <QueryClientProvider client={queryClient}>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
