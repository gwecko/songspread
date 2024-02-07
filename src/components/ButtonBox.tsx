import React from "react";
import { Button, Container, Link } from "@chakra-ui/react";
import SignInButton from "./Buttons/SignInButton";

type ButtonBoxProps = {
  // children: React.ReactNode;
};

const ButtonBox: React.FC<ButtonBoxProps> = () =>
  // { children }
  {
    const boxShadowBlack = `0px 4px 4px 2px #00000050`;
    const boxShadowWhite = `0px 2px 10px 0px rgb(255, 255, 255, .5)`;
    const boxShadowPurple = `0px 10px 20px 2px #7634bd`;
    const insetShadow = `inset 0px 0px 10px 3px #00000030`;

    return (
      <Container
        w={"80vw"}
        maxW="container.sm"
        display={"flex"}
        flexDir={"column"}
        p={4}
        // bg="green.100"
        borderRadius="12px"
        border={"1px solid rgba(255, 255, 255, 0.71)"}
        bgGradient="linear(to-br, #e8a4ec 10%, rgb(171, 124, 221) 50%)"
        boxShadow={`${boxShadowBlack}, ${boxShadowWhite}, ${boxShadowPurple}, ${insetShadow}`}
      >
        <SignInButton />
        <Container
          display={"flex"}
          flexDir={"row"}
          w={"100%"}
          justifyContent={"space-between"}
          p={0}
          mt={4}
        >
          <Link href={"/about"} w={"100%"} mr={3}>
            <Button
              w={"100%"}
              fontSize={"smaller"}
              variant={"outline"}
              border={"1px solid rgba(255, 255, 255, 0.6)"}
              bg={"whiteAlpha.400"}
              boxShadow={boxShadowBlack}
              color={"#6B46C1"}
              _active={{ transform: "scale(0.98)" }}
            >
              what is this
            </Button>
          </Link>
          <Link href={"/faq"} w={"100%"}>
            <Button
              w={"100%"}
              fontSize={"smaller"}
              variant={"outline"}
              border={"1px solid rgba(255, 255, 255, 0.4)"}
              bg={"whiteAlpha.200"}
              boxShadow={boxShadowBlack}
              color={"white"}
              _active={{ transform: "scale(0.98)" }}
            >
              about
            </Button>
          </Link>
        </Container>
      </Container>
    );
  };

export default ButtonBox;
