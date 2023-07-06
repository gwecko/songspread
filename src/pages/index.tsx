import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { Layout, SignInButton, ListTabs, SignOutButton, DownloadButton } from "@/components";
import { Box, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  useEffect(() => {
    // Force sign in attempt to resolve error. String is passed from JWT
    if (session?.error === "RefreshAccessTokenError") {
      signIn('spotify');
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
        {status === "unauthenticated" ? (
          <SignInButton />
        ) : (
          <Stack>
            <Box id="boxDownload" display={"block"}>
              <ListTabs session={session} />
            </Box>
            <Box mt={"auto"} position={"sticky"} textAlign={"center"}>
              <DownloadButton />
              {/* <SignOutButton /> */}
            </Box>
          </Stack>
        )}
      </Layout>
    </>
  );
}
