import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useState } from "react";

// supported CSS properties:
// https://html2canvas.hertzen.com/features/

const GetImageButton: React.FC = () => {
  const router = useRouter();

  let [loading, setLoading] = useState(false);

  const imageOptions = {
    backgroundColor: "null",
    scale: 3,
  };

  const getDataUrl = async () => {
    setLoading(true);
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
      px={"4em"}
      colorScheme={"purple"}
      bgGradient={"linear(to-r, purple.500 60%, purple.600)"}
      boxShadow={"lg"}
      onClick={getDataUrl}
      role="link"
      isLoading={loading}
      loadingText="skrrttt"
      _active={{ transform: "scale(0.95)" }}
    >
      Get Image
    </Button>
  );
};

export default GetImageButton;
