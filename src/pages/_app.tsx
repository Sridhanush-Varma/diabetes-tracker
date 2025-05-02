import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Handle GitHub Pages routing issues
  useEffect(() => {
    // Fix for GitHub Pages 404 issue with client-side routing
    const handleRouteChange = (url: string) => {
      // This is a workaround for GitHub Pages
      // It ensures that assets are loaded correctly
      if (process.env.NODE_ENV === 'production') {
        // Force reload if navigating to a new page
        // This is not ideal for UX but ensures assets load correctly
        if (url.includes('#')) {
          window.location.href = url;
        }
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="description" content="Track and manage your diabetes data with DiabetesTracker" />
        {/* Add public URL for GitHub Pages */}
        {process.env.NODE_ENV === 'production' && (
          <link rel="stylesheet" href="/Diabetes-Checker/_next/static/css/app.css" />
        )}
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
