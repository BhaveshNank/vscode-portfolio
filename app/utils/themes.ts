// Theme configurations for the portfolio
export const themes = {
  'dark-default': {
    name: 'Dark+ (default)',
    colors: {
      bg: '#1e1e1e',
      sidebar: '#252526',
      activityBar: '#333333',
      tabBorder: '#2d2d2d',
      tabInactive: '#2d2d2d',
      hover: '#2a2d2e',
      selection: '#094771',
      border: '#3e3e3e',
      text: '#cccccc',
      textMuted: '#858585',
      statusBar: '#007acc',
      activityBarBadge: '#007acc',
      syntaxBlue: '#4fc1ff',
      syntaxGreen: '#6a9955',
      syntaxOrange: '#ce9178',
      syntaxPurple: '#c586c0',
      syntaxYellow: '#dcdcaa'
    }
  },
  'monokai': {
    name: 'Monokai',
    colors: {
      bg: '#272822',
      sidebar: '#2e2e2e',
      activityBar: '#1e1e1e',
      tabBorder: '#1e1e1e',
      tabInactive: '#34352f',
      hover: '#3e3d32',
      selection: '#49483e',
      border: '#3e3d32',
      text: '#f8f8f2',
      textMuted: '#75715e',
      statusBar: '#414339',
      activityBarBadge: '#f92672',
      syntaxBlue: '#66d9ef',
      syntaxGreen: '#a6e22e',
      syntaxOrange: '#fd971f',
      syntaxPurple: '#ae81ff',
      syntaxYellow: '#e6db74'
    }
  },
  'github-dark': {
    name: 'GitHub Dark',
    colors: {
      bg: '#0d1117',
      sidebar: '#161b22',
      activityBar: '#21262d',
      tabBorder: '#161b22',
      tabInactive: '#1c2128',
      hover: '#30363d',
      selection: '#1f6feb',
      border: '#30363d',
      text: '#c9d1d9',
      textMuted: '#8b949e',
      statusBar: '#21262d',
      activityBarBadge: '#007acc',
      syntaxBlue: '#79c0ff',
      syntaxGreen: '#7ee787',
      syntaxOrange: '#ffa657',
      syntaxPurple: '#d2a8ff',
      syntaxYellow: '#f0d478'
    }
  },
  'github-dark-dimmed': {
    name: 'GitHub Dark Dimmed',
    colors: {
      bg: '#22272e',
      sidebar: '#2d333b',
      activityBar: '#373e47',
      tabBorder: '#2d333b',
      tabInactive: '#2d333b',
      hover: '#3a4149',
      selection: '#539bf5',
      border: '#444c56',
      text: '#adbac7',
      textMuted: '#768390',
      statusBar: '#373e47',
      activityBarBadge: '#007acc',
      syntaxBlue: '#6cb6ff',
      syntaxGreen: '#8ddb8c',
      syntaxOrange: '#f69d50',
      syntaxPurple: '#dcbdfb',
      syntaxYellow: '#daaa3f'
    }
  },
  'dracula': {
    name: 'Dracula',
    colors: {
      bg: '#282a36',
      sidebar: '#21222c',
      activityBar: '#191a21',
      tabBorder: '#191a21',
      tabInactive: '#21222c',
      hover: '#44475a',
      selection: '#44475a',
      border: '#44475a',
      text: '#f8f8f2',
      textMuted: '#6272a4',
      statusBar: '#191a21',
      activityBarBadge: '#bd93f9',
      syntaxBlue: '#8be9fd',
      syntaxGreen: '#50fa7b',
      syntaxOrange: '#ffb86c',
      syntaxPurple: '#bd93f9',
      syntaxYellow: '#f1fa8c'
    }
  },
  'night-owl': {
    name: 'Night Owl',
    colors: {
      bg: '#011627',
      sidebar: '#01111d',
      activityBar: '#000c18',
      tabBorder: '#000c18',
      tabInactive: '#01111d',
      hover: '#1d3b53',
      selection: '#1d3b53',
      border: '#1d3b53',
      text: '#d6deeb',
      textMuted: '#637777',
      statusBar: '#000c18',
      activityBarBadge: '#c792ea',
      syntaxBlue: '#82aaff',
      syntaxGreen: '#addb67',
      syntaxOrange: '#f78c6c',
      syntaxPurple: '#c792ea',
      syntaxYellow: '#ffcb8b'
    }
  },
  'one-dark-pro': {
    name: 'One Dark Pro',
    colors: {
      bg: '#282c34',
      sidebar: '#21252b',
      activityBar: '#1a1d23',
      tabBorder: '#181a1f',
      tabInactive: '#21252b',
      hover: '#2c313c',
      selection: '#2c313c',
      border: '#181a1f',
      text: '#abb2bf',
      textMuted: '#5c6370',
      statusBar: '#21252b',
      activityBarBadge: '#61afef',
      syntaxBlue: '#61afef',
      syntaxGreen: '#98c379',
      syntaxOrange: '#d19a66',
      syntaxPurple: '#c678dd',
      syntaxYellow: '#e5c07b'
    }
  }
};

export type ThemeId = keyof typeof themes;

export function applyTheme(themeId: ThemeId) {
  const theme = themes[themeId];
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case and add --color prefix for Tailwind v4
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--color-vscode-${cssVar}`, value);
  });

  // Save to localStorage
  localStorage.setItem('vscode-theme', themeId);
}

export function getStoredTheme(): ThemeId {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('vscode-theme');
    return (stored as ThemeId) || 'dark-default';
  }
  return 'dark-default';
}
