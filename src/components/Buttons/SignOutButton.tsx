import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import SpotifyIcon from "../Icons/SpotifyIcon";

const SignOutButton: React.FC = () => {
  return (
    <Button
      colorScheme={"whiteAlpha"}
      variant={"solid"}
      color={"purple.500"}
      bgColor={"whiteAlpha.400"}
      boxShadow={"sm"}
      rightIcon={<SpotifyIcon />}
      iconSpacing={"2px"}
      _active={{ transform: "scale(0.95)" }}
      onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
