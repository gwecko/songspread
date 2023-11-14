/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import { Layout } from "@/components";
import { Box, Button, Text, Link, Heading, IconButton } from "@chakra-ui/react";
import { AiOutlineInstagram } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import Script from "next/script";

// A .gif works, but in iMessage the gif will go full-screen instead of opening link
const ogImagePath = "og-image.png";

type questionAndAnswer = {
  q: string;
  a: string;
};

// the about/faq; at location '/faq'
export default function FAQ() {
  const highlightStyle = {
    color: "purple.600",
    fontWeight: "semibold",
    display: "inline",
  };

  const questionsAndAnswers: questionAndAnswer[] = [
    {
      q: "Will you steal my Spotify login?",
      a: `No, I can't see it even if I wanted to.`,
    },
    {
      q: "What does SongSpread do?",
      a: "SongSpread shows your top songs over different spans of time. You can customize the list and save it to your camera roll.",
    },
    {
      q: "What do I do with the list?",
      a: `Whatever you like. Text it to your mom, or post to Instagram stories. I noticed people like sharing songs on social media, now you can share multiple in a kickass list.`,
    },
    {
      q: "Will you add <feature> ??",
      a: `Let me know what you're thinking!`,
    },
  ];

  return (
    <>
      <Head>
        <title>FAQ</title>
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
        <meta property="og:description" content="Questions about SongSpread" />
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

      <Script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="grantwecker"
        data-description="Support me on Buy me a coffee!"
        data-message="☕?"
        data-color="#D6BCFA"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      />

      <Layout>
        <Box display={"flex"} flexDir={"column"} w={"90%"} maxW={"480px"}>
          <Heading
            color={"purple.500"}
            fontFamily={"monospace"}
            fontWeight={"medium"}
            pb={3}
          >
            FAQ
          </Heading>
          {questionsAndAnswers.map((qna, i) => (
            <Box key={i} mb={3}>
              <Text
                fontSize={"xl"}
                fontWeight={"semibold"}
                color={"purple.700"}
              >
                {qna.q}
              </Text>
              <Text lineHeight={"1.2em"} ml={2}>
                {qna.a}
              </Text>
            </Box>
          ))}

          <Box mx={"auto"} pt={5}>
            <Link href="mailto:grantwecker@live.com" p={1} mx={1}>
              <IconButton
                aria-label="email grantwecker@live.com"
                as={HiOutlineMail}
                variant={"ghost"}
                color={"whiteAlpha.800"}
                overlineThickness={1}
              />
            </Link>
            <Link
              isExternal
              href="https://www.instagram.com/g_weck/"
              p={1}
              mx={1}
            >
              <IconButton
                aria-label="instagram @g_weck"
                as={AiOutlineInstagram}
                variant={"ghost"}
                color={"whiteAlpha.800"}
              ></IconButton>
            </Link>
          </Box>

          <Box pt={"20%"} w={"70%"} mx={"auto"}>
            <Link href={"/"}>
              <Button
                variant={"ghost"}
                color={"purple.50"}
                colorScheme={"whiteAlpha"}
                w={"100%"}
              >
                Back
              </Button>
            </Link>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
