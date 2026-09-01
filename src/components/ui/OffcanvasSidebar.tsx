import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowRight,
  Terminal,
  Trophy,
  Bot,
  Sliders,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { playPop } from '../../utils/soundFX';
import DecryptedText from './DecryptedText';

interface OffcanvasSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenCLI?: () => void;
  onOpenEnegy?: () => void;
  onOpenAchievementsPage?: () => void;
  onOpenCms?: () => void;
  onTriggerEasterEgg?: () => void;
  activeSection?: string;
}

export default function OffcanvasSidebar({
  isOpen,
  onClose,
  onNavigate,
  onOpenCLI,
  onOpenEnegy,
  onOpenAchievementsPage,
  onOpenCms,
  onTriggerEasterEgg,
  activeSection,
}: OffcanvasSidebarProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'ABOUT ME', target: 'about', desc: 'Background & Dynamic Age' },
    { label: 'WHAT I DO', target: 'what-i-do', desc: 'Craft, AI & Robotics Matrix' },
    { label: 'PROJECTS', target: 'projects', desc: 'Engineering & Code Lab' },
    { label: 'ACHIEVEMENTS', target: 'achievements', desc: 'Munish Award & Timeline' },
    { label: 'MARVEL ARCHIVE', target: 'marvel', desc: 'Comic Theories & Lore' },
    { label: 'CONTACT', target: 'contact', desc: 'Direct Inquiries & Message' },
  ];

  const handleLinkClick = (target: string) => {
    playPop(520);
    onClose();
    onNavigate(target);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Main Backdrop Overlay (.overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="overlay fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Side Shadow Overlay (.side-overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="side-overlay fixed inset-0 z-[1001] bg-gradient-to-r from-transparent via-black/40 to-black/90 pointer-events-none"
            aria-hidden="true"
          />

          {/* Offcanvas Drawer Sidebar */}
          <motion.aside
            id="tw-offcanvas-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="tw-offcanvas fixed top-0 right-0 z-[1002] w-full sm:w-[440px] h-full bg-[#0d0d11] border-l border-zinc-800 text-zinc-100 flex flex-col justify-between shadow-2xl overflow-y-auto"
          >
            {/* Offcanvas Header */}
            <div className="p-6 sm:p-8 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse" />
                <span className="font-display font-black text-base text-zinc-100">
                  KABIR GUREJA<span className="text-[#ff3b30]">.</span>
                </span>
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  MENU
                </span>
              </div>

              {/* Close Button (.tw-offcanvas-close-btn) */}
              <button
                type="button"
                data-interactive="true"
                data-cursor-text="CLOSE"
                onClick={() => {
                  playPop(500);
                  onClose();
                }}
                className="tw-offcanvas-close-btn p-2 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer shadow-md"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Links Stack (.nav-links) */}
            <div className="p-6 sm:p-8 space-y-2 flex-1">
              <div className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-500 mb-4">
                SECTIONS & ARCHITECTURE
              </div>

              <div className="nav-links space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.target;
                  return (
                    <motion.button
                      key={link.target}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.25 }}
                      onClick={() => handleLinkClick(link.target)}
                      data-interactive="true"
                      className={`w-full text-left p-3 rounded-xl transition-all group flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-zinc-800/80 border border-zinc-700 text-white'
                          : 'hover:bg-zinc-900/80 text-zinc-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div>
                        <div className="font-display font-black text-lg tracking-tight group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </div>
                        <div className="text-xs font-sans text-zinc-500">
                          {link.desc}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#ff3b30] group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  );
                })}
              </div>

              {/* Special Features Grid */}
              <div className="pt-6 border-t border-zinc-800/80 mt-6 space-y-2">
                <div className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-500 mb-3">
                  INTERACTIVE TOOLS
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {onOpenCLI && (
                    <button
                      data-interactive="true"
                      onClick={() => {
                        playPop(620);
                        onClose();
                        onOpenCLI();
                      }}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500/40 hover:bg-zinc-800 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-red-400">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>CLI SHELL</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        Interactive terminal
                      </div>
                    </button>
                  )}

                  {onOpenAchievementsPage && (
                    <button
                      data-interactive="true"
                      onClick={() => {
                        playPop(580);
                        onClose();
                        onOpenAchievementsPage();
                      }}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-800 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-amber-400">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>HONORS</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        All awards & certs
                      </div>
                    </button>
                  )}

                  {onOpenEnegy && (
                    <button
                      data-interactive="true"
                      onClick={() => {
                        playPop(620);
                        onClose();
                        onOpenEnegy();
                      }}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 hover:bg-zinc-800 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-emerald-400">
                        <Bot className="w-3.5 h-3.5" />
                        <span>ENEGY AI</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        Gemini assistant
                      </div>
                    </button>
                  )}

                  {onOpenCms && (
                    <button
                      data-interactive="true"
                      onClick={() => {
                        playPop(600);
                        onClose();
                        onOpenCms();
                      }}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-left transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono-code font-bold text-zinc-300">
                        <Sliders className="w-3.5 h-3.5" />
                        <span>CMS STUDIO</span>
                      </div>
                      <div className="text-[10px] text-zinc-500 mt-1">
                        Live content editor
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Offcanvas Footer */}
            <div className="p-6 sm:p-8 border-t border-zinc-800/80 bg-zinc-950/60 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400">
                <span className="text-zinc-500">BASE LOCATION</span>
                <span className="text-zinc-300">INDIA // UTC+05:30</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                <a
                  href="mailto:kabirgureja08@gmail.com"
                  data-interactive="true"
                  className="text-xs font-mono-code text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ff3b30]" />
                  <span>kabirgureja08@gmail.com</span>
                </a>

                <a
                  href="tel:+919826977750"
                  data-interactive="true"
                  className="text-xs font-mono-code text-zinc-400 hover:text-white transition-colors"
                >
                  +91 9826977750
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
