import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Sparkles, CheckCircle2, ShieldCheck, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MiniGameEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MiniGameEasterEgg({ isOpen, onClose }: MiniGameEasterEggProps) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '====================================================',
    ' KABIR.EXE // SECRET ARTIFACT DISCOVERY TERMINAL',
    '====================================================',
    'Type "help" to see available discovery commands.',
    'Objective: Discover all 4 hidden Easter eggs in Kabir’s lab.',
  ]);

  const [discovered, setDiscovered] = useState<{ [key: string]: boolean }>({
    terraCore: false,
    marvelTheory: false,
    tabOverload: false,
    secretRevenue: false,
  });

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLogs = [...logs, `> ${input}`];

    if (cmd === 'help') {
      newLogs.push(
        'AVAILABLE COMMANDS:',
        '  scan          - Scan memory for undiscovered lab artifacts',
        '  terra-core    - Inspect bio-algae robotic firmware node',
        '  marvel-theory - Extract classified Kang multiverse paradox file',
        '  tabs          - Inspect Kabir’s perpetual 64+ browser tab cache',
        '  revenue       - Check verifiable ₹27,500 milestone ledger',
        '  confetti      - Trigger celebratory particle surge',
        '  clear         - Clear terminal screen'
      );
    } else if (cmd === 'scan') {
      const remaining = Object.values(discovered).filter((v) => !v).length;
      newLogs.push(
        `[SCAN_RESULTS] Artifacts discovered: ${4 - remaining}/4.`,
        remaining > 0
          ? `Try exploring: ${!discovered.terraCore ? 'terra-core ' : ''}${!discovered.marvelTheory ? 'marvel-theory ' : ''}${!discovered.tabOverload ? 'tabs ' : ''}${!discovered.secretRevenue ? 'revenue ' : ''}`
          : '🌟 ALL 4 ARTIFACTS UNLOCKED! KABIR.EXE MASTER DISCOVERER ACHIEVED!'
      );
    } else if (cmd === 'terra-core') {
      setDiscovered((prev) => ({ ...prev, terraCore: true }));
      newLogs.push(
        '🌱 [UNLOCKED #1: T.E.R.R.A. CORE KEY]',
        'Robotic Algae Dispersal Protocol verified: Cyanobacteria consortia seeded.'
      );
      triggerConfetti();
    } else if (cmd === 'marvel-theory') {
      setDiscovered((prev) => ({ ...prev, marvelTheory: true }));
      newLogs.push(
        '🛡️ [UNLOCKED #2: MULTIVERSE PARADOX]',
        'Secret file: "Tony Stark’s nanotech was quantum-entangled with Pym particles in 2023."'
      );
      triggerConfetti();
    } else if (cmd === 'tabs') {
      setDiscovered((prev) => ({ ...prev, tabOverload: true }));
      newLogs.push(
        '📑 [UNLOCKED #3: TAB OVERFLOW]',
        'Memory leak averted: 64 active tabs contain 12 hardware datasheets and 8 CAD drawings.'
      );
      triggerConfetti();
    } else if (cmd === 'revenue') {
      setDiscovered((prev) => ({ ...prev, secretRevenue: true }));
      newLogs.push(
        '💰 [UNLOCKED #4: THE FIRST ₹27,500]',
        'Commercial ledger: 100% verified independent revenue through student websites & hustle.'
      );
      triggerConfetti();
    } else if (cmd === 'confetti') {
      newLogs.push('🎉 Bursting celebratory particles!');
      triggerConfetti();
    } else if (cmd === 'clear') {
      setLogs(['Terminal cleared. Type "help" for commands.']);
      setInput('');
      return;
    } else {
      newLogs.push(`Command not recognized: "${cmd}". Type "help" for valid commands.`);
    }

    setLogs(newLogs);
    setInput('');
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  const score = Object.values(discovered).filter(Boolean).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#090d0b] border-2 border-emerald-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d1612] border-b border-emerald-800/60 text-xs font-mono-code text-emerald-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-zinc-100">KABIR.EXE // SECRET MINI-GAME</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                UNLOCKED: {score}/4
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-emerald-950"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Artifact Progress Bar */}
          <div className="p-3 bg-emerald-950/40 border-b border-emerald-900/60 flex items-center justify-around text-xs font-mono-code">
            <span className={discovered.terraCore ? 'text-emerald-400' : 'text-zinc-500'}>
              🌱 T.E.R.R.A. {discovered.terraCore ? '✓' : '○'}
            </span>
            <span className={discovered.marvelTheory ? 'text-red-400' : 'text-zinc-500'}>
              🛡️ MARVEL {discovered.marvelTheory ? '✓' : '○'}
            </span>
            <span className={discovered.tabOverload ? 'text-amber-400' : 'text-zinc-500'}>
              📑 TABS {discovered.tabOverload ? '✓' : '○'}
            </span>
            <span className={discovered.secretRevenue ? 'text-teal-400' : 'text-zinc-500'}>
              💰 ₹27.5K {discovered.secretRevenue ? '✓' : '○'}
            </span>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 overflow-y-auto font-mono-code text-xs text-emerald-300 space-y-1.5 min-h-[260px] max-h-[360px] bg-[#070b09]">
            {logs.map((log, idx) => (
              <div key={idx} className={log.startsWith('>') ? 'text-white font-bold' : ''}>
                {log}
              </div>
            ))}
          </div>

          {/* Command Prompt */}
          <form
            onSubmit={handleCommand}
            className="p-3 bg-[#0d1612] border-t border-emerald-800/60 flex items-center gap-2"
          >
            <span className="text-emerald-400 font-mono-code text-sm font-bold">&gt;</span>
            <input
              id="easter-egg-input"
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'scan', 'terra-core', 'marvel-theory', 'tabs', 'revenue'..."
              className="flex-1 bg-transparent text-xs font-mono-code text-emerald-100 placeholder-emerald-800 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-mono-code text-xs font-bold transition-colors cursor-pointer"
            >
              EXECUTE
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
