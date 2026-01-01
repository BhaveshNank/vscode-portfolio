'use client';

import { useState, useRef, useEffect } from 'react';
import { Files, Search, GitBranch, Package, Settings, X, Terminal as TerminalIcon, ChevronRight, ChevronDown, Star, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomeContent from './components/HomeContent';
import AboutContent from './components/AboutContent';
import ProjectsContent from './components/ProjectsContent';
import ContactContent from './components/ContactContent';
import Terminal from './components/Terminal';
import PDFViewer from './components/PDFViewer';
import GitHubProfile from './components/GitHubProfile';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import SettingsModal from './components/SettingsModal';
import { applyTheme, getStoredTheme, ThemeId } from './utils/themes';

type SidebarView = 'explorer' | 'search' | 'extensions';

// Helper function to render extension icon
const renderExtensionIcon = (ext: any) => {
  if (ext.iconType === 'text') {
    return (
      <div className="w-12 h-12 rounded flex items-center justify-center text-base font-bold text-white" style={{ backgroundColor: ext.bgColor }}>
        {ext.icon}
      </div>
    );
  }

  // SVG icons for each technology
  const icons: Record<string, React.JSX.Element> = {
    python: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
          <path d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1h-9.441s-4.545-.51-4.545 6.645 3.966 6.912 3.966 6.912h2.361v-3.323s-.13-3.966 3.906-3.966h9.287s3.776.061 3.776-3.645v-8.614s.569-3.269-6.411-3.269zm-3.721 1.936a1.24 1.24 0 110 2.48 1.24 1.24 0 010-2.48z" fill="#387EB8" />
          <path d="M16.115 29.9c7.1 0 6.651-3.07 6.651-3.07v-3.19h-6.752v-1h9.441s4.545.51 4.545-6.645-3.966-6.912-3.966-6.912h-2.361v3.323s.13 3.966-3.906 3.966h-9.287s-3.776-.061-3.776 3.645v8.614s-.569 3.269 6.411 3.269zm3.721-1.936a1.24 1.24 0 110-2.48 1.24 1.24 0 010 2.48z" fill="#FFD43B" />
        </svg>
      </div>
    ),
    java: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M11.622 24.74s-1.23.748.855.962c2.51.32 3.847.267 6.625-.267a10.02 10.02 0 001.763.855c-6.25 2.672-14.16-.16-9.244-1.55zm-.8-3.473s-1.336 1.015.748 1.23c2.725.267 4.862.32 8.55-.427a3.26 3.26 0 001.282.801c-7.534 2.244-15.976.214-10.58-1.604zm14.373 6.036s.908.748-1.015 1.336c-3.58 1.07-15.014 1.39-18.22 0-1.122-.48 1.015-1.175 1.7-1.282.695-.16 1.07-.16 1.07-.16-1.23-.855-8.175 1.763-3.526 2.51 12.77 2.084 23.296-.908 19.983-2.404zM12.2 17.633s-5.824 1.39-2.084 1.87c1.603.214 4.755.16 7.694-.053 2.404-.214 4.81-.64 4.81-.64s-.855.374-1.443.748c-5.93 1.55-17.312.855-14.052-.748 2.778-1.336 5.076-1.175 5.076-1.175zm10.42 5.824c5.984-3.1 3.206-6.09 1.282-5.717-.48.107-.695.214-.695.214s.16-.32.534-.427c3.794-1.336 6.786 4.007-1.23 6.09 0 0 .053-.053.107-.16zm-9.83 8.442c5.77.374 14.587-.214 14.8-2.94 0 0-.427 1.07-4.755 1.87-4.916.908-11.007.8-14.587.214 0 0 .748.64 4.542.855z" />
        </svg>
      </div>
    ),
    react: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <circle cx="16" cy="16" r="2.5" fill="white" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="white" strokeWidth="1.5" fill="none" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" transform="rotate(60 16 16)" stroke="white" strokeWidth="1.5" fill="none" />
          <ellipse cx="16" cy="16" rx="12" ry="4.5" transform="rotate(120 16 16)" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    ),
    nextjs: (
      <div className="w-12 h-12 rounded bg-black flex items-center justify-center p-2.5">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M16 2l14 24H2L16 2zm0 4.18L6.91 22h18.18L16 6.18z" />
          <path d="M20 18l-8-14v14" fill="white" />
        </svg>
      </div>
    ),
    nodejs: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M16 2l-12 7v14l12 7 12-7V9L16 2zm0 2.3L25.7 9v10L16 23.7 6.3 19V9L16 4.3z" />
          <path d="M16 10c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
        </svg>
      </div>
    ),
    flask: (
      <div className="w-12 h-12 rounded bg-gray-700 flex items-center justify-center text-2xl">
        🧪
      </div>
    ),
    postgresql: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M28.5 14.5c-1.5-1-3.5-1.5-5.5-1.5-2 0-4 .5-5.5 1.5-1.5-1-3.5-1.5-5.5-1.5s-4 .5-5.5 1.5c-1.5 1-2.5 2.5-2.5 4v8c0 1.5 1 3 2.5 4 1.5 1 3.5 1.5 5.5 1.5s4-.5 5.5-1.5c1.5 1 3.5 1.5 5.5 1.5s4-.5 5.5-1.5c1.5-1 2.5-2.5 2.5-4v-8c0-1.5-1-3-2.5-4z" />
        </svg>
      </div>
    ),
    mongodb: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M16 2L3 9v14l13 7 13-7V9L16 2zm0 2.3L26.7 9v10L16 23.7 5.3 19V9L16 4.3zm-1 4.7v14l2-2V9l-2-2z" />
        </svg>
      </div>
    ),
    aws: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-orange-500 to-yellow-600 flex items-center justify-center text-xl font-bold text-white">
        AWS
      </div>
    ),
    git: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M29.5 14.5L17.5 2.5c-.6-.6-1.5-.6-2.1 0L2.5 14.5c-.6.6-.6 1.5 0 2.1l12.1 12.1c.6.6 1.5.6 2.1 0l12.1-12.1c.3-.3.5-.7.5-1.1s-.2-.8-.5-1z" />
          <path d="M12 10l4 4-4 4-2-2 2-2-2-2 2-2z" fill="#F34F29" />
        </svg>
      </div>
    ),
    docker: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M27 13h-3v-3h-3v3h-3v-3h-3v3h-3v-3H9v3H6v3h3v3h3v-3h3v3h3v-3h3v3h3v-3h3v-3z" />
          <ellipse cx="16" cy="23" rx="10" ry="3" />
        </svg>
      </div>
    ),
    tailwind: (
      <div className="w-12 h-12 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center p-2">
        <svg viewBox="0 0 32 32" fill="white" className="w-full h-full">
          <path d="M9 13.5c1.5-6 5-7.5 10.5-4.5 3.5 2 6 1.5 7.5-1.5-1.5 6-5 7.5-10.5 4.5-3.5-2-6-1.5-7.5 1.5zm-7.5 7.5c1.5-6 5-7.5 10.5-4.5 3.5 2 6 1.5 7.5-1.5-1.5 6-5 7.5-10.5 4.5-3.5-2-6-1.5-7.5 1.5z" />
        </svg>
      </div>
    )
  };

  return icons[ext.icon] || null;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('home.jsx');
  const [tabs, setTabs] = useState([{ id: 'home.jsx', name: 'home.jsx' }]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('explorer');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(256);
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [searchQuery, setSearchQuery] = useState('');
  const [foldersExpanded, setFoldersExpanded] = useState<Record<string, boolean>>({
    'portfolio': true,
    'src': true,
    'components': true
  });
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark-default');
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(0);

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    setCurrentTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const handleThemeChange = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
  };

  useSwipeGesture({
    onSwipeLeft: () => {
      // Close sidebar on swipe left
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    },
    onSwipeRight: () => {
      // Open sidebar on swipe right
      if (!sidebarOpen) {
        setSidebarOpen(true);
      }
    }
  }, true);

  // Sidebar resize effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const delta = e.clientX - resizeStartX.current;
        const newWidth = Math.max(200, Math.min(600, resizeStartWidth.current + delta));
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    if (isResizingSidebar) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingSidebar]);

  const handleSidebarResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingSidebar(true);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = sidebarWidth;
  };

  const toggleFolder = (folder: string) => {
    setFoldersExpanded(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const openFile = (fileId: string, fileName: string) => {
    if (!tabs.find(t => t.id === fileId)) {
      setTabs([...tabs, { id: fileId, name: fileName }]);
    }
    setActiveTab(fileId);
  };

  // Update document title based on active tab
  useEffect(() => {
    const tabTitles: Record<string, string> = {
      'home.jsx': 'Home | Bhavesh Nankani',
      'about.html': 'About | Bhavesh Nankani',
      'projects.json': 'Projects | Bhavesh Nankani',
      'contact.css': 'Contact | Bhavesh Nankani',
      'resume.pdf': 'Resume | Bhavesh Nankani',
      'github': 'GitHub | Bhavesh Nankani'
    };
    document.title = tabTitles[activeTab] || 'Bhavesh Nankani | Portfolio';
  }, [activeTab]);

  const allFiles = [
    { id: 'home.jsx', name: 'home.jsx', icon: 'react', color: '#61dafb', path: 'src/home.jsx' },
    { id: 'about.html', name: 'about.html', icon: 'html', color: '#e34c26', path: 'src/components/about.html' },
    { id: 'projects.json', name: 'projects.json', icon: 'json', color: '#ffd700', path: 'src/components/projects.json' },
    { id: 'contact.css', name: 'contact.css', icon: 'css', color: '#264de4', path: 'src/components/contact.css' }
  ];

  const filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const extensions = [
    { name: 'Python', publisher: 'ms-python', description: 'IntelliSense, linting, debugging support', downloads: '84.2M', rating: 4.5, installed: true, iconType: 'svg', icon: 'python' },
    { name: 'Java Extension Pack', publisher: 'vscjava', description: 'Popular Java extensions', downloads: '15.8M', rating: 4.3, installed: true, iconType: 'svg', icon: 'java' },
    { name: 'TypeScript', publisher: 'microsoft', description: 'TypeScript language support', downloads: '45.1M', rating: 4.7, installed: true, iconType: 'text', icon: 'TS', bgColor: '#3178c6' },
    { name: 'JavaScript (ES6)', publisher: 'xabikos', description: 'Code snippets for JavaScript', downloads: '12.5M', rating: 4.4, installed: true, iconType: 'text', icon: 'JS', bgColor: '#f7df1e' },
    { name: 'ES7+ React/Redux', publisher: 'dsznajder', description: 'React/Redux snippets', downloads: '9.8M', rating: 4.6, installed: true, iconType: 'svg', icon: 'react' },
    { name: 'Next.js', publisher: 'pulkitgangwar', description: 'Next.js snippets and utilities', downloads: '234K', rating: 4.2, installed: true, iconType: 'svg', icon: 'nextjs' },
    { name: 'Node.js', publisher: 'ms-vscode', description: 'Node.js development tools', downloads: '18.7M', rating: 4.5, installed: true, iconType: 'svg', icon: 'nodejs' },
    { name: 'Flask Snippets', publisher: 'cstrap', description: 'Flask code snippets', downloads: '156K', rating: 4.1, installed: true, iconType: 'svg', icon: 'flask' },
    { name: 'PostgreSQL', publisher: 'ckolkman', description: 'PostgreSQL syntax support', downloads: '2.1M', rating: 4.3, installed: true, iconType: 'svg', icon: 'postgresql' },
    { name: 'MongoDB', publisher: 'mongodb', description: 'MongoDB for VS Code', downloads: '3.4M', rating: 4.4, installed: true, iconType: 'svg', icon: 'mongodb' },
    { name: 'AWS Toolkit', publisher: 'amazonwebservices', description: 'AWS development toolkit', downloads: '5.2M', rating: 4.2, installed: true, iconType: 'svg', icon: 'aws' },
    { name: 'GitLens', publisher: 'eamodio', description: 'Git supercharged', downloads: '28.5M', rating: 4.8, installed: true, iconType: 'svg', icon: 'git' },
    { name: 'Docker', publisher: 'ms-azuretools', description: 'Docker container management', downloads: '19.3M', rating: 4.6, installed: false, iconType: 'svg', icon: 'docker' },
    { name: 'Tailwind CSS IntelliSense', publisher: 'bradlc', description: 'Intelligent Tailwind CSS tooling', downloads: '11.2M', rating: 4.7, installed: true, iconType: 'svg', icon: 'tailwind' }
  ];

  const handleSidebarView = (view: SidebarView) => {
    if (sidebarView === view && sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setSidebarView(view);
      setSidebarOpen(true);
    }
  };

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden" style={{ backgroundColor: 'var(--color-vscode-bg)', color: 'var(--color-vscode-text)' }}>
      <div className="flex-1 flex overflow-hidden">

        {/* Activity Bar */}
        <div className="w-12 flex flex-col items-center py-4 border-r shrink-0" style={{ backgroundColor: 'var(--color-vscode-activity-bar)', borderColor: 'var(--color-vscode-border)' }}>
          <button
            onClick={() => handleSidebarView('explorer')}
            className={`p-2.5 rounded transition-colors mb-6 ${sidebarView === 'explorer' && sidebarOpen ? 'text-white bg-white/10' : 'text-vscode-textMuted hover:text-white hover:bg-white/10'}`}
          >
            <Files size={22} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => handleSidebarView('search')}
            className={`p-2.5 rounded transition-colors mb-6 ${sidebarView === 'search' && sidebarOpen ? 'text-white bg-white/10' : 'text-vscode-textMuted hover:text-white hover:bg-white/10'}`}
          >
            <Search size={22} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className={`p-2.5 rounded transition-colors mb-6 ${terminalOpen ? 'text-white bg-white/10' : 'text-vscode-textMuted hover:text-white hover:bg-white/10'}`}
            title="Toggle Terminal"
          >
            <TerminalIcon size={22} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => handleSidebarView('extensions')}
            className={`p-2.5 rounded transition-colors mb-6 ${sidebarView === 'extensions' && sidebarOpen ? 'text-white bg-white/10' : 'text-vscode-textMuted hover:text-white hover:bg-white/10'}`}
          >
            <Package size={22} strokeWidth={1.5} />
          </button>

          {/* GitHub Button */}
          <button
            onClick={() => openFile('github', 'github.profile')}
            className={`p-2.5 rounded transition-colors mb-6 ${activeTab === 'github' ? 'text-white bg-white/10' : 'text-vscode-textMuted hover:text-white hover:bg-white/10'}`}
            title="GitHub Profile"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </button>

          <button 
            onClick={() => setSettingsOpen(true)}
            className="p-2.5 text-vscode-textMuted hover:text-white hover:bg-white/10 rounded transition-colors mt-auto"
          >
            <Settings size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="border-r overflow-hidden shrink-0"
              style={{ backgroundColor: 'var(--color-vscode-sidebar)', borderColor: 'var(--color-vscode-border)' }}
            >
              {/* Explorer View */}
              {sidebarView === 'explorer' && (
                <div>
                  <div className="px-4 py-2.5 text-xs font-semibold text-vscode-textMuted uppercase tracking-wider">
                    Explorer
                  </div>

                  <div className="p-2">
                    <div className="mb-1">
                      <button
                        onClick={() => toggleFolder('portfolio')}
                        className="flex items-center gap-1 px-2 py-1 hover:bg-vscode-hover rounded cursor-pointer w-full text-left"
                      >
                        {foldersExpanded.portfolio ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        <span className="text-sm font-semibold text-white">PORTFOLIO-V1</span>
                      </button>
                    </div>

                    {foldersExpanded.portfolio && (
                      <div className="ml-2">
                        <button
                          onClick={() => toggleFolder('src')}
                          className="flex items-center gap-1 px-2 py-1 hover:bg-vscode-hover rounded cursor-pointer mb-1 w-full text-left"
                        >
                          {foldersExpanded.src ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          <span className="text-sm font-semibold text-white">src</span>
                        </button>

                        {foldersExpanded.src && (
                          <div className="ml-2 space-y-0.5">
                            <button
                              onClick={() => openFile('home.jsx', 'home.jsx')}
                              className={`flex items-center gap-2 px-2 py-1 hover:bg-vscode-hover rounded w-full text-left transition-colors ${activeTab === 'home.jsx' ? 'bg-vscode-selection' : ''}`}
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#61dafb">
                                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                              </svg>
                              <span className="text-sm text-vscode-text">home.jsx</span>
                            </button>

                            <button
                              onClick={() => toggleFolder('components')}
                              className="flex items-center gap-1 px-2 py-1 hover:bg-vscode-hover rounded cursor-pointer w-full text-left"
                            >
                              {foldersExpanded.components ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                              <span className="text-sm font-semibold text-white">components</span>
                            </button>

                            {foldersExpanded.components && (
                              <div className="ml-2 space-y-0.5">
                                <button
                                  onClick={() => openFile('about.html', 'about.html')}
                                  className={`flex items-center gap-2 px-2 py-1 hover:bg-vscode-hover rounded w-full text-left ${activeTab === 'about.html' ? 'bg-vscode-selection' : ''}`}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#e34c26">
                                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                                  </svg>
                                  <span className="text-sm text-vscode-text">about.html</span>
                                </button>

                                <button
                                  onClick={() => openFile('projects.json', 'projects.json')}
                                  className={`flex items-center gap-2 px-2 py-1 hover:bg-vscode-hover rounded w-full text-left ${activeTab === 'projects.json' ? 'bg-vscode-selection' : ''}`}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#ffd700">
                                    <path d="M5 3l-.65 13.66h14.3L18 3H5zm7.5 10.98c-.72.12-1.43.25-2.15.38-.38-1.43-.65-2.86-.82-4.3h3.57c-.17 1.44-.38 2.87-.6 4.3zm-3.82 1.85c.06.2.11.4.16.6.16.55.33 1.11.5 1.66H6.7c.23-1.33.47-2.66.7-3.99l1.63.38zm7.52-7.5H6.8c-.13-1.01-.25-2-.36-3h10.13c-.11 1-.23 2-.36 3z" />
                                  </svg>
                                  <span className="text-sm text-vscode-text">projects.json</span>
                                </button>

                                <button
                                  onClick={() => openFile('contact.css', 'contact.css')}
                                  className={`flex items-center gap-2 px-2 py-1 hover:bg-vscode-hover rounded w-full text-left ${activeTab === 'contact.css' ? 'bg-vscode-selection' : ''}`}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#264de4">
                                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
                                  </svg>
                                  <span className="text-sm text-vscode-text">contact.css</span>
                                </button>

                                <button
                                  onClick={() => openFile('resume.pdf', 'Bhavesh_Nankani_resume.pdf')}
                                  className={`flex items-center gap-2 px-2 py-1 hover:bg-vscode-hover rounded w-full text-left ${activeTab === 'resume.pdf' ? 'bg-vscode-selection' : ''}`}
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#e74c3c">
                                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                                  </svg>
                                  <span className="text-sm text-vscode-text">resume.pdf</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Search View */}
              {sidebarView === 'search' && (
                <div>
                  <div className="px-4 py-2.5 text-xs font-semibold text-vscode-textMuted uppercase tracking-wider">
                    Search
                  </div>
                  <div className="p-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search files..."
                      className="w-full px-3 py-2 bg-vscode-bg border border-vscode-border rounded text-sm text-vscode-text outline-none focus:border-vscode-activityBarBadge"
                    />
                    {searchQuery && (
                      <div className="mt-4 space-y-1">
                        {filteredFiles.length > 0 ? (
                          filteredFiles.map(file => (
                            <button
                              key={file.id}
                              onClick={() => {
                                openFile(file.id, file.name);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-2 px-2 py-1.5 hover:bg-vscode-hover rounded w-full text-left"
                            >
                              {file.icon === 'react' ? (
                                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#61dafb">
                                  <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                                </svg>
                              ) : file.icon === 'html' ? (
                                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#e34c26">
                                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                                </svg>
                              ) : file.icon === 'json' ? (
                                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#ffd700">
                                  <path d="M5 3l-.65 13.66h14.3L18 3H5zm7.5 10.98c-.72.12-1.43.25-2.15.38-.38-1.43-.65-2.86-.82-4.3h3.57c-.17 1.44-.38 2.87-.6 4.3zm-3.82 1.85c.06.2.11.4.16.6.16.55.33 1.11.5 1.66H6.7c.23-1.33.47-2.66.7-3.99l1.63.38zm7.52-7.5H6.8c-.13-1.01-.25-2-.36-3h10.13c-.11 1-.23 2-.36 3z" />
                                </svg>
                              ) : file.icon === 'css' ? (
                                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#264de4">
                                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
                                </svg>
                              ) : null}
                              <div className="flex-1">
                                <div className="text-sm text-vscode-text">{file.name}</div>
                                <div className="text-xs text-vscode-textMuted">{file.path}</div>
                              </div>
                            </button>
                          ))
                        ) : (
                          <p className="text-sm text-vscode-textMuted px-2">No files found</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Extensions View */}
              {sidebarView === 'extensions' && (
                <div className="h-full flex flex-col">
                  <div className="px-3 py-2.5 text-[11px] font-semibold text-vscode-textMuted uppercase tracking-wide border-b border-vscode-border">
                    Installed
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {extensions.map((ext, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 hover:bg-vscode-hover cursor-pointer border-b border-vscode-border/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {/* Extension Icon */}
                          {renderExtensionIcon(ext)}

                          {/* Extension Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-[13px] font-medium text-white truncate">{ext.name}</h3>
                              {ext.installed && (
                                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                                  <path d="M14.431 3.323l-8.47 10-.79-.036-3.35-4.77.818-.574 2.978 4.24 8.051-9.506.764.646z" fill="#89D185" />
                                </svg>
                              )}
                            </div>
                            <p className="text-[11px] text-vscode-textMuted mb-2 line-clamp-2 leading-tight">
                              {ext.description}
                            </p>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="flex items-center gap-1 text-[10px] text-vscode-textMuted">
                                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                                  <path d="M8 1l2.5 5 5.5.8-4 3.9.9 5.3-4.9-2.6-4.9 2.6.9-5.3-4-3.9 5.5-.8z" />
                                </svg>
                                {ext.rating}
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-vscode-textMuted">
                                <Download size={10} />
                                {ext.downloads}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-vscode-textMuted truncate">{ext.publisher}</span>
                              {ext.installed ? (
                                <button className="text-[11px] px-3 py-1 bg-vscode-hover text-vscode-textMuted rounded hover:bg-vscode-border transition-colors">
                                  Installed
                                </button>
                              ) : (
                                <button className="text-[11px] px-3 py-1 bg-vscode-activityBarBadge text-white font-medium rounded hover:bg-vscode-activityBarBadge/80 transition-colors">
                                  Install
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-vscode-bg min-w-0">
          {/* Tab Bar */}
          <div className="flex border-b overflow-x-auto shrink-0" style={{ backgroundColor: 'var(--color-vscode-tab-border)', borderColor: 'var(--color-vscode-border)' }}>
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative flex items-center gap-2 px-3 py-2.5 min-w-[120px] cursor-pointer
                  border-r transition-colors
                  ${activeTab === tab.id
                    ? 'text-white'
                    : 'text-vscode-textMuted'
                  }
                `}
                style={{
                  backgroundColor: activeTab === tab.id 
                    ? 'var(--color-vscode-bg)' 
                    : 'var(--color-vscode-tab-inactive)',
                  borderColor: 'var(--color-vscode-border)'
                }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute top-0 left-0 right-0 h-[2px] bg-vscode-activityBarBadge"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {tab.name.endsWith('.jsx') ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#61dafb">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                ) : tab.name === 'github.profile' ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ) : tab.name.endsWith('.html') ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#e34c26">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
                  </svg>
                ) : tab.name.endsWith('.json') ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#ffd700">
                    <path d="M5 3l-.65 13.66h14.3L18 3H5zm7.5 10.98c-.72.12-1.43.25-2.15.38-.38-1.43-.65-2.86-.82-4.3h3.57c-.17 1.44-.38 2.87-.6 4.3zm-3.82 1.85c.06.2.11.4.16.6.16.55.33 1.11.5 1.66H6.7c.23-1.33.47-2.66.7-3.99l1.63.38zm7.52-7.5H6.8c-.13-1.01-.25-2-.36-3h10.13c-.11 1-.23 2-.36 3z" />
                  </svg>
                ) : tab.name.endsWith('.css') ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#264de4">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
                  </svg>
                ) : tab.name.endsWith('.pdf') ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#e74c3c">
                    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                  </svg>
                ) : (
                  <span className="text-xs">📄</span>
                )}

                <span className="text-xs flex-1">{tab.name}</span>

                {tabs.length > 1 && (
                  <button
                    onClick={(e) => closeTab(tab.id, e)}
                    className="opacity-0 group-hover:opacity-100 hover:bg-vscode-hover rounded p-1 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-y-auto bg-vscode-bg" style={{ height: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'home.jsx' && <HomeContent />}
                {activeTab === 'about.html' && <AboutContent onOpenFile={openFile} />}
                {activeTab === 'projects.json' && <ProjectsContent />}
                {activeTab === 'contact.css' && <ContactContent onOpenFile={openFile} />}
                {activeTab === 'github' && <GitHubProfile />}
                {activeTab === 'resume.pdf' && (
                  <PDFViewer
                    fileName="Bhavesh_Nankani_resume.pdf"
                    filePath="/Bhavesh_Nankani_resume.pdf"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Terminal */}
          {terminalOpen && (
            <div style={{ height: `${terminalHeight}px` }}>
              <Terminal
                onClose={() => setTerminalOpen(false)}
                onMinimize={() => setTerminalOpen(false)}
                onOpenFile={openFile}
                height={terminalHeight}
                onResize={(newHeight) => setTerminalHeight(newHeight)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-white text-xs px-3 py-1" style={{ backgroundColor: 'var(--color-vscode-status-bar)' }}>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded">
            <GitBranch size={13} />
            <span>main</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
          >
            <TerminalIcon size={13} />
            <span>Terminal</span>
          </button>
          <span>Ln 12, Col 4</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
}
