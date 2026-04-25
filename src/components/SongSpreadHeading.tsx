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
// Inset highlight only on the bottom half, so the top edge can blend into the
// safe-area shelf without a visible white seam against the iPhone notch.
const insetShadow = `inset 0px -10px 15px -2px rgba(255, 255, 255, 0.7)`;

const SongSpreadHeading: React.FC = () => {
  return (
    <>
      {/* Lavender shelf sized to JUST the iOS safe-area / notch. Keeping it
          thin (instead of wrapping the pill) prevents the shelf colour from
          showing past the pill's rounded-bottom corners onto the page bg. */}
      <div
        style={{
          width: "100%",
          height: "env(safe-area-inset-top)",
          backgroundColor: pillTopColor,
        }}
      />
      {/* Centering wrapper for the pill. The pill itself uses `mt: -2rem` to
          tuck up under the shelf — the overlap area is the same lavender as
          the pill's gradient top stop, so the seam is invisible while pulling
          the wordmark closer to the notch. */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Container
        w="100vw"
        maxW="container.sm"
        mt="-2rem"
        display="flex"
        flexDir="column"
        justifyContent="end"
        textAlign="center"
        position="relative"
        height="8rem"
        p={2}
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
            // Chakra v3's Heading recipe pins line-height to a fixed `1.875rem`
            // (30px). With a 3.5em (56px) font that line-box is shorter than
            // the glyphs, so `background-clip: text` only fills the top half of
            // each letter and the rest renders as `color: transparent`.
            // Override with a relative line-height that scales with font-size.
            lineHeight: 1.1,
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
    </>
  );
};

export default SongSpreadHeading;
