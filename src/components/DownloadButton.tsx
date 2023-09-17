import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";

// supported CSS properties:
// https://html2canvas.hertzen.com/features/


interface Props {
  backgroundColor: string,
}

const DownloadButton: React.FC<Props> = ({backgroundColor}) => {
  const router = useRouter();
  
  const imageOptions = {
    // width: window.innerWidth,
    // height: window.innerHeight,
    // backgroundColor: "#D6BCFA",
    backgroundColor: backgroundColor,
    // backgroundImage: 
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
      // mt={5}
      px={'3em'}
      colorScheme={"purple"}
      onClick={(e) => getDataUrl(e)}
      role="link"
    >
      Get Image
    </Button>
  );
};

export default DownloadButton;
