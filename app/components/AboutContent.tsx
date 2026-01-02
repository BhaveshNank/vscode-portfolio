// ============================================================================
// 🔧 ABOUT PAGE - YOUR PROFESSIONAL STORY
// ============================================================================
// This page showcases your background, education, skills, and experience.
// 
// TO CUSTOMIZE:
// 1. Update personal information in the Hero Section (name, title, bio)
// 2. Modify techStack object with your technologies
// 3. Update stats array with your achievements
// 4. Replace profile picture in public folder (bhavesh.jpeg)
// 5. Update education and work experience sections
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code2, 
  Rocket, 
  Users, 
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
  Download,
  ExternalLink
} from 'lucide-react';

interface AboutContentProps {
  onOpenFile?: (fileId: string, fileName: string) => void;
}

export default function AboutContent({ onOpenFile }: AboutContentProps) {
  // ============================================================================
  // 🔧 CUSTOMIZE: YOUR TECHNICAL SKILLS
  // ============================================================================
  // Organize your skills by category for better presentation
  const techStack = {
    languages: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C/C++'],         // 🔧 Programming languages
    frontend: ['React', 'Next.js 15', 'Tailwind CSS'],                         // 🔧 Frontend technologies
    backend: ['Node.js', 'Express', 'Flask', 'REST APIs'],                     // 🔧 Backend technologies
    databases: ['PostgreSQL', 'MongoDB', 'MySQL'],                             // 🔧 Databases you know
    cloud: ['AWS', 'Azure DevOps', 'Vercel', 'GitHub Actions', 'Git']        // 🔧 Cloud & DevOps tools
  };

  // ============================================================================
  // 🔧 CUSTOMIZE: YOUR KEY STATS/ACHIEVEMENTS
  // ============================================================================
  // Highlight impressive numbers or achievements
  const stats = [
    { label: 'First Class Honours', value: '🏆', color: 'blue' },      // 🔧 Your top achievement
    { label: 'Technologies', value: '15+', color: 'green' },           // 🔧 Number of technologies
    { label: 'Certifications', value: '3', color: 'cyan' },            // 🔧 Certifications earned
    { label: 'CI/CD Pipelines', value: '✓', color: 'magenta' }        // 🔧 Another achievement
  ];

  return (
    <div className="overflow-y-auto bg-vscode-bg" style={{ height: '100%' }}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-vscode-syntax-blue/5 via-vscode-bg to-vscode-bg border-b border-vscode-border">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-start gap-8"
          >
            {/* Avatar Placeholder */}
            <div className="relative">
              {/* 🔧 CUSTOMIZE: Replace /bhavesh.jpeg with your photo in public folder */}
              <img 
                src="/bhavesh.jpeg"                    // 🔧 Your profile picture path
                alt="Bhavesh Nankani"                  // 🔧 Your name for alt text
                className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-vscode-border"
              />
            </div>

            {/* Header Info */}
            <div className="flex-1">
              {/* 🔧 CUSTOMIZE: Your name, title, and introduction */}
              <h1 className="text-5xl font-bold text-white mb-4">Bhavesh Nankani</h1>  {/* 🔧 Your name */}
              <p className="text-xl text-vscode-syntax-blue font-semibold mb-4">
                Full-Stack Software Engineer  {/* 🔧 Your professional title */}
              </p>
              <p className="text-lg text-vscode-text leading-relaxed mb-6">
                {/* 🔧 Your professional introduction (2-3 sentences) */}
                First Class Honours graduate passionate about building scalable web applications 
                and solving complex technical challenges with elegant solutions.
              </p>
              
              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-vscode-textMuted mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-vscode-syntax-blue" />
                  <span>London, UK</span>  {/* 🔧 Your location */}
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-vscode-syntax-green" />
                  <span>University of Greenwich</span>  {/* 🔧 Your university */}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-vscode-syntax-cyan" />
                  <span>Available for opportunities</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {onOpenFile && (
                  <>
                    <button
                      onClick={() => onOpenFile('projects.json', 'projects.json')}
                      className="px-5 py-2.5 bg-vscode-activityBarBadge text-white rounded hover:bg-opacity-90 transition-all flex items-center gap-2 font-medium"
                    >
                      View Projects
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={() => onOpenFile('resume.pdf', 'Bhavesh_Nankani_resume.pdf')}
                      className="px-5 py-2.5 bg-vscode-sidebar border border-vscode-border text-white rounded hover:border-vscode-activityBarBadge transition-all flex items-center gap-2 font-medium"
                    >
                      <Download size={16} />
                      Resume
                    </button>
                    <button
                      onClick={() => onOpenFile('contact.css', 'contact.css')}
                      className="px-5 py-2.5 bg-vscode-sidebar border border-vscode-border text-white rounded hover:border-vscode-activityBarBadge transition-all flex items-center gap-2 font-medium"
                    >
                      <Mail size={16} />
                      Contact
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {stats.map((stat, idx) => {
              const colorMap: Record<string, string> = {
                blue: 'from-vscode-syntax-blue/20 border-vscode-syntax-blue/50 text-vscode-syntax-blue',
                green: 'from-vscode-syntax-green/20 border-vscode-syntax-green/50 text-vscode-syntax-green',
                cyan: 'from-vscode-syntax-cyan/20 border-vscode-syntax-cyan/50 text-vscode-syntax-cyan',
                magenta: 'from-vscode-syntax-magenta/20 border-vscode-syntax-magenta/50 text-vscode-syntax-magenta'
              };
              const classes = colorMap[stat.color];
              
              return (
                <div
                  key={idx}
                  className={`p-4 bg-gradient-to-br ${classes} to-transparent border rounded-lg text-center`}
                >
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-vscode-textMuted">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Briefcase className="text-vscode-syntax-cyan" size={32} />
            Experience
          </h2>
          
          <div className="relative border-l-2 border-vscode-border ml-4 space-y-8">
            {/* Experience Item 1 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-vscode-syntax-green border-4 border-vscode-bg"></div>
              <div className="bg-vscode-sidebar border border-vscode-border rounded-lg p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">Student Centre Advisor</h3>
                    <p className="text-vscode-syntax-green font-medium">University of Greenwich</p>
                  </div>
                  <span className="text-sm text-vscode-textMuted">Aug 2025 - Sep 2025</span>
                </div>
                <ul className="space-y-2 text-vscode-text text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-vscode-syntax-green mt-0.5">▸</span>
                    <span>Achieved <strong className="text-white">90% first-contact resolution</strong> handling high-volume requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vscode-syntax-green mt-0.5">▸</span>
                    <span>Collaborated with IT and Finance teams on complex technical issues</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-vscode-syntax-cyan border-4 border-vscode-bg"></div>
              <div className="bg-vscode-sidebar border border-vscode-border rounded-lg p-6 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">UK Student Recruitment Ambassador</h3>
                    <p className="text-vscode-syntax-cyan font-medium">University of Greenwich</p>
                  </div>
                  <span className="text-sm text-vscode-textMuted">Jul 2024 - Sep 2025</span>
                </div>
                <ul className="space-y-2 text-vscode-text text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-vscode-syntax-cyan mt-0.5">▸</span>
                    <span>Reduced email backlog by <strong className="text-white">25%</strong> during peak recruitment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-vscode-syntax-cyan mt-0.5">▸</span>
                    <span>Managed <strong className="text-white">80+ daily emails</strong> and <strong className="text-white">40+ calls</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-vscode-syntax-blue" size={32} />
            Education
          </h2>
          
          <div className="bg-gradient-to-br from-vscode-syntax-blue/10 to-transparent border border-vscode-border rounded-lg p-6 hover:border-vscode-border transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white">Bachelor of Engineering in Software Engineering</h3>
                <p className="text-lg text-vscode-syntax-blue font-semibold mt-2">First Class Honours</p>
              </div>
              <span className="text-sm text-vscode-textMuted">Sep 2022 - May 2025</span>
            </div>
            <p className="text-vscode-text">University of Greenwich, London, UK</p>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Code2 className="text-vscode-syntax-blue" size={32} />
            Tech Stack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, skills], idx) => {
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                languages: { bg: 'from-vscode-syntax-magenta/10', border: 'border-vscode-syntax-magenta/30', text: 'text-vscode-syntax-magenta' },
                frontend: { bg: 'from-vscode-syntax-blue/10', border: 'border-vscode-syntax-blue/30', text: 'text-vscode-syntax-blue' },
                backend: { bg: 'from-vscode-syntax-green/10', border: 'border-vscode-syntax-green/30', text: 'text-vscode-syntax-green' },
                databases: { bg: 'from-vscode-syntax-cyan/10', border: 'border-vscode-syntax-cyan/30', text: 'text-vscode-syntax-cyan' },
                cloud: { bg: 'from-vscode-syntax-blue/10', border: 'border-vscode-syntax-blue/30', text: 'text-vscode-syntax-blue' }
              };
              const colors = colorMap[category];

              return (
                <div
                  key={category}
                  className={`bg-gradient-to-br ${colors.bg} to-transparent border ${colors.border} rounded-lg p-6 hover:border-opacity-100 transition-all`}
                >
                  <h3 className={`text-lg font-bold ${colors.text} mb-4 capitalize`}>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-vscode-bg/50 text-vscode-text text-sm rounded border border-vscode-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Award className="text-vscode-syntax-green" size={32} />
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Technical Support Fundamentals', issuer: 'Google', date: 'Aug 2023', link: 'https://coursera.org/share/762b5418af43843fb964b823f5a53f27' },
              { name: 'Java (Basic)', issuer: 'HackerRank', date: 'Sep 2023', link: 'https://www.hackerrank.com/certificates/829c93e0a72b' },
              { name: 'Computer Networking', issuer: 'Google', date: 'Aug 2024', link: 'https://coursera.org/share/73da16d14994c58bb3d0bb39f44f1372' }
            ].map((cert, idx) => (
              <a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-vscode-sidebar border border-vscode-border rounded-lg p-5 hover:border-vscode-syntax-green transition-all group cursor-pointer block"
              >
                <div className="flex items-start justify-between mb-3">
                  <Award className="text-vscode-syntax-green" size={24} />
                  <ExternalLink size={14} className="text-vscode-textMuted group-hover:text-vscode-syntax-green transition-colors" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{cert.name}</h3>
                <p className="text-xs text-vscode-syntax-green mb-1">{cert.issuer}</p>
                <p className="text-xs text-vscode-textMuted">{cert.date}</p>
              </a>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
