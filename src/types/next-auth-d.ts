import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: {
      name?: string
      email: string
      picture?: string
      accessToken?: string
    } & DefaultSession['user'];
  }
  
}