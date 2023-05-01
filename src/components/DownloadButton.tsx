import { Button } from "@chakra-ui/react";
import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";

// can filter out elements with options argument
//https://www.npmjs.com/package/html-to-image
const imageOptions = {
  // width: window.innerWidth,
  // height: window.innerHeight,
  // backgroundColor: "#D6BCFA",
};

const DownloadButton: React.FC = () => {
  const handleDownload = async () => {
    const element = document.getElementById("tabDownload")!;
    html2canvas(element, imageOptions).then(canvas => {
      const dataUrl = canvas.toDataURL()
      const newWindow = window.open()
      newWindow?.document.write(`<img src="${dataUrl}" alt="Screenshot" />`);
    })
  };

  return (
    <Button mt={5} colorScheme={"purple"} onClick={handleDownload}>
      Download List
    </Button>
  );
};

export default DownloadButton;
