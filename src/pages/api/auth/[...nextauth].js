import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { cl } from "@/helpers";


const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_SECRET

const authOptions = {
  secret: "xkw6r+eGjopDbPYKRiEGFRdOdPDBpVIFpZqk3I8L9OU=",
  providers: [
    SpotifyProvider({
      clientId: client_id,
      clientSecret: client_secret,
      authorization: {
        url: "https://accounts.spotify.com/authorize?",
        params: {
          scope:
            "user-top-read user-read-email playlist-modify-public playlist-modify-private ugc-image-upload",
          response_type: "code",
        },
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, account, user, profile }) {
      // returning login
      if (account) {
        cl('if account:')
        cl(token)
        return {
          username: token.name,
          profile_pic: token.picture,
          access_token: account.access_token,
          expires_at: account.expires_at * 1000,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at) {
        cl('in the else if:')
        cl(token)
        return {
          ...token,
          username: token.username,
          profile_pic: token.profile_pic,
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          expires_at: token.expires_at,
        }
      } else {
        try {
          const res = await fetch("https://accounts.spotify.com/api/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: client_id,
              client_secret: client_secret,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
            method: "POST",
          })
          
          const tokens = await res.json()
          
          if (!res.ok) throw tokens
          cl('else try:')
          cl(tokens)
          
          return {
            ...token,
            username: tokens.name ?? tokens.username,
            profile_pic: tokens.picture,
            access_token: tokens.access_token,
            expires_at: tokens.expires_at * 1000,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error)
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    async session(session, token) {
      session.error = token?.error
      return session;
    },
  },
};



// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => { NextAuth(req, res, authOptions) }
