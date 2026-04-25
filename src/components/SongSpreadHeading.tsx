import { Container, Heading, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const pillTopColor = "#ecdbed";
const pillBottomColor = "rgb(200, 181, 221)";

const animationKeyframes = keyframes`
  0%   { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
`;
const animation = `${animationKeyframes} 4s linear infinite`;
const animationGradient = `linear-gradient(to right, #b390f0, #7D4FD3, #b390f0)`;

const boxShadowBlack = `0px 6px 4px 2px #00000030`;
const boxShadowWhite = `0px 1px 10px 0px rgb(255, 255, 255, .5)`;
// Tighter spread + lower blur so the purple glow doesn't bleed past the pill's
// rounded-bottom corners onto the page background.
const boxShadowPurple = `0px 6px 18px -2px rgba(118, 52, 189, 0.55)`;
const insetShadow = `inset 0px 0px 15px 3px rgba(255, 255, 255, 0.7)`;

const SongSpreadHeading: React.FC = () => {
  return (
    // Full-width shelf that paints the iOS safe-area / notch with the same
    // lavender as the top of the pill, so the pill appears to grow out of it.
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: pillTopColor,
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <Container
        w="100vw"
        maxW="container.sm"
        display="flex"
        flexDir="column"
        // Center content vertically; the rounded-bottom corners curve inward
        // and would clip the wordmark if we pinned it to the bottom.
        justifyContent="center"
        textAlign="center"
        position="relative"
        // Pill needs to be taller than its bottom-radius so the corner curves
        // don't bite into the text. Bottom-radius is 6.5rem, so a 9rem pill
        // leaves ~2.5rem of straight side-walls for the wordmark to sit in.
        height="9rem"
        px={2}
        pt={2}
        // Nudge content up slightly so it sits in the visually safe zone,
        // above where the bottom curves start eating in.
        pb="2.25rem"
        borderBottomRadius="6.5rem"
        border="1px solid rgba(255, 255, 255, 0.7)"
        borderTop="none"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${pillTopColor} 30%, ${pillBottomColor})`,
          boxShadow: `${boxShadowBlack}, ${boxShadowWhite}, ${boxShadowPurple}, ${insetShadow}`,
        }}
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
          fontWeight="extrabold"
          letterSpacing="tighter"
          animation={animation}
        >
          SongSpread
        </Heading>

        <Text
          fontStyle="italic"
          color="purple.600"
          fontWeight="medium"
          pb={2}
          mt={-2}
        >
          powered by Spotify
        </Text>
      </Container>
    </div>
  );
};

export default SongSpreadHeading;
