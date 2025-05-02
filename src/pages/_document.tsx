import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add custom script for GitHub Pages SPA support */}
        {process.env.NODE_ENV === 'production' && (
          <script src="./gh-pages-redirect.js" />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
