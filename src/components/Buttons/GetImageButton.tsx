import { Button } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useState } from "react";

const GetImageButton: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const imageOptions = {
    backgroundColor: "null",
    scale: 3,
  };

  const getDataUrl = async () => {
    setLoading(true);
    const element = document.getElementById("tabDownload")!;
    const canvas = await html2canvas(element, imageOptions);
    const dataUrl = canvas.toDataURL();

    router.push({
      pathname: `/spread/[dataUrl]`,
      query: { dataUrl: dataUrl },
    });
  };

  return (
    <Button
      w="100%"
      colorPalette="purple"
      boxShadow="lg"
      onClick={getDataUrl}
      role="link"
      loading={loading}
      loadingText="skrrtt"
      _active={{ transform: "scale(0.95)" }}
      borderBottomRadius="40px"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--chakra-colors-purple-500) 60%, var(--chakra-colors-purple-600))",
      }}
    >
      Download Spread
    </Button>
  );
};

export default GetImageButton;
