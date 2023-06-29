import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error?: any
    token: {
      // name?: string
      // email: string
      // picture?: string
      access_token?: string
      refresh_token?: string
      expires_at?: any
    } 
    session: {
      // expires_at: string
    }
     & DefaultSession['user'];
  }
  
}