import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { Layout, SignInButton, ListTabs, SignOutButton, GetImageButton, BorderAnimation } from "@/components";
import { Box, ButtonGroup, Heading, Stack, } from "@chakra-ui/react";
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
          content="SongSpread displays your top songs in a downloadable image format."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {status === "unauthenticated" ? (
          <Box textAlign={"center"} margin={"20%"}>
            <BorderAnimation dimensions={[]}>
              <SignInButton />
            </BorderAnimation>
            <Heading
              as={"h2"}
              fontSize={"sm"}
              fontWeight={"semibold"}
              pt={"10%"}
            >
              Coming soon. Dependent on Spotify&apos;s review process.
            </Heading>
          </Box>
        ) : (
          <Stack>
            <Box id="boxDownload" display={"block"}>
              <ListTabs session={session} />
            </Box>
            <Box
              pos={"fixed"}
              transform={'auto'}
              left={"50%"}
              translateX={'-50%'}
              bottom={['0.5em', '3em',]}
            >
              <ButtonGroup spacing={2}>
                <GetImageButton />
                <SignOutButton />
              </ButtonGroup>
            </Box>
          </Stack>
        )}
      </Layout>
    </>
  );
}
