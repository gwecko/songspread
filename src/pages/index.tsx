import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import {
  Layout,
  SpreadTabs,
  GetImageButton,
  AboutButton,
  FaqButton,
} from "@/components";
import { Box, Container, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import ButtonBox from "@/components/ButtonBox";

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
        <meta name="theme-color" content="#e9dbed"></meta>
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
      </Head>

      <Layout>
        {authed ? (
          <Stack align={"center"}>
            <Box id="boxDownload">
              <SpreadTabs session={session} />
            </Box>
            <Container w={"16em"}>
              <GetImageButton />
            </Container>
            <Container pt={5} px={20} maxW={'500px'} display={'flex'} opacity={'70%'}>
              <FaqButton />
              <AboutButton />
            </Container>
          </Stack>
        ) : (
          <Box textAlign={"center"} margin={"20%"}>
            <ButtonBox />
          </Box>
        )}
      </Layout>
    </>
  );
}
