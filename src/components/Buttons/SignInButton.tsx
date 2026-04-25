import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import SpotifyIcon from "../Icons/SpotifyIcon";

const boxShadowBlack = `0px 4px 4px 1px #00000070`;

const SignInButton: React.FC = () => {
  return (
    <Button
      w="100%"
      p={7}
      colorPalette="purple"
      border="1px solid rgba(255, 255, 255, 0.20)"
      borderRadius={12}
      bg="#805AD5"
      boxShadow={boxShadowBlack}
      _hover={{ bg: "#1DB954" }}
      _active={{
        bg: "#1DB954",
        transform: "scale(0.97)",
        boxShadow: "0px 1px 1px 1px #00000070",
      }}
      onClick={() => signIn("spotify")}
    >
      Login w/ Spotify
      <SpotifyIcon />
    </Button>
  );
};

export default SignInButton;
