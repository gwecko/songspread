import React from "react";
import { signIn } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";
import SpotifyIcon from "../Icons/SpotifyIcon";

const SignInButton: React.FC = () => {
  const boxShadowBlack = `0px 4px 4px 1px #00000070`;
  const boxShadow2 = `0px 8px 15px 0px rgba(132, 65, 220, 0.8)`;

  return (
    <Button
      w={"100%"}
      p={7}
      colorScheme={"purple"}
      border={"1px solid rgba(255, 255, 255, 0.20)"}
      borderRadius={12}
      bg={"#805AD5"}
      boxShadow={`${boxShadowBlack}`}
      rightIcon={<SpotifyIcon />}
      _hover={{ bg: "#1DB954" }}
      _active={{ bg: "#1DB954", transform: "scale(0.97)", boxShadow:'0px 1px 1px 1px #00000070'}}
      onClick={() => signIn("spotify")}
    >
      Login w/ Spotify
    </Button>
  );
};

export default SignInButton;
