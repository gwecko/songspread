import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import {
  Layout,
  SignInButton,
  ListTabs,
  SignOutButton,
  GetImageButton,
  BorderAnimation,
} from "@/components";
import { Box, ButtonGroup, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

const ogImagePath = "og-image.png";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const authed = status === "authenticated";

  useEffect(() => {
    // Force sign in attempt to resolve error. String is passed from JWT
    if (session?.error === "RefreshAccessTokenError") {
      signIn("spotify");
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>SongSpread</title>
        <meta
          name="description"
          content="SongSpread displays your top Spotify songs. Save them to camera roll, and share with friends or online."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta property="og:title" content="SongSpread" />
        <meta property="og:image" content={ogImagePath} />
        <meta
          property="og:description"
          content="Your SongSpread is waiting for you &#128064;"
        />
        <meta property="og:url" content="https://songspread.app" />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        {authed ? (
          <Stack>
            <Box id="boxDownload" display={"block"}>
              <ListTabs session={session} />
            </Box>
            <Box
              pos={"fixed"}
              transform={"auto"}
              left={"50%"}
              translateX={"-50%"}
              bottom={["0.5em", "3em"]}
            >
              <ButtonGroup spacing={2}>
                <GetImageButton />
                <SignOutButton />
              </ButtonGroup>
            </Box>
          </Stack>
        ) : (
          <Box textAlign={"center"} margin={"20%"}>
            <BorderAnimation dimensions={[]}>
              <SignInButton />
            </BorderAnimation>
          </Box>
        )}
      </Layout>
    </>
  );
}
