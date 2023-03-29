import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Spotify from "next-auth/providers/spotify";

interface Props {
  message?: string;
}

const SignInButton: React.FC<Props> = () => {
  return (
    <div>
      <button onClick={() => signIn('spotify')}>Login to Spotify</button>
    </div>
  );
};

export default SignInButton;
