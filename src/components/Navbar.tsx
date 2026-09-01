import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sliders,
  Terminal,
  Trophy,
  Bot,
  MousePointer2,
} from 'lucide-react';
import DecryptedText from './ui/DecryptedText';
import { playPop } from '../utils/soundFX';
import { smoothScrollTo } from '../utils/smoothScroll';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenEditor?: () => void;
  onOpenCms?: () => void;
  onTriggerEasterEgg?: () => void;
  onOpenEnegy?: () => void;
  onOpenAchievementsPage?: () => void;
  onOpenCLI?: () => void;
  onOpenOffcanvas?: () => void;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}

export default function Navbar({
  onOpenCommandPalette,
  onOpenEditor,
  onOpenCms,
  onTriggerEasterEgg,
  onOpenEnegy,
  onOpenAchievementsPage,
  onOpenCLI,
  onOpenOffcanvas,
  activeSection,
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorActive, setCursorActive] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('kabir_custom_cursor');
    if (saved !== null) {
      setCursorActive(saved === 'true');
    }

    const handleCursorEvent = () => {
      const current = localStorage.getItem('kabir_custom_cursor');
      setCursorActive(current !== 'false');
    };

    window.addEventListener('toggle-custom-cursor', handleCursorEvent);
    return () => window.removeEventListener('toggle-custom-cursor', handleCursorEvent);
  }, []);

  const handleToggleCursor = () => {
    playPop(580);
    window.dispatchEvent(new CustomEvent('toggle-custom-cursor'));
  };

  const handleEditorClick = () => {
    playPop(600);
    if (onOpenCms) onOpenCms();
    else if (onOpenEditor) onOpenEditor();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', target: 'about' },
    { label: 'WHAT I DO', target: 'what-i-do' },
    { label: 'PROJECTS', target: 'projects' },
    { label: 'ACHIEVEMENTS', target: 'achievements' },
    { label: 'MARVEL', target: 'marvel' },
    { label: 'CONTACT', target: 'contact' },
  ];

  const scrollTo = (id: string) => {
    playPop(520);
    if (onNavigate) {
      onNavigate(id);
    } else {
      smoothScrollTo(id, { offset: -70, duration: 1.2 });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="header fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 sm:py-4 transition-all duration-300 pointer-events-none">
      <div className="navbar max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo / Monogram */}
        <button
          id="nav-logo"
          onClick={() => {
            playPop(650);
            smoothScrollTo(0, { duration: 1.0 });
          }}
          data-interactive="true"
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-zinc-800/80 bg-[#0c0c0e]/90 backdrop-blur-md hover:border-zinc-700 transition-all cursor-pointer shadow-lg"
        >
          <div className="w-2 h-2 rounded-full bg-[#ff3b30] group-hover:scale-125 transition-transform" />
          <span className="font-display font-black text-sm tracking-tight text-zinc-100">
            KG<span className="text-[#ff3b30]">.</span>
          </span>
          <span className="hidden sm:inline text-[11px] font-mono-code text-zinc-400 pl-1.5 border-l border-zinc-800">
            <DecryptedText text="KABIR GUREJA" speed={20} animateOn="hover" />
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav
          id="desktop-nav"
          className={`nav-links hidden xl:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 shadow-xl ${
            isScrolled
              ? 'border-zinc-800 bg-[#0c0c0e]/90 backdrop-blur-md text-xs'
              : 'border-zinc-800/60 bg-[#121216]/70 backdrop-blur-sm text-xs'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                id={`nav-link-${link.target}`}
                data-interactive="true"
                onClick={() => scrollTo(link.target)}
                className={`px-3 py-1.5 rounded-full font-mono-code text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Cluster: Spacious & Perfectly Balanced */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Interactive CLI Terminal Launcher */}
          {onOpenCLI && (
            <button
              id="btn-nav-cli-toggle"
              data-interactive="true"
              data-cursor-text="CLI"
              onClick={() => {
                playPop(620);
                onOpenCLI();
              }}
              title="Open Interactive CLI Terminal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-700/70 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono-code transition-all cursor-pointer shadow-md"
            >
              <Terminal className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span className="font-semibold hidden sm:inline">CLI</span>
            </button>
          )}

          {/* Achievements & Certificates Dedicated Page Trigger */}
          {onOpenAchievementsPage && (
            <button
              id="btn-nav-achievements-page"
              data-interactive="true"
              data-cursor-text="HONORS"
              onClick={() => {
                playPop(580);
                onOpenAchievementsPage();
              }}
              title="Explore All Certificates & Awards Archive"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-xs font-mono-code transition-all cursor-pointer shadow-md"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">HONORS</span>
            </button>
          )}

          {/* ENEGY Gemini AI Trigger */}
          {onOpenEnegy && (
            <button
              id="btn-nav-energy-ai"
              data-interactive="true"
              data-cursor-text="ENEGY"
              onClick={() => {
                playPop(620);
                onOpenEnegy();
              }}
              title="Chat with ENEGY (Gemini AI)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-mono-code transition-all cursor-pointer shadow-md"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold hidden sm:inline">ENEGY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          )}

          {/* Custom White Dot Cursor Toggle */}
          <button
            id="btn-cursor-toggle"
            data-interactive="true"
            data-cursor-text="DOT"
            onClick={handleToggleCursor}
            title={cursorActive ? "Switch to Standard OS Pointer" : "Switch to Custom White Dot Cursor"}
            className={`hidden md:flex p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer shadow-md ${
              cursorActive
                ? 'border-zinc-600 bg-white/10 text-white hover:bg-white/20'
                : 'border-zinc-800 bg-[#0c0c0e]/80 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <MousePointer2 className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger & Offcanvas Toggle Button */}
          <button
            id="btn-mobile-menu-toggle"
            data-interactive="true"
            data-cursor-text="MENU"
            onClick={() => {
              playPop(520);
              if (onOpenOffcanvas) {
                onOpenOffcanvas();
              } else {
                setMobileMenuOpen(!mobileMenuOpen);
              }
            }}
            className="tw-hamburger-toggle tw-offcanvas-open-btn p-2 rounded-full border border-zinc-800 bg-[#0c0c0e]/90 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all cursor-pointer shadow-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="xl:hidden mt-3 p-4 rounded-2xl border border-zinc-800 bg-[#121216]/95 backdrop-blur-xl shadow-2xl pointer-events-auto max-w-lg mx-auto"
          >
            <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="p-3 rounded-xl text-left bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono-code text-zinc-400 flex-wrap gap-2">
              {onOpenAchievementsPage && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAchievementsPage();
                  }}
                  className="flex items-center gap-1.5 text-amber-400 font-bold"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>HONORS & CERTS</span>
                </button>
              )}
              {onOpenCLI && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCLI();
                  }}
                  className="flex items-center gap-1.5 text-red-400 font-bold"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>CLI TERMINAL</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCms) onOpenCms();
                  else if (onOpenEditor) onOpenEditor();
                }}
                className="flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>CONTENT CMS</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
