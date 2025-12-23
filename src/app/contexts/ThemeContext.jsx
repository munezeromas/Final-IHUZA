import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ===========================================
 * THEME CONTEXT
 * ===========================================
 * This manages dark/light theme switching
 * Saves preference to localStorage so it persists between sessions
 */

// Create the context
const ThemeContext = createContext();

/**
 * CUSTOM HOOK to use Theme Context
 * Usage: const { theme, toggleTheme } = useTheme();
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

/**
 * THEME PROVIDER COMPONENT
 * Wraps the app and provides theme functionality
 */
export const ThemeProvider = ({ children }) => {
  // STATE: Current theme ('light' or 'dark')
  const [theme, setTheme] = useState('light');

  /**
   * EFFECT: Load saved theme from localStorage when app starts
   * Also apply the theme class to the document
   */
  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('ihuza_theme');
    if (savedTheme) {
      setTheme(savedTheme);
      // Add dark class to html element if dark theme
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []); // Run once on mount

  /**
   * TOGGLE THEME FUNCTION
   * Switches between light and dark theme
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('ihuza_theme', newTheme);
    
    // Add or remove 'dark' class from html element
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Value object to share
  const value = {
    theme,        // Current theme ('light' or 'dark')
    toggleTheme,  // Function to switch theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
