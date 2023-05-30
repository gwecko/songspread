import { Layout } from "@/components";
import { Box, Button, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";


const DownloadPage: React.FC = () => {

  const router = useRouter()
  const imageUrl: any = router.query.dataUrl!
  
  return (
    <>
      <Head>
        <title>SongSpread &#x1F47E; my list</title>
      </Head>
      <Layout>
        <Heading size={["xs", "sm"]}>Thanks for using SongSpread!</Heading>
        <Image
          src={imageUrl}
          id="song-image"
          alt="list of top songs"
          width={380}
          height={380}
        />
        <h2>Press and hold to save</h2>
        <Button colorScheme="purple">
          <Link href={"/"}>Back</Link>
        </Button>
      </Layout>
    </>
  );
}

export default DownloadPage