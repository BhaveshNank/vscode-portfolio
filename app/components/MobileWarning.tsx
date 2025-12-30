'use client';

import { useState, useEffect } from 'react';
import { Monitor, X } from 'lucide-react';

export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || isDismissed) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-vscode-sidebar border-2 border-vscode-activityBarBadge rounded-lg max-w-md w-full p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-4 right-4 p-1 hover:bg-vscode-hover rounded transition-colors text-vscode-textMuted hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-vscode-activityBarBadge/20 rounded-full">
            <Monitor size={28} className="text-vscode-activityBarBadge" />
          </div>
          <h2 className="text-xl font-bold text-white">Desktop Recommended</h2>
        </div>

        <p className="text-vscode-text mb-4 leading-relaxed">
          This portfolio is designed to replicate VS Code, which works best on desktop screens.
        </p>

        <div className="bg-vscode-bg border border-vscode-border rounded p-3 mb-4">
          <p className="text-sm text-vscode-textMuted">
            💡 <span className="text-vscode-syntax-yellow">Pro tip:</span> Visit on a laptop/desktop for the full interactive experience!
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsDismissed(true)}
            className="flex-1 px-4 py-2.5 bg-vscode-activityBarBadge text-black font-semibold rounded hover:bg-vscode-activityBarBadge/90 transition-colors"
          >
            View Anyway
          </button>
          <a
            href="mailto:bhaveshnankani@outlook.com"
            className="flex-1 px-4 py-2.5 bg-vscode-hover text-white font-semibold rounded hover:bg-vscode-border transition-colors text-center"
          >
            Email Me
          </a>
        </div>

        <p className="text-xs text-vscode-textMuted text-center mt-4">
          You can still browse, but some features may be limited
        </p>
      </div>
    </div>
  );
}
