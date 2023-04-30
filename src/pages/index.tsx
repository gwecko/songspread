/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { SignInButton, TrackList, ListTabs, SignOutButton, DownloadButton } from "@/components";
import { Box, Center, Flex, Heading, Spacer, Stack } from "@chakra-ui/react";
import { useEffect } from "react";

// the home page; at location '/'
export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(session?.session.expiresAt)
  


  return (
    <>
      <Head>
        <title>Grant is good</title>
        <meta
          name="description"
          content="Grant is good and this is his spotify app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display={"flex"}
        flexDirection={"column"}
        minH={"100vh"}
        alignItems={"center"}
        bg={"gray.400"}
        bgGradient={"linear(to bottom, gray.300 30%, purple.400 90%)"}
        bgAttachment={"fixed"}
      >
        <Heading
          bgGradient={"linear(to bottom, gray.200, purple.500 55%)"}
          bgClip={"text"}
          fontSize={"3.5em"}
          fontWeight={"extrabold"}
          marginY={5}
        >
          SongSpread
        </Heading>
        
        {!session
          ? <SignInButton />
          : <>
              <Box>
                <ListTabs session={session} />
              </Box>
              <DownloadButton />
              <SignOutButton />
            </>
        }
      </Box>
    </>
  );
}
