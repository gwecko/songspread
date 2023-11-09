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

// A .gif works, but in iMessage the gif will go full-screen instead of opening link
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
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta
          name="description"
          content="SongSpread displays your top Spotify songs. Save them to camera roll, and share with friends or online."
        />
        <meta
          property="og:title"
          content="Your SongSpread's waiting for you &#128064;"
        />
        <meta property="og:image" content={ogImagePath} />
        <meta
          property="og:description"
          content="View, save, and share your top Spotify songs!"
        />
        <meta property="og:url" content="https://songspread.app" />
        <meta property="og:type" content="website" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="favicons/site.webmanifest" />
        <style>{`
        body {
          background-color: #A0AEC0; !important
        }
      `}</style>
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
              bottom={["1em", "3em"]}
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
