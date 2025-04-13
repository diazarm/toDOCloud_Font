// src/context/ThemeContext.js
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Obtener tema guardado en localStorage (si existe)
  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'dark');

  // Efecto para aplicar el tema al HTML
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Función para alternar tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};