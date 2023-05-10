import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Link from "next/link";
import path from "path";
import { useState } from "react";

// supported CSS properties:
// https://html2canvas.hertzen.com/features/

const imageOptions = {
  // width: window.innerWidth,
  // height: window.innerHeight,
  // backgroundColor: "#D6BCFA",
};


const DownloadButton: React.FC = () => {

  const [imageUrl, setImageUrl] = useState('')
  const getDataUrl = async () => {
    const element = document.getElementById("tabDownload")!,
    canvas =  await html2canvas(element, imageOptions)
    setImageUrl(canvas.toDataURL())
  }

  return (
    <Button mt={5} colorScheme={"purple"} onClick={getDataUrl}>
      <Link href={`/download?dataUrl=${encodeURIComponent(imageUrl)}`}>Download Image</Link>
    </Button>
  );
};

export default DownloadButton;
