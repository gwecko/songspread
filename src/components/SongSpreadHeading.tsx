import useOrientation from "@/hooks/useOrientation";
import { Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const SongSpreadHeading: React.FC = () => {
  const animationKeyframes = keyframes`

    0% { background-position: 0% 0% }
    100% { background-position: 200% 0% }
  `;
  const animation = `${animationKeyframes} 4s linear infinite`;
  const animationGradient = `linear-gradient(to right, #B794F4, #553C9A, #B794F4)`;

  
  return (
    <>
      <Heading
        as={motion.h1}
        style={{
          fontSize: "3.5em",
          color: "transparent",
          backgroundImage: animationGradient,
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
        }}
        fontWeight={"extrabold"}
        letterSpacing={"tighter"}
        animation={animation}
      >
        SongSpread
      </Heading>

      <Text
        fontStyle={"italic"}
        color={"purple.600"}
        fontWeight={"medium"}
        pb={2}
        mt={-2}
      >
        powered by Spotify
      </Text>
    </>
  );
}

export default SongSpreadHeading