import React from "react";
import { signOut } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";
import SpotifyIcon from "./SpotifyIcon";

const SignOutButton: React.FC = () => {
  return (
    <Button
      colorScheme={"whiteAlpha"}
      variant={"solid"}
      color={"purple.500"}
      bgColor={"whiteAlpha.400"}
      boxShadow={"sm"}
      rightIcon={<SpotifyIcon />}
      iconSpacing={"0px"}
      _active={{ transform: "scale(0.95)" }}
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
};

export default SignOutButton;
