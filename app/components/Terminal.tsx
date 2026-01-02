// ============================================================================
// 🔧 TERMINAL COMPONENT - INTERACTIVE COMMAND LINE
// ============================================================================
// This terminal allows users to interact with your portfolio using commands.
//
// TO CUSTOMIZE:
// 1. Update the welcome message with your name
// 2. Modify the commands object to add/remove/change commands
// 3. Update the skills command with your tech stack
// 4. Add Easter eggs for fun (e.g., 'sudo hire', 'coffee', 'joke')
//
// BUILT-IN COMMANDS:
// help, clear, about, projects, contact, skills, whoami, ls, pwd, date, 
// echo, cat, exit, sudo
//
// 💡 TIP: Easter eggs impress technical recruiters!
// ============================================================================

'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Trash2, Plus } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
  onMinimize: () => void;
  onOpenFile: (fileId: string, fileName: string) => void;
  height: number;
  onResize: (height: number) => void;
}

export default function Terminal({ onClose, onMinimize, onOpenFile, height, onResize }: TerminalProps) {
  // 🔧 CUSTOMIZE: Welcome message with your name
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Welcome to Bhavesh\'s Portfolio Terminal! 💻',  // 🔧 Your name
    'Type "help" to see available commands',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isResizing, setIsResizing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const resizeStartY = useRef(0);
  const resizeStartHeight = useRef(0);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput, terminalInput]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const delta = resizeStartY.current - e.clientY;
        const newHeight = Math.max(200, Math.min(600, resizeStartHeight.current + delta));
        onResize(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ns-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, onResize]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartY.current = e.clientY;
    resizeStartHeight.current = height;
  };

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = terminalInput.trim();
    const commandLower = command.toLowerCase();
    // 🔧 CUSTOMIZE: Terminal prompt with your name/username
    const newOutput = [...terminalOutput, `bhaveshnankani@vscode-portfolio:~$ ${terminalInput}`];  // 🔧 Your username
    
    if (command) {
      setCommandHistory([...commandHistory, terminalInput]);
      setHistoryIndex(-1);
    }

    // ========================================================================
    // 🔧 CUSTOMIZE: TERMINAL COMMANDS
    // ========================================================================
    // Each command is a function that adds output to the terminal
    // 
    // TO ADD A NEW COMMAND:
    // 1. Add a new key-value pair to the commands object
    // 2. The key is the command name users will type
    // 3. The value is a function that pushes strings to newOutput array
    // 
    // EXAMPLE:
    // coffee: () => {
    //   newOutput.push('\u2615 Brewing coffee... Done!');
    //   newOutput.push('Here you go! Enjoy your coffee.');
    // },
    // ========================================================================
    const commands: { [key: string]: () => void } = {
      help: () => {
        newOutput.push('');
        newOutput.push('📖 Available Commands:');
        newOutput.push('  help       - Show this help message');
        newOutput.push('  clear      - Clear terminal');
        newOutput.push('  about      - Open about.html');
        newOutput.push('  projects   - Open projects.json');
        newOutput.push('  contact    - Open contact.css');
        newOutput.push('  skills     - Show technical skills');
        newOutput.push('  whoami     - About Bhavesh');
        newOutput.push('  ls         - List files');
        newOutput.push('  pwd        - Print working directory');
        newOutput.push('  date       - Show current date');
        newOutput.push('  echo <msg> - Print message');
        newOutput.push('  cat        - Read files');
        newOutput.push('  exit       - Try to leave');
        newOutput.push('');
      },
      clear: () => {
        setTerminalOutput([
          'Welcome to Bhavesh\'s Portfolio Terminal! 💻',
          'Type "help" to see available commands',
          ''
        ]);
        setTerminalInput('');
        return;
      },
      about: () => {
        onOpenFile('about.html', 'about.html');
        newOutput.push('✓ Opening about.html...');
      },
      projects: () => {
        onOpenFile('projects.json', 'projects.json');
        newOutput.push('✓ Opening projects.json...');
      },
      contact: () => {
        onOpenFile('contact.css', 'contact.css');
        newOutput.push('✓ Opening contact.css...');
      },
      // 🔧 CUSTOMIZE: Update with YOUR skills
      skills: () => {
        newOutput.push('');
        newOutput.push('💡 Technical Skills:');
        newOutput.push('  Frontend: React, Next.js 15, TypeScript, Tailwind CSS');  // 🔧 Your frontend skills
        newOutput.push('  Backend: Node.js, Express, Python, Flask');              // 🔧 Your backend skills
        newOutput.push('  Database: PostgreSQL, MongoDB Atlas');                   // 🔧 Your databases
        newOutput.push('  DevOps: AWS, Vercel, Render, Git, CI/CD');               // 🔧 Your DevOps tools
        newOutput.push('');
      },
      // 🔧 CUSTOMIZE: Update with YOUR info
      whoami: () => {
        newOutput.push('');
        newOutput.push('root user: Bhavesh Nankani (Full Stack Engineer & Coffee Consumer ☕️)');  // 🔧 Your name and title
        newOutput.push('');
      },
      ls: () => {
        newOutput.push('');
        newOutput.push('home.jsx');
        newOutput.push('about.html');
        newOutput.push('projects.json');
        newOutput.push('contact.css');
        newOutput.push('');
      },
      pwd: () => {
        newOutput.push('/home/bhaveshnankani/vscode-portfolio');
      },
      date: () => {
        newOutput.push(new Date().toString());
      },
      cat: () => {
        newOutput.push('Meow? 🐈 (Did you mean \'cat contact.css\'?)');
      },
      // 🎭 Easter egg command - fun response
      exit: () => {
        newOutput.push('There is no escape. You must hire me. 🔒');
      },
      // 🔧 ADD YOUR CUSTOM COMMANDS HERE
      // Example:
      // coffee: () => {
      //   newOutput.push('\u2615 Brewing coffee... *beep boop* Done!');
      // },
      // 🎭 Another Easter egg
      sudo: () => {
        newOutput.push('[sudo] password for bhaveshnankani: ');  // 🔧 Your username
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, 'Sorry, permission denied.', '']);
        }, 500);
      }
    };
    // ========================================================================

    if (commandLower === 'clear') {
      setTerminalOutput([
        'Welcome to Bhavesh\'s Portfolio Terminal! 💻',
        'Type "help" to see available commands',
        ''
      ]);
      setTerminalInput('');
      return;
    }

    // Handle echo command
    if (commandLower.startsWith('echo ')) {
      const message = command.substring(5);
      newOutput.push(message);
    } else if (commandLower.startsWith('cat ')) {
      const filename = command.substring(4).trim();
      if (filename === 'contact.css') {
        onOpenFile('contact.css', 'contact.css');
        newOutput.push('✓ Opening contact.css...');
      } else if (filename === 'about.html') {
        onOpenFile('about.html', 'about.html');
        newOutput.push('✓ Opening about.html...');
      } else if (filename === 'projects.json') {
        onOpenFile('projects.json', 'projects.json');
        newOutput.push('✓ Opening projects.json...');
      } else {
        newOutput.push(`cat: ${filename}: No such file or directory`);
      }
    } else if (commandLower === 'sudo hire bhavesh' || commandLower === 'sudo hire') {
      newOutput.push('Permission denied: You need to schedule an interview first.');
      newOutput.push('Run \'contact\' to proceed. 💼');
    } else if (commands[commandLower]) {
      commands[commandLower]();
    } else if (commandLower) {
      newOutput.push(`bash: ${command}: command not found`);
      newOutput.push('Type "help" for available commands');
    }
    
    if (commandLower !== 'sudo') {
      newOutput.push('');
    }
    
    setTerminalOutput(newOutput);
    setTerminalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(newIndex);
          setTerminalInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div style={{ height: `${height}px` }} className="flex flex-col bg-vscode-bg border-t border-vscode-border">
      {/* Resize Handle */}
      <div
        onMouseDown={handleResizeStart}
        className="h-1 bg-vscode-border hover:bg-vscode-activityBarBadge cursor-ns-resize transition-colors"
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-vscode-sidebar border-b border-vscode-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-vscode-text uppercase tracking-wide">Terminal</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-vscode-textMuted">
            <button className="hover:text-vscode-text transition-colors">
              <Plus size={14} />
            </button>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-vscode-bg rounded">
              <span>1: bash</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setTerminalOutput([
                'Welcome to Bhavesh\'s Portfolio Terminal! 💻',
                'Type "help" to see available commands',
                ''
              ]);
              setTerminalInput('');
            }}
            className="p-1 hover:bg-vscode-hover rounded transition-colors text-vscode-textMuted hover:text-vscode-text"
            title="Clear Terminal"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-vscode-hover rounded transition-colors text-vscode-textMuted hover:text-vscode-text"
            title="Minimize"
          >
            <ChevronDown size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-vscode-hover rounded transition-colors text-vscode-textMuted hover:text-vscode-text"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Output + Input - ALL IN ONE SCROLLABLE AREA */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-3 py-2 font-mono text-sm leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Output History */}
        {terminalOutput.map((line, i) => (
          <div
            key={i}
            className={`${
              line.startsWith('bhaveshnankani@vscode-portfolio') ? 'text-vscode-syntax-cyan font-semibold' : 
              line.startsWith('✓') ? 'text-vscode-syntax-blue' :
              line.includes('command not found') || line.includes('permission denied') ? 'text-vscode-syntax-red' :
              line.startsWith('💡') || line.startsWith('📖') ? 'text-vscode-syntax-yellow' :
              line.startsWith('[sudo]') ? 'text-vscode-text' :
              'text-vscode-textMuted'
            }`}
          >
            {line}
          </div>
        ))}

        {/* Current Input Line - BELOW ALL OUTPUT */}
        <form onSubmit={handleTerminalCommand} className="flex items-center gap-2">
          <span className="text-vscode-syntax-cyan font-semibold">bhaveshnankani@vscode-portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-vscode-text"
            placeholder="Type a command..."
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
