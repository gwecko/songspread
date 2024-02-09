import React from "react";
import { Container } from "@chakra-ui/react";
import SignInButton from "./Buttons/SignInButton";
import FaqButton from "./Buttons/FaqButton";
import AboutButton from "./Buttons/AboutButton";

type ButtonBoxProps = {
  // children: React.ReactNode;
};

const ButtonBox: React.FC<ButtonBoxProps> = () =>
  // { children }
  {
    const boxShadowBlack = `0px 4px 4px 1px #00000050`;
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
        borderRadius="12px"
        border={"1px solid rgba(255, 255, 255, 0.71)"}
        bgGradient="linear(to-br, #ecdbed 30%, rgb(200, 181, 221))"
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
          <FaqButton />
          <AboutButton />
        </Container>
      </Container>
    );
  };

export default ButtonBox;
