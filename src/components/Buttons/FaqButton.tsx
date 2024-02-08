import { Button, Link } from "@chakra-ui/react";

const FaqButton = () => {
  
  const boxShadowBlack = `0px 4px 4px 1px #00000050`;
  
  return (
    <Link href={"/faq"} w={"100%"} mr={3}>
    <Button
      w={"100%"}
      fontSize={"smaller"}
      variant={"outline"}
      border={"1px solid rgba(255, 255, 255, 0.6)"}
      bg={"whiteAlpha.400"}
      boxShadow={boxShadowBlack}
      color={"#6B46C1"}
      _active={{
        transform: "scale(0.98)",
        boxShadow: "0px 1px 1px 1px #00000070",
      }}
    >
      what is this
    </Button>
</Link>
  );
};

export default FaqButton;
