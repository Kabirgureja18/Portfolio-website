import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FunFactItem } from '../types';
import { Sparkles, X, Terminal } from 'lucide-react';

interface FunFactNotificationProps {
  facts: FunFactItem[];
  onTriggerEasterEgg?: () => void;
}

export default function FunFactNotification({
  facts,
  onTriggerEasterEgg,
}: FunFactNotificationProps) {
  const [currentFact, setCurrentFact] = useState<FunFactItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (!facts || facts.length === 0) return;

    // Show initial fact after 4 seconds
    const initialTimer = setTimeout(() => {
      setCurrentFact(facts[0]);
      setIsVisible(true);
    }, 4000);

    // Periodic rotator every 25 seconds
    const interval = setInterval(() => {
      if (!hasInteracted) {
        setFactIndex((prev) => {
          const nextIdx = (prev + 1) % facts.length;
          setCurrentFact(facts[nextIdx]);
          return nextIdx;
        });
        setIsVisible(true);
      }
    }, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [facts, hasInteracted]);

  const handleNextFact = () => {
    if (!facts || facts.length === 0) return;
    const nextIdx = (factIndex + 1) % facts.length;
    setFactIndex(nextIdx);
    setCurrentFact(facts[nextIdx]);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  return (
    <AnimatePresence>
      {isVisible && currentFact && (
        <motion.div
          id="fun-fact-toast"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 right-4 z-40 w-[260px] sm:w-[280px] p-3 rounded-xl border border-zinc-800 bg-[#121216]/95 backdrop-blur-xl shadow-xl space-y-1.5 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] animate-pulse" />
              <span className="text-[9px] font-mono-code uppercase font-bold text-zinc-300 tracking-wider">
                {currentFact.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                id="btn-dismiss-fun-fact"
                onClick={handleDismiss}
                className="p-0.5 rounded text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          <p className="text-[11px] font-sans text-zinc-300 leading-relaxed">
            {currentFact.fact}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 text-[9px] font-mono-code text-zinc-400">
            <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[8.5px]">
              #{currentFact.tag}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleNextFact}
                className="text-zinc-400 hover:text-zinc-200 underline cursor-pointer"
              >
                Next ↻
              </button>
              {onTriggerEasterEgg && (
                <button
                  onClick={() => {
                    handleDismiss();
                    onTriggerEasterEgg();
                  }}
                  className="text-[#ff3b30] hover:underline cursor-pointer font-semibold"
                >
                  KABIR.EXE →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
