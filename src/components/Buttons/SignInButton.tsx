import React from "react";
import { signIn } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";
import SpotifyIcon from "../Icons/SpotifyIcon";

const SignInButton: React.FC = () => {
  const boxShadowBlack = `0px 4px 4px 2px #00000070`;
  const boxShadowPurple = `0px 8px 15px 0px #dbdbdb60`;

  return (
    <Button
      w={"100%"}
      p={7}
      colorScheme={"purple"}
      border={'1px solid rgba(255, 255, 255, 0.20)'}
      borderRadius={12}
      bg={"#5c1ed780"}
      boxShadow={`${boxShadowBlack}, ${boxShadowPurple}`}
      rightIcon={<SpotifyIcon />}
      _hover={{ bg: "#1DB954" }}
      _active={{ bg: "#1DB954", transform: "scale(0.97)" }}
      onClick={() => signIn("spotify")}
    >
      Login w/ Spotify
    </Button>
  );
};

export default SignInButton;
