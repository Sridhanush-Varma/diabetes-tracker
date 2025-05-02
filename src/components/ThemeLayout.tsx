import React, { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from './Layout';

type ThemeLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function ThemeLayout({ children, title = 'Diabetes Tracker' }: ThemeLayoutProps) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // First check localStorage
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // If no saved theme, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }

      setMounted(true);
    }
  }, []);

  // Effect to apply theme to document
  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Prevent flash of wrong theme while loading
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  // Create a context value to pass to the ThemeProvider
  const themeContextValue = {
    theme,
    toggleTheme
  };

  return (
    <ThemeProvider value={themeContextValue}>
      <Layout title={title} theme={theme}>
        {children}
      </Layout>
    </ThemeProvider>
  );
}
