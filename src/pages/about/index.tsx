/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import { Layout } from "@/components";
import { Box, Button, Code, Text, Link, Heading } from "@chakra-ui/react";
import BuyMeACoffeeWidget from "@/components/BuyMeACoffee";

// A .gif works, but in iMessage the gif will go full-screen instead of opening link
const ogImagePath = "og-image.png";

// the about/faq; at location '/about'
export default function About() {
  const highlightStyle = {
    color: "purple.600",
    fontWeight: "semibold",
    display: "inline",
  };

  return (
    <>
      <Head>
        <title>About</title>
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
          content="About the creator of SongSpread"
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
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="grantwecker"
          data-description="Support me on Buy me a coffee!"
          data-message="Much of this was built in coffee shops—thanks for your support!"
          data-color="#D6BCFA"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
      </Head>

      <Layout>
        <Box display={"flex"} flexDir={"column"} w={"90%"} maxW={"480px"}>
          <Box m={"auto"}>
            <Heading
              color={"purple.500"}
              fontFamily={"monospace"}
              fontWeight={"medium"}
            >
              About
            </Heading>
            <Box id="about-paragraph" m={4} display={"inline-block"}>
              <Text>
                I&apos;m Grant. It took 236 days(!) from the time I began
                working on SongSpread until Spotify approved the app for all of
                you to use—I&apos;m immensely happy to share it. While building
                SongSpread, I&nbsp;
                <Text {...highlightStyle}>
                  moved to a place I didn&apos;t know anyone
                </Text>
                &nbsp;and learned a lot about myself. I&apos;d pull out my
                laptop on&nbsp;
                <Text {...highlightStyle}>
                  lunch breaks during 60-hour work weeks
                </Text>
                &nbsp;to work on this. It was something I just had to do. In
                that new place, I proved something to myself that I had known
                for some time: I&apos;m&nbsp;
                <Text {...highlightStyle}>
                  obsessed with software development.
                </Text>
                <Text pt={4} mx={-2}>
                  Let me use my obsession to help you:
                </Text>
                <Code
                  colorScheme={"purple"}
                  display={"block"}
                  w={"fit-content"}
                  p={1}
                  m={2}
                >
                  <Link href="mailto:grantwecker@live.com">
                    grantwecker@live.com
                  </Link>
                </Code>
              </Text>
              <Text py={2} mx={-2}>
                Cheers!
              </Text>
            </Box>
          </Box>
          <Link href={"/"}>
            <Button
              variant={"solid"}
              color={"purple.400"}
              colorScheme={"whiteAlpha"}
              w={"100%"}
            >
              Back
            </Button>
          </Link>
        </Box>
      </Layout>
    </>
  );
}
