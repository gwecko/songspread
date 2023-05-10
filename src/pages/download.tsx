import { Layout } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";


const DownloadPage: React.FC = () => {
  const router = useRouter()
  const dataUrl: string = router.query.dataUrl!
  const imageUrl = decodeURIComponent(dataUrl)
  
  return (
    <Layout>
      <h1>booyah bitch</h1>
      <Image src={imageUrl} alt="list of top songs" />
      <h2>Press and hold to save</h2>
    </Layout>
  )
}

export default DownloadPage