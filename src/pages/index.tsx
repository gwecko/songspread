/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Layout, SignInButton, ListTabs, SignOutButton, DownloadButton } from "@/components";
import { Box, Center, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(session)
  const username = session?.user?.name
  

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
        {!session ? (
          <SignInButton />
        ) : (
          <>
            <Box id="boxDownload">
              <ListTabs session={session} />
            </Box>
              <DownloadButton />
            <SignOutButton />
          </>
        )}
      </Layout>
    </>
  );
}
