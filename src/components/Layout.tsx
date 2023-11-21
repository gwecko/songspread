import { Box, Heading, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import useOrientation from "@/hooks/useOrientation";
import SongSpreadHeading from "./SongSpreadHeading";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const isVertical = useOrientation();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      minH={'100vh'}
      alignItems={"center"}
      bg={"gray.400"}
      bgGradient={"linear(to bottom, gray.300 30%, purple.400 90%)"}
      bgAttachment={"fixed"}
      pb={'120px'}
    >
    
      <SongSpreadHeading />

      {/* Check for device orientation */}
      {isVertical ? (
        children
      ) : (
        <Box>
          <Heading
            position={"absolute"}
            top={"2.6em"}
            left={"50%"}
            transform={"auto"}
            translateX={"-50%"}
            color={"purple.500"}
            whiteSpace={"nowrap"}
            fontSize={"1.8em"}
          >
            Turn your phone vertical &#40;:
          </Heading>
          <Image
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG92cXUyaDZmOTJuMnY0bzcybGljaGJqZHpmNzZjazdsMmM4MWZnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iDIJezAxNyRsZTx678/giphy.gif"
            width="240"
            height="180"
            pos={"absolute"}
            alt="comedian Tim Robinson confused, saying 'What the heck?'"
            top={"7em"}
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
