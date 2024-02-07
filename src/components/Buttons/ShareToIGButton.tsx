import React from "react";
import { Box, Button, Link } from "@chakra-ui/react";

interface Props {
  file: string
}

const ShareToIGButton: React.FC<Props> = ({ file }) => {
  
  
  const shareImageAsset = async () => {
    const blob = await new Blob(file)
    const filesArray = [
      new File([blob], `songspread.png`, {
        type: 'image/png',
        lastModified: new Date().getTime(),
      }),
    ];
    const shareData = {
      title: `songspread`,
      files: filesArray,
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    }
  };
  
  return (
    <Box>
      <Link href="instagram-stories://share" bg={'whiteAlpha.400'} h={'100%'}>
        <Button
          size={"lg"}
          colorScheme={'whiteAlpha'}
          bgGradient={'linear(to-tl, purple.500, pink.400, orange.300)'}
          bgClip={'text'}
          _active={{ transform: "scale(0.95)" }}
        >
          Open IG stories
        </Button>
      </Link>
    </Box>
  );
};

export default ShareToIGButton;
