// ============================================================================
// 🔧 PROJECTS PAGE - SHOWCASE YOUR WORK
// ============================================================================
// This page displays your portfolio projects with descriptions and links.
//
// TO CUSTOMIZE:
// 1. Replace the projects array below with YOUR projects
// 2. Each project needs: name, tagline, description, tech, highlights, links
// 3. Update GitHub username in the header
// 4. Choose icon and color for each project
//
// Available icons: Database, Cloud, Code, Server, Globe, etc. (from lucide-react)
// Available colors: 'blue', 'green', 'purple'
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Database, Cloud, Code } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsContent() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // ============================================================================
  // 🔧 CUSTOMIZE: YOUR PROJECTS ARRAY
  // ============================================================================
  // Replace with your own projects. Each project should showcase:
  // - What problem it solves
  // - Technologies used
  // - Key achievements/metrics
  // - Links to demo and code
  //
  // 💡 TIP: Lead with your most impressive project
  // 💡 TIP: Use specific metrics in highlights (e.g., "90% faster", "15+ endpoints")
  // ============================================================================
  const projects = [
    // 🔧 PROJECT 1: Replace with your most impressive project
    {
      id: 1,                                                    // Keep incrementing
      name: 'GrowAhead',                                        // 🔧 Project name
      tagline: 'Micro-Investment Fintech Platform',             // 🔧 One-line description
      description: 'Full-stack fintech simulation platform with 3 investment strategy models (5%, 8%, 12% returns), featuring interactive dashboards using Recharts and precision financial algorithms calculating 1-10 year portfolio projections.',  // 🔧 Detailed description (2-3 sentences)
      tech: ['Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS Elastic Beanstalk', 'AWS RDS', 'Vercel'],  // 🔧 Tech stack
      highlights: [                                             // 🔧 Key achievements (3-5 bullet points)
        'Secure RESTful API with 15+ endpoints',
        'JWT authentication & bcrypt hashing',
        'CI/CD pipeline with GitHub Actions',
        '51 Jest tests - 90% faster deployment'
      ],
      icon: Database,                                           // 🔧 Icon component (Database, Cloud, Code)
      color: 'blue',                                           // 🔧 Color theme (blue, green, purple)
      demoLink: 'https://growahead-beta.vercel.app',           // 🔧 Live demo link (or null)
      githubLink: 'https://github.com/BhaveshNank/GrowAhead'  // 🔧 GitHub repository link
    },
    // 🔧 PROJECT 2: Replace with your second project
    {
      id: 2,
      name: 'VisionTech',
      tagline: 'AI-Powered E-Commerce Platform',
      description: 'Production-ready Python/Flask API integrating Google Gemini AI for intelligent product recommendations. Features a component-based React frontend with a Design System of 31 reusable components.',
      tech: ['Python', 'Flask', 'Google Gemini AI', 'MongoDB', 'React.js', 'Vercel', 'Render'],
      highlights: [
        'Google Gemini AI integration',
        '31 reusable components',
        'Optimized MongoDB schema',
        'Prompt engineering for context'
      ],
      icon: Cloud,
      color: 'green',
      demoLink: 'https://vision-tech-beta.vercel.app',
      githubLink: 'https://github.com/BhaveshNank/VisionTech'
    },
    // 🔧 PROJECT 3: Replace with your third project
    {
      id: 3,
      name: 'JavaChatApp',
      tagline: 'Multi-threaded Java Chat Server',
      description: 'Built using core OOP principles with design patterns like MVC and Observer. Supports 20+ concurrent clients with comprehensive unit testing suite and CI/CD through Azure DevOps.',
      tech: ['Java', 'Swing', 'Sockets', 'Multi-threading', 'Azure DevOps'],
      highlights: [
        'MVC & Observer patterns',
        '20+ concurrent clients',
        'Comprehensive unit testing',
        'Azure DevOps CI/CD'
      ],
      icon: Code,
      color: 'purple',
      demoLink: null,                                         // 🔧 Set to null if no live demo
      githubLink: 'https://github.com/BhaveshNank/JavaChatApp'
    }
    // 🔧 ADD MORE PROJECTS: Copy the structure above to add more projects
  ];
  // ============================================================================

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        border: 'border-vscode-syntax-blue',
        bg: 'bg-vscode-syntax-blue/10',
        text: 'text-vscode-syntax-blue',
        hover: 'hover:border-vscode-syntax-blue'
      },
      green: {
        border: 'border-vscode-syntax-green',
        bg: 'bg-vscode-syntax-green/10',
        text: 'text-vscode-syntax-green',
        hover: 'hover:border-vscode-syntax-green'
      },
      purple: {
        border: 'border-vscode-syntax-magenta',
        bg: 'bg-vscode-syntax-magenta/10',
        text: 'text-vscode-syntax-magenta',
        hover: 'hover:border-vscode-syntax-magenta'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-8 max-w-7xl bg-vscode-bg min-h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Featured Projects</h1>
          <div className="flex items-center gap-6 text-vscode-textMuted">
            <div className="flex items-center gap-2">
              <Github size={16} />
              <span>github.com/BhaveshNank</span>  {/* 🔧 Your GitHub username */}
            </div>
            <span>•</span>
            <span>25+ repositories</span>
            <span>•</span>
            <span>500+ contributions</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project) => {
            const Icon = project.icon;
            const colors = getColorClasses(project.color);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: project.id * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`
                  group relative p-6 rounded-lg border-2 transition-all duration-300
                  ${hoveredProject === project.id 
                    ? `${colors.border} ${colors.bg}` 
                    : 'border-vscode-border bg-vscode-sidebar'
                  }
                `}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${colors.bg} ${colors.text}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
                      <p className={`text-sm font-medium ${colors.text}`}>{project.tagline}</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm
                          ${colors.bg} ${colors.text} ${colors.hover} border-2 border-transparent
                          hover:border-current transition-all
                        `}
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm
                        bg-vscode-hover text-vscode-text hover:bg-vscode-border
                        transition-all
                      "
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-vscode-text mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-vscode-bg border border-vscode-border rounded-md text-xs font-medium text-vscode-syntax-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-sm font-semibold text-vscode-text mb-3">Technical Highlights:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-vscode-textMuted">
                        <span className={colors.text}>✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/BhaveshNank"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-vscode-syntax-blue/20 border-2 border-vscode-syntax-blue text-vscode-syntax-blue rounded-lg font-semibold hover:bg-vscode-syntax-blue hover:text-black transition-all"
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
