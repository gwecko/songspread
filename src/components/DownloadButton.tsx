import { Button } from "@chakra-ui/react"
import * as htmlToImage from 'html-to-image'
import { defaultConfig } from "next/dist/server/config-shared";

// can filter out elements with options argument
//https://www.npmjs.com/package/html-to-image
const imageOptions = {
  canvasWidth: undefined,
  canvasHeight: undefined,
  backgroundColor: '#D6BCFA'
};

const DownloadButton: React.FC = (Props) => {
  const handleDownload = async () => {
    const element = document.getElementById("convertToImage")!;
    const dataUrl = await htmlToImage.toPng(element, imageOptions)
    const link = document.createElement('a')
    link.href = dataUrl
    link.target = '_blank'
    link.click()
  }
  
  return (
    <Button mt={5} colorScheme={"purple"} onClick={handleDownload}>
      Download List
    </Button>
  );
};

export default DownloadButton
