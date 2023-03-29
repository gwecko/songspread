/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession } from "next-auth/react"
import { SignInButton, TrackList } from '@/components'

const inter = Inter({ subsets: ['latin'] })
// https://www.urlencoder.io


export default function Home() {
  
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <Head>
        <title>Grant is good</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.user}>
            {loading && <div className={styles.title}>Loading...</div>}
            {
              session 
              ? <TrackList session={ session } />
              : <SignInButton />
            }
          </div>
        </main>
      </div>
    </>
  );
}
