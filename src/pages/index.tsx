/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Layout, SignInButton, ListTabs, SignOutButton, DownloadButton } from "@/components";
import { Box } from "@chakra-ui/react";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  

  return (
    <>
      <Head>
        <title>SongSpread &#x1F47E;</title>
        <meta
          name="description"
          content="SongSpread shows your top songs from Spotify."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {status !== 'authenticated' ? (
          <SignInButton />
        ) : (
          <>
            <Box id="boxDownload" display={'block'}>
              <ListTabs session={session} />
            </Box>
              <Box display={'block'}
                pos={'fixed'} bottom={'10%'} textAlign={'center'} overflowY={'hidden'}>
              <DownloadButton />
              <SignOutButton />
            </Box>
          </>
        )}
      </Layout>
    </>
  );
}
