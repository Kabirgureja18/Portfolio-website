import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

interface GlitchShaderOverlayProps {
  triggerGlitch?: boolean;
}

export default function GlitchShaderOverlay({ triggerGlitch }: GlitchShaderOverlayProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (triggerGlitch) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 600);
      return () => clearTimeout(timer);
    }
  }, [triggerGlitch]);

  // Occasional subtle organic micro-glitch (rarely, 1 frame)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 120);
      }
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Permanent Fine Grain & Scanline Canvas Texture */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.025] mix-blend-screen bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Dynamic Glitch Distortion Shader Overlay */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[99990] overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-color-dodge animate-pulse" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(0,0,0,0.4)_2px,transparent_2px,transparent_4px)]" />
            <div
              className="absolute inset-0 backdrop-invert opacity-20"
              style={{
                clipPath: 'polygon(0 20%, 100% 20%, 100% 28%, 0 28%)',
                transform: 'translateX(8px)',
              }}
            />
            <div
              className="absolute inset-0 backdrop-invert opacity-25"
              style={{
                clipPath: 'polygon(0 65%, 100% 65%, 100% 72%, 0 72%)',
                transform: 'translateX(-10px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
