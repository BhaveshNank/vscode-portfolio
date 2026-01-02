// ============================================================================
// 🔧 HOME PAGE - LANDING PAGE CONTENT
// ============================================================================
// This is the first page visitors see - make it count!
// The typewriter effect displays your profile information like code.
//
// TO CUSTOMIZE:
// Update the engineerProfile object below with your information
// ============================================================================

'use client';

import { useState, useEffect } from 'react';

// Typewriter effect hook - controls the typing animation speed
const useTypewriter = (text: string, speed = 20) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayText, text, speed]);

  return displayText;
};

export default function HomeContent() {
  // ============================================================================
  // 🔧 CUSTOMIZE THIS OBJECT WITH YOUR INFORMATION
  // ============================================================================
  const engineerProfile = {
    name: "Bhavesh Nankani",                    // 🔧 Your full name
    role: "Full-Stack Software Engineer",       // 🔧 Your professional title
    education: {
      degree: "BEng Software Engineering",      // 🔧 Your degree
      honours: "First Class",                   // 🔧 Your honors/GPA
      university: "University of Greenwich"     // 🔧 Your university
    },
    techStack: [                                // 🔧 Your main technologies (6-8 items)
      "Next.js 15 & React",
      "JavaScript", "TypeScript",
      "Node.js",
      "Python (Flask/AI)",
      "PostgreSQL & MongoDB",
      "AWS & Cloud Architecture"
    ],
    location: "London, UK",                     // 🔧 Your location
    status: "Ready to Deploy 🚀"               // 🔧 Your current status/tagline
  };
  // ============================================================================

  const code = `const bhavesh = ${JSON.stringify(engineerProfile, null, 2)};

export default bhavesh;`;

  const displayText = useTypewriter(code, 20);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayText.length === code.length) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [displayText, code.length]);

  // Syntax highlighting for the config object
  const highlightLine = (line: string) => {
    // Property keys
    if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':');
      
      // Highlight property names in blue/cyan
      const highlightedKey = key.replace(/"([^"]+)"/g, '<span class="text-[#9cdcfe]">"$1"</span>');
      
      // Highlight strings in orange
      let highlightedValue = value.replace(/"([^"]*)"/g, '<span class="text-[#ce9178]">"$1"</span>');
      
      return `${highlightedKey}:${highlightedValue}`;
    }
    
    // Keywords
    if (line.includes('const') || line.includes('export') || line.includes('default')) {
      return line
        .replace(/\bconst\b/g, '<span class="text-[#c586c0]">const</span>')
        .replace(/\bexport\b/g, '<span class="text-[#c586c0]">export</span>')
        .replace(/\bdefault\b/g, '<span class="text-[#c586c0]">default</span>')
        .replace(/\bbhavesh\b/g, '<span class="text-[#4fc1ff]">bhavesh</span>');
    }
    
    // Brackets and punctuation
    return line
      .replace(/(\{|\}|\[|\])/g, '<span class="text-[#ffd700]">$1</span>')
      .replace(/,$/g, '<span class="text-[#d4d4d4]">,</span>');
  };
  
  return (
    <div className="p-8 font-mono text-sm leading-relaxed bg-[#1e1e1e] min-h-full">
      <div className="max-w-3xl">
        {displayText.split('\n').map((line, i) => (
          <div key={i} className="flex">
            <span className="inline-block w-12 text-right pr-4 text-[#858585] select-none">
              {i + 1}
            </span>
            <span 
              className="text-[#d4d4d4]"
              dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
            />
          </div>
        ))}
        
        {displayText.length < code.length && (
          <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse" />
        )}
        
        {displayText.length === code.length && (
          <span className={`inline-block w-2 h-5 bg-white ml-1 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
        )}
      </div>
    </div>
  );
}
