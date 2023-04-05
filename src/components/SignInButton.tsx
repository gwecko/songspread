import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Spotify from "next-auth/providers/spotify";
import { Box, Button } from "@chakra-ui/react";
import SpotifyIcon from "./SpotifyIcon";

interface Props {
  message?: string;
  isLoading: boolean;
}

const SignInButton: React.FC<Props> = (Props) => {
  return (
    <Box p={8}>
      <Button
        colorScheme={"purple"}
        rightIcon={<SpotifyIcon />}
        isLoading={Props.isLoading}
        loadingText="one sec!"
        spinnerPlacement="end"
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
