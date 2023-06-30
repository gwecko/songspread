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
      if (account) {
        cl('in if(account)')
        // cl(JSON.stringify(account))
        return {
          access_token: account.access_token,
          expires_at: account.expires_at * 1000,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at) {
        cl('in else if')
        cl(`Date.now: ${Date.now()}`)
        cl(`expires_at: ${token.expires_at}`)
        return token;
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
          
          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: tokens.expires_at * 1000,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
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

/* >JWT params:
logging the account:
{
  provider: 'spotify',
  type: 'oauth',
  providerAccountId: '93ti8ccjhv6zfv1jp3uzhb8d4',
  access_token: 'BQDOa6uKeT8oqdCnwOjHQeasv8ZLgQXrHWWjrIRW1g1z7rx3GjyBSyC8sSfOOrt0TffBqXOuo8zJSjySc-1uxo_RWmjqh481mt1ScxO2ALX9Ib1fkUVGhUdECF5u96kmOMrA8V3mAhC_slVP1FWut0shWY1irA7uc-blwCmEnUH3K9Lghq00sCIXCL0EpaIu_4mT3Sy3FdtLD_nrxA',
  token_type: 'Bearer',
  expires_at: 1679791446,
  refresh_token: 'AQDtic1jT3UsVSlCt39dq2jvoqR2-qOpwnyPvrz-5EazPOeXM-wbTExPOtWawBn2hpfZmFPED9nX5cijsymDpIarjY6NMoZtSchrRouyIa9lYQoTY1PaQcWpf90oJPvA8CU',
  scope: 'user-read-email user-top-read'
}

logging the user:
{
  id: '93ti8ccjhv6zfv1jp3uzhb8d4',
  name: 'G-Weck',
  email: 'wecker.3@buckeyemail.osu.edu',
  image: 'https://i.scdn.co/image/ab6775700000ee85fbb74c9918a69b5341a65c4e'
}

logging the token:
{
  name: 'G-Weck',
  email: 'wecker.3@buckeyemail.osu.edu',
  picture: 'https://i.scdn.co/image/ab6775700000ee85fbb74c9918a69b5341a65c4e',
  sub: '93ti8ccjhv6zfv1jp3uzhb8d4',
  iat: 1679787989,
  exp: 1682379989,
  jti: 'd96e7e4b-14f8-428c-b6c0-3bd6b9479c32'
} */

/* session params: 

session:
{
  session: {
    user: {
      name: 'G-Weck',
      email: 'wecker.3@buckeyemail.osu.edu',
      image: 'https://i.scdn.co/image/ab6775700000ee85fbb74c9918a69b5341a65c4e'
    },
    expires: '2023-04-25T17:05:25.625Z'
  },
  token: {
    name: 'G-Weck',
    email: 'wecker.3@buckeyemail.osu.edu',
    picture: 'https://i.scdn.co/image/ab6775700000ee85fbb74c9918a69b5341a65c4e',
    sub: '93ti8ccjhv6zfv1jp3uzhb8d4',
    iat: 1679850324,
    exp: 1682442324,
    jti: '6c095e35-37f5-4f44-ab52-d68e63c50a6d'
  }
}

token:
undefined

user:
undefined */


