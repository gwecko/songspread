import React from "react";
import { signOut } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";
import SpotifyIcon from "./SpotifyIcon";

const SignOutButton: React.FC = () => {
  return (
    <Box mx={'5%'} my={'auto'}>
      <Button
        colorScheme={"purple"}
        variant={'link'}
        rightIcon={<SpotifyIcon />}
        iconSpacing={'0px'}
        _active={{ transform: "scale(0.95)" }}
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </Box>
  );
};

export default SignOutButton;
