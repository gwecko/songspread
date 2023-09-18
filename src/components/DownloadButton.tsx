import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";

// supported CSS properties:
// https://html2canvas.hertzen.com/features/


const DownloadButton: React.FC = () => {
  const router = useRouter();
  
  const imageOptions = {
    // width: window.innerWidth,
    // height: window.innerHeight,
    // backgroundColor: "#D6BCFA",
    backgroundColor: 'null',
  };

  const getDataUrl = async (e: any) => {
    e.preventDefault();
    const element = document.getElementById("tabDownload")!,
      canvas = await html2canvas(element, imageOptions),
      dataUrl = canvas.toDataURL();

    router.push({
      pathname: `/spread/[dataUrl]`,
      query: { dataUrl: dataUrl },
    });
  };

  return (
    <Button
      px={'4em'}
      colorScheme={"purple"}
      boxShadow={'lg'}
      onClick={(e) => getDataUrl(e)}
      role="link"
    >
      Get Image
    </Button>
  );
};

export default DownloadButton;
