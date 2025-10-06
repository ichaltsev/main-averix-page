import React from 'react';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';
import { Monitor, Palette } from 'lucide-react';

const ThemeSwitcher = ({ variant = "outline", size = "sm", showLabel = false }) => {
  const { theme, toggleTheme, isThemeA, isThemeB } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="flex items-center gap-2"
      title={`Switch to ${isThemeA ? 'Deep Dark' : 'Monochrome'} Theme`}
    >
      <Palette className="h-4 w-4" />
      {showLabel && (
        <span className="text-sm">
          {isThemeA ? 'Monochrome' : 'Deep Dark'}
        </span>
      )}
    </Button>
  );
};

export default ThemeSwitcher;