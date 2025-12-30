'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Code2, Rocket, Users, ArrowRight } from 'lucide-react';

interface AboutContentProps {
  onOpenFile?: (fileId: string, fileName: string) => void;
}

export default function AboutContent({ onOpenFile }: AboutContentProps) {
  return (
    <div className="p-8 max-w-6xl bg-vscode-bg min-h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">About Bhavesh</h1>
          <p className="text-xl text-vscode-text leading-relaxed">
            I&apos;m a <span className="text-vscode-syntax-green font-semibold">First Class Honours Software Engineering graduate</span> from the <span className="text-vscode-syntax-blue italic">University of Greenwich</span>, passionate about transforming complex challenges into elegant, scalable solutions.
          </p>
        </div>

        {/* Education Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 bg-gradient-to-br from-vscode-syntax-blue/10 to-transparent border-2 border-vscode-border rounded-lg hover:border-vscode-syntax-blue transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-vscode-syntax-blue/20 rounded-lg">
              <GraduationCap className="text-vscode-syntax-blue" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
              <h3 className="text-lg font-semibold text-vscode-syntax-blue mb-1">
                Bachelor of Engineering in Software Engineering
              </h3>
              <p className="text-vscode-textMuted mb-2">First Class Honours • University of Greenwich</p>
              <p className="text-sm text-vscode-text">September 2022 - May 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Professional Experience */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="text-vscode-syntax-cyan" size={28} />
            <h2 className="text-3xl font-bold text-vscode-syntax-cyan">Professional Experience</h2>
          </div>

          <div className="space-y-6">
            {/* Student Centre Advisor */}
            <div className="p-6 bg-gradient-to-br from-vscode-syntax-green/10 to-transparent border-2 border-vscode-border rounded-lg hover:border-vscode-syntax-green transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Student Centre Advisor</h3>
                  <p className="text-vscode-syntax-green font-medium">University of Greenwich</p>
                </div>
                <span className="text-sm text-vscode-textMuted">Aug 2025 - Sep 2025</span>
              </div>
              <ul className="space-y-2 text-vscode-text">
                <li className="flex items-start gap-2">
                  <span className="text-vscode-syntax-green mt-1">✓</span>
                  <span>Achieved <strong className="text-white">90% first-contact resolution rate</strong> by handling high-volume requests with accuracy and clarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vscode-syntax-green mt-1">✓</span>
                  <span>Collaborated with IT and Finance teams to solve complex technical and financial issues</span>
                </li>
              </ul>
            </div>

            {/* UK Student Recruitment Ambassador */}
            <div className="p-6 bg-gradient-to-br from-vscode-syntax-cyan/10 to-transparent border-2 border-vscode-border rounded-lg hover:border-vscode-syntax-cyan transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">UK Student Recruitment Ambassador</h3>
                  <p className="text-vscode-syntax-cyan font-medium">University of Greenwich</p>
                </div>
                <span className="text-sm text-vscode-textMuted">Jul 2024 - Sep 2025</span>
              </div>
              <ul className="space-y-2 text-vscode-text">
                <li className="flex items-start gap-2">
                  <span className="text-vscode-syntax-cyan mt-1">✓</span>
                  <span>Reduced team email backlog by <strong className="text-white">25%</strong> during peak recruitment cycles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vscode-syntax-cyan mt-1">✓</span>
                  <span>Managed <strong className="text-white">80+ daily emails</strong> and <strong className="text-white">40+ calls</strong> while streamlining workflows</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* What I Do */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Rocket className="text-vscode-syntax-blue" size={28} />
              <h2 className="text-3xl font-bold text-vscode-syntax-blue">What I Do</h2>
            </div>
            {onOpenFile && (
              <button
                onClick={() => onOpenFile('projects.json', 'projects.json')}
                className="flex items-center gap-2 text-sm text-vscode-activityBarBadge hover:text-white transition-colors group"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-vscode-syntax-blue/10 to-transparent border-2 border-vscode-border rounded-lg hover:border-vscode-syntax-blue transition-all">
              <Code2 className="text-vscode-syntax-blue mb-3" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Full-Stack Development</h3>
              <p className="text-vscode-text leading-relaxed">
                From database architecture to polished user interfaces, I build complete web applications that are scalable, maintainable, and user-centric.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-vscode-syntax-green/10 to-transparent border-2 border-vscode-border rounded-lg hover:border-vscode-syntax-green transition-all">
              <Users className="text-vscode-syntax-green mb-3" size={32} />
              <h3 className="text-xl font-bold text-white mb-3">Problem Solver</h3>
              <p className="text-vscode-text leading-relaxed">
                I thrive on turning complex technical challenges into elegant solutions, whether it&apos;s fintech platforms or AI-powered applications.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-vscode-syntax-green" size={28} />
            <h2 className="text-3xl font-bold text-vscode-syntax-green">Certifications</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Aug 2023', color: 'blue' },
              { name: 'Java (Basic)', issuer: 'HackerRank', date: 'Sep 2023', color: 'green' },
              { name: 'The Bits and Bytes of Computer Networking', issuer: 'Google', date: 'Aug 2024', color: 'cyan' }
            ].map((cert, idx) => {
              const colorClass = cert.color === 'blue' ? 'from-vscode-syntax-blue/10' : 
                                 cert.color === 'green' ? 'from-vscode-syntax-green/10' : 
                                 'from-vscode-syntax-cyan/10';
              const borderColor = cert.color === 'blue' ? 'hover:border-vscode-syntax-blue' : 
                                  cert.color === 'green' ? 'hover:border-vscode-syntax-green' : 
                                  'hover:border-vscode-syntax-cyan';
              const textColor = cert.color === 'blue' ? 'text-vscode-syntax-blue' : 
                                cert.color === 'green' ? 'text-vscode-syntax-green' : 
                                'text-vscode-syntax-cyan';
              
              return (
                <div key={idx} className={`p-4 bg-gradient-to-br ${colorClass} to-transparent border-2 border-vscode-border rounded-lg ${borderColor} transition-all`}>
                  <p className="font-semibold text-white text-sm mb-1">{cert.name}</p>
                  <p className={`text-xs ${textColor}`}>{cert.issuer}</p>
                  <p className="text-xs text-vscode-textMuted mt-2">{cert.date}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-vscode-syntax-blue mb-8 flex items-center gap-2">
            💡 Tech Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-vscode-syntax-magenta/10 to-transparent border-2 border-vscode-border rounded-lg p-6 hover:border-vscode-syntax-magenta transition-all">
              <h3 className="text-xl font-bold text-vscode-syntax-magenta mb-4">Languages</h3>
              <ul className="space-y-2.5 text-vscode-text text-sm">
                <li>• Python</li>
                <li>• Java</li>
                <li>• TypeScript</li>
                <li>• JavaScript</li>
                <li>• C/C++</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-vscode-syntax-blue/10 to-transparent border-2 border-vscode-border rounded-lg p-6 hover:border-vscode-syntax-blue transition-all">
              <h3 className="text-xl font-bold text-vscode-syntax-blue mb-4">Frontend</h3>
              <ul className="space-y-2.5 text-vscode-text text-sm">
                <li>• React & Next.js 15</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-vscode-syntax-green/10 to-transparent border-2 border-vscode-border rounded-lg p-6 hover:border-vscode-syntax-green transition-all">
              <h3 className="text-xl font-bold text-vscode-syntax-green mb-4">Backend</h3>
              <ul className="space-y-2.5 text-vscode-text text-sm">
                <li>• Node.js & Express</li>
                <li>• Python & Flask</li>
                <li>• RESTful APIs</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-vscode-syntax-cyan/10 to-transparent border-2 border-vscode-border rounded-lg p-6 hover:border-vscode-syntax-cyan transition-all">
              <h3 className="text-xl font-bold text-vscode-syntax-cyan mb-4">Database</h3>
              <ul className="space-y-2.5 text-vscode-text text-sm">
                <li>• PostgreSQL</li>
                <li>• MongoDB Atlas</li>
                <li>• MySQL</li>
                <li>• Database Design</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-vscode-syntax-blue/10 to-transparent border-2 border-vscode-border rounded-lg p-6 hover:border-vscode-syntax-blue transition-all col-span-1 md:col-span-2 lg:col-span-4">
              <h3 className="text-xl font-bold text-vscode-syntax-blue mb-4">Cloud, DevOps & Tools</h3>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2.5 text-vscode-text text-sm">
                <li>• AWS (Elastic Beanstalk, RDS)</li>
                <li>• Azure DevOps</li>
                <li>• Vercel & Render</li>
                <li>• GitHub Actions (CI/CD)</li>
                <li>• Git</li>
                <li>• Postman</li>
                <li>• Cursor & Copilot</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
