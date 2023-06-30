/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { Layout, SignInButton, ListTabs, SignOutButton, DownloadButton } from "@/components";
import { Box, Stack } from "@chakra-ui/react";
import { cl } from "@/helpers";
import { useEffect } from "react";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

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
        {status === "unauthenticated" || loading ? (
          <SignInButton />
        ) : (
          <Stack>
            <Box id="boxDownload" display={"block"}>
              <ListTabs session={session} />
            </Box>
            <Box mt={"auto"} position={"sticky"} textAlign={"center"}>
              <DownloadButton />
              <SignOutButton />
            </Box>
          </Stack>
        )}
      </Layout>
    </>
  );
}
