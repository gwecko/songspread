import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";

// supported CSS properties:
// https://html2canvas.hertzen.com/features/


const GetImageButton: React.FC = () => {
  const router = useRouter();
  
  const imageOptions = {
    backgroundColor: 'null',
    scale: 3.5 
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
      bgGradient={'linear(to-r, purple.500 60%, purple.600)'}
      boxShadow={'lg'}
      onClick={(e) => getDataUrl(e)}
      role="link"
    >
      Get Image
    </Button>
  );
};

export default GetImageButton;
