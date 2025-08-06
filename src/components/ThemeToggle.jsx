import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 transition-all duration-300 ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        
        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;