import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider value={defaultSystem}>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ChakraProvider>
    </SessionProvider>
  )
}
