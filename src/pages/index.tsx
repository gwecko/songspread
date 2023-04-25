/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { SignInButton, TrackList, ListTabs, SignOutButton, DownloadButton } from "@/components";
import { Box, Center, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <Head>
        <title>Grant is good</title>
        <meta
          name="description"
          content="Grant is good and this is his spotify app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {console.log(loading)}
      <Box
        display={"flex"}
        flexDirection={"column"}
        h={'-webkit-fit-content'}
        minH={"100vh"}
        alignItems={"center"}
        bg={"gray.400"}
        bgGradient={"linear(to bottom, gray.300 60%, purple.300)"}    
        bgAttachment={'fixed'}
      >
        <Heading
          bgGradient={"linear(to bottom, gray.400 20%, purple.500)"}
          bgClip={"text"}
          fontSize={"5xl"}
          fontWeight={"extrabold"}
          paddingY={2}
        >
          SongSpread
        </Heading>
        {!session?.token.accessToken ? (
          <SignInButton />
        ) : (
          <>
            <Box>
              <ListTabs session={session} />
            </Box>
            <DownloadButton />
            <SignOutButton />
          </>
        )}
      </Box>
    </>
  );
}
