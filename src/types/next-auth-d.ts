import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: {
      /** Oauth access token */
      accessToken?: String
      picture?: String
      tracks?: JSON
    } & DefaultSession['user'];
  }
  
}