import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_SECRET;

const SPOTIFY_SCOPES = [
  "user-top-read",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "ugc-image-upload",
].join(" ");

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: client_id,
      clientSecret: client_secret,
      authorization: {
        // No trailing `?` — newer openid-client appends its own query
        // separator and a leftover `?` produces a malformed authorize URL.
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: SPOTIFY_SCOPES,
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Initial sign-in: copy Spotify tokens onto the JWT.
      if (account) {
        return {
          username: token.name,
          profile_pic: token.picture,
          access_token: account.access_token,
          // Spotify returns `expires_at` in seconds; store as ms.
          expires_at: account.expires_at * 1000,
          refresh_token: account.refresh_token,
        };
      }

      // Token still valid: pass it through.
      if (Date.now() < token.expires_at) {
        return token;
      }

      // Expired: refresh.
      try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id,
            client_secret,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
        });
        const refreshed = await res.json();
        if (!res.ok) throw refreshed;

        return {
          ...token,
          access_token: refreshed.access_token,
          // Spotify's refresh response uses `expires_in` (seconds-from-now),
          // not `expires_at`. Compute the absolute ms timestamp ourselves.
          expires_at: Date.now() + refreshed.expires_in * 1000,
          // A new refresh_token is sometimes (not always) returned.
          refresh_token: refreshed.refresh_token ?? token.refresh_token,
        };
      } catch (error) {
        console.error("Error refreshing access token", error);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },

    // NextAuth v4 destructures: ({ session, token, user, ... }). The previous
    // positional `(session, token)` form was a v3 holdover — under v4.24 it
    // returns a malformed wrapper object that breaks /api/auth/session
    // serialization, surfacing as CLIENT_FETCH_ERROR + 500.
    async session({ session, token }) {
      session.error = token?.error;
      session.token = {
        access_token: token?.access_token,
        refresh_token: token?.refresh_token,
        expires_at: token?.expires_at,
        username: token?.username,
        profile_pic: token?.profile_pic,
      };
      return session;
    },
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, authOptions);
