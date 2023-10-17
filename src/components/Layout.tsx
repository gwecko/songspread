import { Box, Heading, keyframes, Stack, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import useOrientation from "@/hooks/useOrientation";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const animationKeyframes = keyframes`
    0% { background-position: 0% 0% }
    100% { background-position: 200% 0% }
  `;
  const animation = `${animationKeyframes} 3s linear infinite`;
  const animationGradient = `linear-gradient(to right, #B794F4, #6B46C1, #B794F4)`;

  const isVertical = useOrientation();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      minH={"100vh"}
      alignItems={"center"}
      bg={"gray.400"}
      bgGradient={"linear(to bottom, gray.300 30%, purple.400 90%)"}
      bgAttachment={"fixed"}
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
        }}
        fontWeight={"extrabold"}
        letterSpacing={"tighter"}
        animation={animation}
        pt={0}
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

      {isVertical ? (
        children
      ) : (
        <Box>
            <Heading
            position={"absolute"}
            top={"2.3em"}
            left={"50%"}
            transform={"auto"}
            translateX={"-50%"}
            color={"purple.500"}
            whiteSpace={'nowrap'}
          >
            Turn your phone vertical &#40;:
          </Heading>
          <Image
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG92cXUyaDZmOTJuMnY0bzcybGljaGJqZHpmNzZjazdsMmM4MWZnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iDIJezAxNyRsZTx678/giphy.gif"
            width="240"
            height="180"
            pos={"absolute"}
            alt="comedian Tim Robinson confused, saying 'What the heck?'"
            top={"8em"}
            left={"50%"}
            transform={"auto"}
            translateX={"-50%"}
          />
        </Box>
      )}
    </Box>
  );
};

export default Layout;
