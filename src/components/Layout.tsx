import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
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
        as={"h1"}
        bgGradient={"linear(to bottom, gray.200, purple.500 55%)"}
        bgClip={"text"}
        fontSize={"3.5em"}
        fontWeight={"extrabold"}
        marginTop={3}
        letterSpacing={"tight"}
      >
        SongSpread
      </Heading>

      {children}
    </Box>
  );
};

export default Layout;
