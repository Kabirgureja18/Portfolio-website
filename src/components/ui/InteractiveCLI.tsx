import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Minimize2, CornerDownLeft, Sparkles, Flame } from 'lucide-react';
import { playKeyBlip, playSuccessChime } from '../../utils/soundFX';

interface InteractiveCLIProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (id: string) => void;
}

interface CommandOutput {
  id: string;
  command: string;
  response: string | string[];
  type?: 'info' | 'success' | 'warning' | 'error';
}

export default function InteractiveCLI({
  isOpen,
  onClose,
  onNavigateToSection,
}: InteractiveCLIProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'sys.connect',
      response: [
        'KABIR.OS v4.2.0-PROD (arm64-darwin)',
        'Welcome to Kabir Gureja’s interactive shell.',
        'Type "help" to view executable commands, or click the quick pills below.',
      ],
      type: 'info',
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [enteredCommands, setEnteredCommands] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playKeyBlip();
    setEnteredCommands((prev) => [...prev, cmd]);
    setCmdIndex(-1);

    const newId = `cmd-${Date.now()}`;

    switch (cmd) {
      case 'help':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'AVAILABLE COMMANDS:',
              '  whoami       → Identity profile & philosophy',
              '  manifesto    → "Some ideas stay in my head..." scroll text',
              '  road         → "I don’t really have a single lane..." scroll text',
              '  skills       → Technical stack & engineering tools',
              '  terra        → T.E.R.R.A. robotics prototype telemetry',
              '  farmverse    → FarmVerse & Agri Mitra rover telemetry',
              '  projects     → Jump directly to active engineering builds',
              '  awards       → Munish Innovation Award & MUN accolades',
              '  photo        → Editorial street photography (dedicated page coming soon)',
              '  marvel       → Comic theories & MCU universe archive',
              '  contact      → Direct email & phone/WhatsApp details',
              '  goto <sec>   → Navigate to section (about, projects, contact, etc.)',
              '  clear        → Wipe the terminal screen',
            ],
            type: 'info',
          },
        ]);
        break;

      case 'whoami':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'KABIR GUREJA // 16yo Builder, Roboticist, AI Architect & Artist',
              'Location: Delhi, India',
              'Core Philosophy: "I don’t collect hobbies. I build them."',
              'Building at the intersection of bio-robotics, local AI engines, and industrial apparel.',
            ],
            type: 'success',
          },
        ]);
        break;

      case 'skills':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'HARDWARE & ROBOTICS: Arduino, ESP32, Stepper/Servo Drivers, 3D CAD, Microfluidics',
              'SOFTWARE: React, TypeScript, Node.js, Python, Three.js, GSAP, WebGL Shaders',
              'AI / ML: Gemini API, Local LLMs (Ollama/Llama), System Prompting, Vector DBs',
              'DESIGN: Figma, Canva, Typography Craft, High-Contrast UI, Identity Systems',
            ],
            type: 'info',
          },
        ]);
        break;

      case 'terra':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'T.E.R.R.A. BIO-ROBOTICS ALGAE PHOTOBIOREACTOR:',
              '• Continuous microfluidic nutrient dosing [2.4 mL/s]',
              '• Real-time pH regulation (6.8 target) and automated LED spectrum tuning',
              '• Carbon sequestration efficiency: +14.6% relative to ambient baseline',
              '• Live Web Platform: https://terra-by-kabir.lovable.app/#contact',
              'Jumping to Projects section...',
            ],
            type: 'success',
          },
        ]);
        playSuccessChime();
        if (onNavigateToSection) onNavigateToSection('projects');
        break;

      case 'farmverse':
      case 'farmcraft':
      case 'agrimitra':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'FARMVERSE — AGRI MITRA AUTONOMOUS AI ROVER (TECHNOXIAN):',
              '• Dual-Arduino real-time architecture: Navigation MCU + Task MCU',
              '• Real-time Soil Telemetry: NPK, moisture & temp transmitted via LoRa mesh',
              '• Edge plant disease detection & computer vision guided micro-spraying',
              '• Multilingual conversational voice command interface for farmers',
              '• Live Web Platform: https://farmverse-technoxian.lovable.app/',
              'Jumping to Projects section...',
            ],
            type: 'success',
          },
        ]);
        playSuccessChime();
        if (onNavigateToSection) onNavigateToSection('projects');
        break;

      case 'manifesto':
      case 'ideas':
      case 'quote':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'TRANSFORMATION MANIFESTO // KABIR GUREJA:',
              '“Some ideas stay in my head. Mine usually end up becoming projects.”',
              'Jumping to full-screen transformation scroll section...',
            ],
            type: 'success',
          },
        ]);
        playSuccessChime();
        if (onNavigateToSection) onNavigateToSection('manifesto');
        break;

      case 'road':
      case 'lane':
      case 'pathway':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'AUTONOMOUS TRAJECTORY STATEMENT // KABIR GUREJA:',
              '“I don’t really have a single lane. I’d rather build my own road and see where it goes.”',
              'Navigating to autonomous road manifesto section...',
            ],
            type: 'success',
          },
        ]);
        playSuccessChime();
        if (onNavigateToSection) onNavigateToSection('road');
        break;

      case 'projects':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: 'Navigating to Engineering Projects...',
            type: 'success',
          },
        ]);
        playSuccessChime();
        if (onNavigateToSection) onNavigateToSection('projects');
        break;

      case 'awards':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'HONORS & RECOGNITION ARCHIVE:',
              '★ Munish Award for Innovation (Robotics & Bio-Engineering)',
              '★ Outstanding Delegate (MUN Conference Series)',
              '★ Selected Billboard Art Exhibition (Public Display)',
            ],
            type: 'success',
          },
        ]);
        if (onNavigateToSection) onNavigateToSection('achievements');
        break;

      case 'contact':
      case 'email':
      case 'phone':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'DIRECT CONTACT & INQUIRY CHANNELS // KABIR GUREJA:',
              '• Email: kabirgureja08@gmail.com',
              '• Phone / WhatsApp: +91 9826977750',
              '• Location: Indore, India',
              'Navigating to Contact section...',
            ],
            type: 'success',
          },
        ]);
        playSuccessChime();
        if (onNavigateToSection) onNavigateToSection('contact');
        break;

      case 'art':
      case 'photo':
      case 'photography':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: 'Photography is being curated for a separate dedicated visual exhibition page.',
            type: 'info',
          },
        ]);
        break;

      case 'marvel':
        setHistory((prev) => [
          ...prev,
          {
            id: newId,
            command: rawCmd,
            response: [
              'MARVEL UNIVERSE RESEARCH VAULT:',
              '• Quantum Realm Chrono-mechanics & Multiversal Incursions',
              '• Ask Kabir your most difficult MCU & comic continuity debate questions!',
            ],
            type: 'warning',
          },
        ]);
        if (onNavigateToSection) onNavigateToSection('marvel');
        break;

      case 'clear':
        setHistory([]);
        break;

      default:
        if (cmd.startsWith('goto ')) {
          const target = cmd.replace('goto ', '').trim();
          setHistory((prev) => [
            ...prev,
            {
              id: newId,
              command: rawCmd,
              response: `Teleporting to #${target}...`,
              type: 'info',
            },
          ]);
          if (onNavigateToSection) onNavigateToSection(target);
        } else {
          setHistory((prev) => [
            ...prev,
            {
              id: newId,
              command: rawCmd,
              response: `Command not found: "${rawCmd}". Type "help" for a list of available routines.`,
              type: 'error',
            },
          ]);
        }
        break;
    }

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCommands.length > 0) {
        const nextIdx = cmdIndex === -1 ? enteredCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInput(enteredCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx >= enteredCommands.length) {
          setCmdIndex(-1);
          setInput('');
        } else {
          setCmdIndex(nextIdx);
          setInput(enteredCommands[nextIdx]);
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-2xl rounded-2xl bg-[#0d0d11] border border-zinc-700/80 shadow-2xl overflow-hidden flex flex-col h-[520px] max-h-[85vh]"
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#16161c] border-b border-zinc-800 text-zinc-300">
              <div className="flex items-center gap-2 font-mono-code text-xs">
                <Terminal className="w-4 h-4 text-[#ff3b30]" />
                <span className="font-bold text-zinc-100">KABIR.OS // CLI ENGINE</span>
                <span className="text-[10px] text-zinc-500 hidden sm:inline">[tty-root]</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Suggestion Bar */}
            <div className="px-4 py-2 bg-[#121217] border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto text-[11px] font-mono-code no-scrollbar">
              <span className="text-zinc-500 uppercase tracking-wider text-[9px] shrink-0">
                PILLS:
              </span>
              {['whoami', 'skills', 'terra', 'projects', 'awards', 'marvel', 'help'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2.5 py-0.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer shrink-0 border border-zinc-700/60"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal History Log Stream */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto font-mono-code text-xs space-y-3 bg-[#0a0a0d] text-zinc-300 select-text"
            >
              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <span className="text-[#ff3b30]">kabir@os:~$</span>
                    <span className="text-zinc-200 font-semibold">{item.command}</span>
                  </div>
                  <div
                    className={`pl-4 border-l-2 ${
                      item.type === 'success'
                        ? 'border-emerald-500 text-emerald-300'
                        : item.type === 'warning'
                        ? 'border-amber-500 text-amber-300'
                        : item.type === 'error'
                        ? 'border-red-500 text-red-400'
                        : 'border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {Array.isArray(item.response) ? (
                      item.response.map((line, idx) => (
                        <div key={idx} className="leading-relaxed">
                          {line}
                        </div>
                      ))
                    ) : (
                      <div className="leading-relaxed">{item.response}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Prompt Box */}
            <div className="p-3 bg-[#14141a] border-t border-zinc-800 flex items-center gap-2">
              <span className="font-mono-code text-xs text-[#ff3b30] shrink-0 font-bold">
                kabir@os:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help' or any command..."
                className="flex-1 bg-transparent border-none outline-none font-mono-code text-xs text-zinc-100 placeholder-zinc-600"
              />
              <button
                onClick={() => executeCommand(input)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5 text-[#ff3b30]" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
