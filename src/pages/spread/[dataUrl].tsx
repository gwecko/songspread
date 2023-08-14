import { Layout, BorderAnimation } from "@/components";
import { Box, Button, Text, } from "@chakra-ui/react";
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
  const width = 1920
  const height = width

  // attempt to fix bug where initial tap & hold to save does not work
  useEffect(() => {
    focusRef.current?.focus()
  }, []);

  return (
    <>
      <Head>
        <title>My SongSpread&#x1F47E;</title>
      </Head>
      <Layout>
        <Text fontSize={"sm"} mt={3}>
          —— Press + hold image to save ——
        </Text>
        <Box my={3} px={3} maxW={'600px'}>
          <BorderAnimation dimensions={[height, width ]}>
            <Image
              src={imageUrl}
              id="song-image"
              alt="list of top songs"
              width={width}
              height={height}
              ref={focusRef}
            />
          </BorderAnimation>
        </Box>
        <Box mb={'10%'}>
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
