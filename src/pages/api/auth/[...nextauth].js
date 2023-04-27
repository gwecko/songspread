import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";


const clientId = process.env.SPOTIFY_CLIENT_ID
const clientSecret = process.env.SPOTIFY_SECRET

const authOptions = {
  secret: 'xkw6r+eGjopDbPYKRiEGFRdOdPDBpVIFpZqk3I8L9OU=',
  providers: [
    SpotifyProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        url: 'https://accounts.spotify.com/authorize?',
        params: { scope: 'user-top-read user-read-email', response_type: 'code' }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user, profile }) {
      console.log(account)
      if (account) {
        token.accessToken = account.access_token
        token.picture = user.image
        token.refreshToken = account.refresh_token
        return token
      // }
      // else if (Date.now() < account.expires_at * 1000) {
      //   // if token is not expired, return it
      //   return token
      } else {
        // If access token has expired, try to refresh it
        try {
          const res = await fetch("https://accounts.spotify.com/api/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: clientId,
              client_secret: clientSecret,
              grant_type: "refresh_token",
              refresh_token: account.refresh_token,
            }),
            method: "POST",
          })

          const tokens = await res.json()
          console.log('%%%%%tokens%%%%%')
          console.log('%%%%%tokens%%%%%')
          console.log('%%%%%tokens%%%%%')
          console.log(tokens)
          if (!res.ok) throw tokens

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    

    async session(session) { 
      // console.log(session)      
      return session
    },
  },
}



export default (req, res) => {
  NextAuth(req, res, authOptions);
}

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


