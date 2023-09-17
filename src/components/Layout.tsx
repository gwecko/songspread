import { Box, Heading, keyframes, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  
  const animationKeyframes = keyframes`
    0% { background-position: 0% 0% }
    100% { background-position: 200% 0% }
  `;
  const animation = `${animationKeyframes} 3s linear infinite`;
  const animationGradient = `linear-gradient(to right, #B794F4, #6B46C1, #B794F4)`;
  
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
          WebkitBackgroundClip: "text"
        }}
        fontWeight={"extrabold"}
        letterSpacing={"tighter"}
        animation={animation}
        whiteSpace={"nowrap"}
      >
        SongSpread
      </Heading>
      
      <Text fontStyle={"italic"} color={"purple.600"} fontWeight={'medium'} pb={2}>
        powered by Spotify
      </Text>

      {children}
    </Box>
  );
};

export default Layout;
