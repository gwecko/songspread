import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";

// supported CSS properties:
// https://html2canvas.hertzen.com/features/

const imageOptions = {
  // width: window.innerWidth,
  // height: window.innerHeight,
  // backgroundColor: "#D6BCFA",
};


const DownloadButton: React.FC = () => {
  
  const router = useRouter()

  const getDataUrl = async (e: any) => {
    e.preventDefault()
    const element = document.getElementById("tabDownload")!,
      canvas = await html2canvas(element, imageOptions),
      dataUrl = canvas.toDataURL()
    
    router.push({
      pathname: '/my-image/[dataUrl]',
      query: { dataUrl: dataUrl },
    })
  }

  return (
    <Button mt={5} colorScheme={"purple"} onClick={(e)=>getDataUrl(e)} role='link'>
        Download Image
    </Button>
  );
};

export default DownloadButton;
