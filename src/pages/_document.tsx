import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Global so the iOS Safari notch / address bar tint matches the
            SongSpreadHeading shelf on every page (was only set on `/`). */}
        <meta name="theme-color" content="#ecdbed" />
        {/* Required for `env(safe-area-inset-top)` to be non-zero, which the
            shelf div in SongSpreadHeading depends on. */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
