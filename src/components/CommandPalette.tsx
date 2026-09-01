import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Command,
  Bot,
  Leaf,
  Shield,
  Trophy,
  Shirt,
  Github,
  Mail,
  Palette,
  Gamepad2,
  Terminal,
  Sliders,
  Sparkles,
  ArrowRight,
  User,
  Volume2,
  MousePointer2,
  ExternalLink,
} from 'lucide-react';
import { playPop, toggleAudioHaptics, playSuccessChime } from '../utils/soundFX';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onTriggerEasterEgg?: () => void;
  onOpenEditor?: () => void;
  onOpenCms?: () => void;
  onOpenAchievementsPage?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onTriggerEasterEgg,
  onOpenEditor,
  onOpenCms,
  onOpenAchievementsPage,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleEditorTrigger = () => {
    if (onOpenCms) onOpenCms();
    else if (onOpenEditor) onOpenEditor();
  };

  const commandItems = [
    {
      id: 'cli-terminal',
      title: 'Interactive CLI Terminal (Bash / OS Emulator)',
      category: 'Tools',
      icon: Terminal,
      badge: 'React Bits [⌘J]',
      action: () => {
        playSuccessChime();
        onNavigate('cli');
      },
    },
    {
      id: 'audio-haptics-toggle',
      title: 'Toggle Audio Synthesizer Feedback (Web Audio API)',
      category: 'Audio',
      icon: Volume2,
      badge: 'Micro-Haptics',
      action: () => {
        toggleAudioHaptics();
      },
    },
    {
      id: 'manifesto',
      title: 'Transformation Manifesto (“Some ideas stay in my head...” → PROJECTS)',
      category: 'Philosophy',
      icon: Sparkles,
      badge: 'Scroll Driven',
      action: () => onNavigate('manifesto'),
    },
    {
      id: 'road-quote',
      title: 'Autonomous Road Manifesto (“I don’t really have a single lane...”)',
      category: 'Philosophy',
      icon: Sparkles,
      badge: 'Cinematic Scroll',
      action: () => onNavigate('road'),
    },
    {
      id: 'achievements-full-page',
      title: 'Open Full Honors & Certificates Archive (with Photos)',
      category: 'Records',
      icon: Trophy,
      badge: 'Dedicated Page',
      action: () => {
        if (onOpenAchievementsPage) onOpenAchievementsPage();
        else onNavigate('achievements');
      },
    },
    {
      id: 'terra',
      title: 'T.E.R.R.A. Robotics Bio-System',
      category: 'Projects',
      icon: Leaf,
      badge: 'Climate Tech',
      action: () => onNavigate('projects'),
    },
    {
      id: 'farmverse',
      title: 'FarmVerse — Agri Mitra Rover (TechnoXian Robotics)',
      category: 'Projects',
      icon: Leaf,
      badge: 'Autonomous AI',
      action: () => onNavigate('projects'),
    },
    {
      id: 'farmverse-live',
      title: 'Launch FarmVerse Platform (farmverse-technoxian.lovable.app)',
      category: 'External',
      icon: ExternalLink,
      badge: 'Live',
      action: () => window.open('https://farmverse-technoxian.lovable.app/', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'jarvis',
      title: 'JARVIS Personal Assistant & AI Lab',
      category: 'AI & Lab',
      icon: Bot,
      badge: 'Experimental',
      action: () => onNavigate('projects'),
    },
    {
      id: 'projects',
      title: 'All Projects & Hardware Prototypes',
      category: 'Projects',
      icon: Terminal,
      badge: 'Archive',
      action: () => onNavigate('projects'),
    },
    {
      id: 'achievements',
      title: 'Achievements, Billboards & Verified Milestones',
      category: 'Records',
      icon: Trophy,
      badge: 'Timeline',
      action: () => onNavigate('achievements'),
    },
    {
      id: 'marvel',
      title: 'Marvel Lore & Theory Submission Box',
      category: 'Community',
      icon: Shield,
      badge: 'Multiverse',
      action: () => onNavigate('marvel'),
    },
    {
      id: 'gaming',
      title: 'Gaming Sanctuary & Sandbox Tactics',
      category: 'Gaming',
      icon: Gamepad2,
      badge: 'Recreation',
      action: () => onNavigate('gaming'),
    },
    {
      id: 'clothing',
      title: 'Independent Apparel Brand & Products',
      category: 'Commerce',
      icon: Shirt,
      badge: 'Streetwear',
      action: () => onNavigate('products'),
    },
    {
      id: 'about',
      title: 'About Kabir & Live Dynamic Age Counter',
      category: 'Profile',
      icon: User,
      badge: 'Editorial',
      action: () => onNavigate('about'),
    },
    {
      id: 'github',
      title: 'GitHub Repositories & Real Contribution Feed',
      category: 'Socials',
      icon: Github,
      badge: 'Code',
      action: () => onNavigate('socials'),
    },
    {
      id: 'contact',
      title: 'Contact Kabir ("Let’s Build Something")',
      category: 'Direct',
      icon: Mail,
      badge: 'Get in Touch',
      action: () => onNavigate('contact'),
    },
    {
      id: 'easter-egg',
      title: 'KABIR.EXE Secret Mini-Game / Easter Egg',
      category: 'Hidden',
      icon: Sparkles,
      badge: 'Easter Egg',
      action: () => {
        if (onTriggerEasterEgg) onTriggerEasterEgg();
        onClose();
      },
    },
    {
      id: 'editor',
      title: 'Open Live Content & Fact Studio',
      category: 'Tools',
      icon: Sliders,
      badge: 'Live CMS',
      action: () => {
        handleEditorTrigger();
        onClose();
      },
    },
    {
      id: 'cursor-toggle',
      title: 'Toggle Custom Cursor (White Dot / Default Pointer)',
      category: 'Display',
      icon: MousePointer2,
      badge: 'Toggle',
      action: () => {
        playPop(650);
        window.dispatchEvent(new CustomEvent('toggle-custom-cursor'));
        onClose();
      },
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.id.toLowerCase().includes(query.toLowerCase()) ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.badge.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation inside command palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Command Modal */}
          <motion.div
            id="command-palette-modal"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-[#121216] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-900/50">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                id="command-search-input"
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to projects, achievements, marvel, contact..."
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono-code"
              />
              <span className="text-[10px] font-mono-code text-zinc-500 px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-900/40">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono-code text-zinc-500">
                  No matching sector in Kabir's portfolio. Try searching "terra", "marvel", "art", or "jarvis".
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      id={`cmd-item-${item.id}`}
                      data-interactive="true"
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800/90 text-white'
                          : 'text-zinc-300 hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? 'bg-[#ff3b30] text-white' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs sm:text-sm font-medium font-sans truncate text-zinc-200">
                            {item.title}
                          </div>
                          <div className="text-[10px] font-mono-code text-zinc-500">
                            Sector: {item.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {item.badge}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[#ff3b30]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/80 border-t border-zinc-800/80 text-[10px] font-mono-code text-zinc-500">
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>ENTER Select</span>
              </div>
              <div className="text-zinc-400 font-medium">KABIR GUREJA // PORTFOLIO OS</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
