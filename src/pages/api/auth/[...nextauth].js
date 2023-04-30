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
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
      } 
      return token
    },
    

    async session(session, token) { 
      console.log(session)      
      return session
    },
  },
}



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


