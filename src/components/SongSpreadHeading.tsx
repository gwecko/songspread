import { Container, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const SongSpreadHeading: React.FC = () => {
  const animationKeyframes = keyframes`

    0% { background-position: 0% 0% }
    100% { background-position: 200% 0% }
  `;
  const animation = `${animationKeyframes} 4s linear infinite`;
  const animationGradient = `linear-gradient(to right, #B794F4, #553C9A, #B794F4)`;

  const boxShadowBlack = `0px 6px 4px 2px #00000030`;
  const boxShadowWhite = `0px 1px 10px 0px rgb(255, 255, 255, .5)`;
  const boxShadowPurple = `0px 10px 40px 2px #7634bd`;
  const insetShadow = `inset 0px 0px 15px 3px rgba(255, 255, 255, 0.7)`;
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Container
        w={"100vw"}
        maxW="container.sm"
        display={"flex"}
        flexDir={"column"}
        justifyContent={"end"}
        textAlign={"center"}
        pos={"relative"}
        top={"-2rem"}
        height={"9rem"}
        p={3}
        borderBottomRadius="6.5rem"
        border={"1px solid rgba(255, 255, 255, 0.71)"}
        bgGradient="linear(to-b, #ecdbed 30%, rgb(200, 181, 221))"
        boxShadow={`${boxShadowBlack}, ${boxShadowWhite}, ${boxShadowPurple}, ${insetShadow}`}
      >
        <Heading
          as={motion.h1}
          style={{
            fontSize: "3.5em",
            color: "transparent",
            backgroundImage: animationGradient,
            backgroundSize: "200% 100%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textShadow: "0px 4px 4px rgba(255, 255, 255, 0.3)",
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
      </Container>
    </div>
  );
}

export default SongSpreadHeading