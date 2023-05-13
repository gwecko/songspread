import { Layout } from "@/components";
import Head from "next/head";
import Image from "next/image";
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
        <h1>booyah bitch</h1>
        <Image src={imageUrl} id="song-image" alt="list of top songs" fill />
        <h2>Press and hold to save</h2>
      </Layout>
    </>
  );
}

export default DownloadPage