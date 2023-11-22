import { Layout, BorderAnimation, ShareToIGButton } from "@/components";
import { Box, Button, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

const DownloadPage: React.FC = () => {
  const router = useRouter();
  const imageUrl: any = router.query.dataUrl!;
  const focusRef = useRef<HTMLImageElement>(null);
  // height and width should be same, otherwise image gets wonky
  const width = 1920;
  const height = width;

  // attempt to fix bug where initial tap & hold to save does not work
  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  return (
    <>
      <Head>
        <title>SongSpread</title>
      </Head>
      <Layout>
        <Text
          fontSize={"sm"}
          mt={3}
          color={"purple.800"}
          fontWeight={"semibold"}
        >
          —— Press + hold image to save ——
        </Text>
        <Box m={5} borderRadius={"10px"} maxW={"600px"} shadow={"base"}>
          <Image
            style={{zIndex: 99}}
            src={imageUrl}
            id="song-image"
              alt="list of top songs"
            width={width}
            height={height}
            ref={focusRef}
            placeholder="blur"
            // this is the color purple as a base-64 1x1 pixel string
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMYfjvAgAD3AGpprqP0wAAAABJRU5ErkJggg=="
          />
        </Box>
        <Box mb={"10%"}>
          {/* <ShareToIGButton file={imageUrl} /> */}
          <Link href={"/"}>
            <Button colorScheme="purple" width={"10em"}>
              back
            </Button>
          </Link>
        </Box>
      </Layout>
    </>
  );
};

export default DownloadPage;
