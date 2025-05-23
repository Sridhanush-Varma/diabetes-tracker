import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useTheme = () => {
  return useContext(ThemeContext);
};

type ThemeProviderProps = {
  children: React.ReactNode;
  value?: ThemeContextType;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, value }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Effect to initialize theme from localStorage or system preference
  useEffect(() => {
    // If value is provided, skip the initialization
    if (value) return;

    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // First check localStorage
      const savedTheme = localStorage.getItem('theme') as Theme | null;

      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // If no saved theme, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }

      setMounted(true);
    }
  }, [value]);

  // Effect to apply theme to document
  useEffect(() => {
    if (value) return; // Skip if value is provided
    if (!mounted) return;

    // Apply theme to document
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted, value]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Use provided value or create a new one
  const contextValue = value || { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={contextValue}>
      {mounted || value ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </ThemeContext.Provider>
  );
};
