// src/components/ThemeToggle.js
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
};