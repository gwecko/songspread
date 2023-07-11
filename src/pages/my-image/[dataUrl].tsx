import { Layout } from "@/components";
import BorderAnimation from "@/components/BorderAnimation";
import { Box, Button, Text, border } from "@chakra-ui/react";
import { motion } from "framer-motion";
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
  const imageHeight = 380
  const imageWidth = 380

  // fixes a bug where initial tap & hold to save does not work
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
  

  /* const borderAnimation = {
    
    backgroundImage: 'linear-gradient(to right, #a8c0ff, #3f2b96)',
    initial: { rotate: '0' },
    animate: {rotate: '360'},
    transition: { repeat: 'Infinity', duration: '2' }
  } */

  return (
    <>
      <Head>
        <title>My SongSpread&#x1F47E;</title>
      </Head>
      <Layout>
        <Text fontStyle={"italic"} color={"purple.600"} fontWeight={"semibold"}>
          powered by Spotify
        </Text>
        <Text fontSize={"sm"} mt={3}>
          —— Tap + hold image to save ——
        </Text>
        <Box my={3} zIndex={2}>
          <BorderAnimation height={imageHeight} width={imageWidth}>
            <Image
              src={imageUrl}
              id="song-image"
              alt="list of top songs"
              width={imageWidth}
              height={imageHeight}
              ref={focusRef}
            />
          </BorderAnimation>
        </Box>
        <Link href={"/"}>
          <Button colorScheme="purple" width={"10em"}>
            back
          </Button>
        </Link>
      </Layout>
    </>
  );
};

export default DownloadPage;
