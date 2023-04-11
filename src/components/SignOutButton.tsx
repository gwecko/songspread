import React from "react";
import { signOut } from "next-auth/react";
import { Box, Button } from "@chakra-ui/react";

interface Props {}

const SignOutButton: React.FC<Props> = () => {
  return (
    <Box p={4}>
      <Button
        colorScheme={"purple"}
        variant={'link'}
        _active={{ transform: "scale(0.95)" }}
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </Box>
  );
};

export default SignOutButton;
