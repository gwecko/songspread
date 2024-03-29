import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ChakraProvider>
    </SessionProvider>
  )
}
