import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // Get the base path from environment or default to '/Diabetes-Checker'
  const basePath = process.env.NODE_ENV === 'production'
    ? '/Diabetes-Checker'
    : '';

  return (
    <Html lang="en">
      <Head>
        {/* Add base tag for GitHub Pages */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <base href="/Diabetes-Checker/" />
            {/* GitHub Pages SPA redirect script */}
            <script src="/Diabetes-Checker/gh-pages-redirect.js" />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
