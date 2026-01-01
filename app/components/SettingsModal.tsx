'use client';

import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeId } from '../utils/themes';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

const themes = [
  {
    id: 'dark-default' as ThemeId,
    name: 'Dark+ (default)',
    description: 'VS Code default dark theme',
    colors: {
      bg: '#1e1e1e',
      sidebar: '#252526',
      activityBar: '#333333',
      preview: 'linear-gradient(135deg, #1e1e1e 0%, #252526 50%, #333333 100%)'
    }
  },
  {
    id: 'monokai' as ThemeId,
    name: 'Monokai',
    description: 'Classic Monokai theme',
    colors: {
      bg: '#272822',
      sidebar: '#2e2e2e',
      activityBar: '#1e1e1e',
      preview: 'linear-gradient(135deg, #272822 0%, #2e2e2e 50%, #1e1e1e 100%)'
    }
  },
  {
    id: 'github-dark' as ThemeId,
    name: 'GitHub Dark',
    description: 'Official GitHub dark theme',
    colors: {
      bg: '#0d1117',
      sidebar: '#161b22',
      activityBar: '#21262d',
      preview: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)'
    }
  },
  {
    id: 'github-dark-dimmed' as ThemeId,
    name: 'GitHub Dark Dimmed',
    description: 'Softer GitHub dark variant',
    colors: {
      bg: '#22272e',
      sidebar: '#2d333b',
      activityBar: '#373e47',
      preview: 'linear-gradient(135deg, #22272e 0%, #2d333b 50%, #373e47 100%)'
    }
  },
  {
    id: 'dracula' as ThemeId,
    name: 'Dracula',
    description: 'Popular Dracula theme',
    colors: {
      bg: '#282a36',
      sidebar: '#21222c',
      activityBar: '#191a21',
      preview: 'linear-gradient(135deg, #282a36 0%, #21222c 50%, #191a21 100%)'
    }
  },
  {
    id: 'night-owl' as ThemeId,
    name: 'Night Owl',
    description: 'Night Owl theme by Sarah Drasner',
    colors: {
      bg: '#011627',
      sidebar: '#01111d',
      activityBar: '#000c18',
      preview: 'linear-gradient(135deg, #011627 0%, #01111d 50%, #000c18 100%)'
    }
  },
  {
    id: 'one-dark-pro' as ThemeId,
    name: 'One Dark Pro',
    description: 'Atom One Dark inspired',
    colors: {
      bg: '#282c34',
      sidebar: '#21252b',
      activityBar: '#1a1d23',
      preview: 'linear-gradient(135deg, #282c34 0%, #21252b 50%, #1a1d23 100%)'
    }
  }
];

export default function SettingsModal({ isOpen, onClose, currentTheme, onThemeChange }: SettingsModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index when current theme changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const index = themes.findIndex(t => t.id === currentTheme);
      setSelectedIndex(index >= 0 ? index : 0);
    }
  }, [isOpen, currentTheme]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex = (selectedIndex + 1) % themes.length;
        setSelectedIndex(newIndex);
        onThemeChange(themes[newIndex].id);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = (selectedIndex - 1 + themes.length) % themes.length;
        setSelectedIndex(newIndex);
        onThemeChange(themes[newIndex].id);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, onThemeChange, onClose]);

  const handleThemeClick = (themeId: ThemeId, index: number) => {
    setSelectedIndex(index);
    onThemeChange(themeId);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-vscode-sidebar border border-vscode-border rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-vscode-border">
            <div>
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <p className="text-sm text-vscode-textMuted mt-0.5">
                Use arrow keys ↑↓ to navigate themes
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-vscode-hover rounded transition-colors text-vscode-textMuted hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-1">Color Theme</h3>
              <p className="text-xs text-vscode-textMuted mb-4">
                Click or use keyboard to select a theme (changes apply instantly)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {themes.map((theme, index) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeClick(theme.id, index)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                    selectedIndex === index
                      ? 'border-vscode-activityBarBadge bg-vscode-activityBarBadge/10 ring-2 ring-vscode-activityBarBadge/30'
                      : 'border-vscode-border hover:border-vscode-textMuted bg-vscode-bg'
                  }`}
                >
                  {/* Theme Preview */}
                  <div
                    className="w-full h-16 rounded mb-3 shadow-inner"
                    style={{ background: theme.colors.preview }}
                  />

                  {/* Theme Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">{theme.name}</h4>
                      <p className="text-xs text-vscode-textMuted">{theme.description}</p>
                    </div>
                    {selectedIndex === index && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-5 h-5 rounded-full bg-vscode-activityBarBadge flex items-center justify-center">
                          <Check size={12} className="text-black" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}