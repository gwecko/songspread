import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import SpotifyIcon from "../Icons/SpotifyIcon";

const SignOutButton: React.FC = () => {
  return (
    <Button
      variant="solid"
      color="purple.500"
      bg="whiteAlpha.400"
      boxShadow="sm"
      _active={{ transform: "scale(0.95)" }}
      onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
    >
      Sign out
      <SpotifyIcon />
    </Button>
  );
};

export default SignOutButton;
