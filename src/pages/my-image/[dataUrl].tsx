import { Layout } from "@/components";
import { Box, Button, Divider, Heading, Text, } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MutableRefObject, useEffect, useRef } from "react";


const DownloadPage: React.FC = () => {

  const router = useRouter()
  const imageUrl: any = router.query.dataUrl!
  const focusRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }, [])
  
  return (
    <>
      <Head>
        <title>My SongSpread &#x1F47E;</title>
      </Head>
      <Layout>
        <Heading size={["xs", "sm"]}>Thanks for using SongSpread!</Heading>
        {/* <Divider w={'80%'} my={3} /> */}
        <Text fontSize={'sm'}>—— Tap + hold image to save ——</Text>
        <Box my={3}>
          <Image
            src={imageUrl}
            id="song-image"
            alt="list of top songs"
            width={380}
            height={380}
            ref={focusRef}
          />
        </Box>
        <Link href={"/"}>
          <Button colorScheme="purple" width={'10em'}>back</Button>
        </Link>
      </Layout>
    </>
  );
}

export default DownloadPage