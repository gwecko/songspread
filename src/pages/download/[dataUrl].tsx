import { Layout } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";


const DownloadPage: React.FC = () => {
  
  const router = useRouter()
  const imageUrl: any = router.query.dataUrl!
  console.log(imageUrl)
  return (
    <Layout>
      <h1>booyah bitch</h1>
      <Image src={imageUrl} id="song-image" alt="list of top songs" fill/>
      <h2>Press and hold to save</h2>
    </Layout>
  )
}

export default DownloadPage