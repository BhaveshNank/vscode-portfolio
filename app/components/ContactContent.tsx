// ============================================================================
// 🔧 CONTACT PAGE - YOUR CONTACT INFORMATION
// ============================================================================
// Make it easy for recruiters and collaborators to reach you!
//
// TO CUSTOMIZE:
// 1. Update contactInfo array with YOUR contact details
// 2. Modify the introduction text
// 3. Ensure all links are working before deploying
// ============================================================================

'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Download, ExternalLink, Phone, FileText } from 'lucide-react';

interface ContactContentProps {
  onOpenFile?: (fileId: string, fileName: string) => void;
}

export default function ContactContent({ onOpenFile }: ContactContentProps) {
  // ============================================================================
  // 🔧 CUSTOMIZE: YOUR CONTACT INFORMATION
  // ============================================================================
  // Update each field with your own contact details
  // Set href to null if you don't want it to be clickable (e.g., Location)
  // ============================================================================
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bhaveshnankani@outlook.com',              // 🔧 Your email address
      href: 'mailto:bhaveshnankani@outlook.com',        // 🔧 Keep mailto: prefix
      color: 'text-vscode-syntax-red'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+44 7398 235749',                         // 🔧 Your phone number
      href: 'tel:+447398235749',                        // 🔧 Keep tel: prefix (no spaces)
      color: 'text-vscode-syntax-green'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/bhavesh-nankani',         // 🔧 Your LinkedIn username
      href: 'https://linkedin.com/in/bhavesh-nankani',  // 🔧 Full LinkedIn URL
      color: 'text-[#0077b5]'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/BhaveshNank',                  // 🔧 Your GitHub username
      href: 'https://github.com/BhaveshNank',           // 🔧 Full GitHub URL
      color: 'text-vscode-syntax-magenta'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'London, United Kingdom',                  // 🔧 Your location
      href: null,                                       // Keep null (not clickable)
      color: 'text-vscode-syntax-yellow'
    }
  ];
  // ============================================================================

  return (
    <div className="p-8 max-w-4xl bg-vscode-bg min-h-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-lg text-vscode-text">
            Let&apos;s connect and discuss how we can work together to build something amazing.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-6 bg-vscode-sidebar border border-vscode-border rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Resume</h2>
              <p className="text-vscode-textMuted text-sm">
                View my complete professional experience and qualifications
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenFile?.('resume.pdf', 'Bhavesh_Nankani_resume.pdf')}
                className="flex items-center gap-2 px-5 py-3 bg-vscode-hover text-white font-semibold rounded-lg hover:bg-vscode-border transition-all border border-vscode-border"
              >
                <FileText size={18} />
                <span>View in VS Code</span>
              </button>
              <a
                href="/Bhavesh_Nankani_resume.pdf"
                download
                className="flex items-center gap-2 px-5 py-3 bg-vscode-syntax-blue text-black font-semibold rounded-lg hover:bg-vscode-syntax-blue/80 transition-all"
              >
                <Download size={18} />
                <span>Download</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4 mb-12">
          {contactInfo.map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block p-5 bg-vscode-sidebar border-2 border-vscode-border rounded-lg hover:border-vscode-syntax-blue transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-vscode-bg ${contact.color}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-vscode-textMuted mb-1">{contact.label}</p>
                        <p className="text-white font-medium group-hover:text-vscode-syntax-blue transition-colors">
                          {contact.value}
                        </p>
                      </div>
                      {contact.href.startsWith('http') && (
                        <ExternalLink size={20} className="text-vscode-textMuted group-hover:text-vscode-syntax-blue transition-colors" />
                      )}
                    </div>
                  </a>
                ) : (
                  <div className="p-5 bg-vscode-sidebar border-2 border-vscode-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-vscode-bg ${contact.color}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-vscode-textMuted mb-1">{contact.label}</p>
                        <p className="text-white font-medium">{contact.value}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 bg-vscode-syntax-green/10 border-2 border-vscode-syntax-green rounded-lg"
        >
          <div className="flex items-start gap-4">
            <div className="w-3 h-3 rounded-full bg-vscode-syntax-green mt-1 animate-pulse" />
            <div>
              <h3 className="text-lg font-bold text-vscode-syntax-green mb-2">
                Available for Opportunities
              </h3>
              <p className="text-vscode-text">
                I&apos;m currently open to new opportunities and collaborations. 
                Feel free to reach out if you&apos;d like to discuss a project or just connect!
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl text-vscode-text font-semibold">
            Let&apos;s build something amazing together! 🚀
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
