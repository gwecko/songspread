import { Button, Link } from "@chakra-ui/react";

const AboutButton = () => {
  const boxShadowBlack = `0px 4px 4px 1px #00000050`;

  return (
    <Link href={"/about"} w={"100%"}>
      <Button
        w={"100%"}
        fontSize={"smaller"}
        variant={"outline"}
        border={"1px solid rgba(255, 255, 255, 0.4)"}
        bg={"whiteAlpha.200"}
        boxShadow={boxShadowBlack}
        color={"white"}
        _active={{
          transform: "scale(0.98)",
          boxShadow: "0px 1px 1px 1px #00000070",
        }}
      >
        about
      </Button>
    </Link>
  );
};

export default AboutButton;
