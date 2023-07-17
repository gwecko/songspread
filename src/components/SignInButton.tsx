import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Spotify from "next-auth/providers/spotify";
import { Box, Button } from "@chakra-ui/react";
import SpotifyIcon from "./SpotifyIcon";


const SignInButton: React.FC = () => {
  return (
    <Box>
      <Button
        size={'lg'}
        colorScheme={"purple"}
        rightIcon={<SpotifyIcon />}
        _hover={{ bg: "#1DB954" }}
        _active={{ bg: "#1DB954", transform: "scale(0.95)" }}
        onClick={() => signIn("spotify")}
      >
        Login
      </Button>
    </Box>
  );
};

export default SignInButton;
