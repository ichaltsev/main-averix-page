import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-a');

  // Load theme from localStorage or detect system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('averix-theme');
    if (savedTheme && (savedTheme === 'theme-a' || savedTheme === 'theme-b')) {
      setTheme(savedTheme);
    } else {
      // Default to theme-a regardless of system preference (as per current design)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'theme-b' : 'theme-a');
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add('dark'); // Keep dark class for components
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'theme-a' ? 'theme-b' : 'theme-a';
    setTheme(newTheme);
    localStorage.setItem('averix-theme', newTheme);
  };

  const setSpecificTheme = (themeName) => {
    if (themeName === 'theme-a' || themeName === 'theme-b') {
      setTheme(themeName);
      localStorage.setItem('averix-theme', themeName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: setSpecificTheme,
        isThemeA: theme === 'theme-a',
        isThemeB: theme === 'theme-b'
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};