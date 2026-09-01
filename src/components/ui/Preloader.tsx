import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const STATUS_LINES = [
  'INITIALIZING CORE...',
  'HANDSHAKING NETWORK...',
  'VERIFYING ASSETS...',
  'MOUNTING INTERFACE...',
  'RESOLVING DEPENDENCIES...',
  'FINALIZING SESSION...',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState('0%');
  const [visibleCount, setVisibleCount] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Check if user already saw preloader in this session
    const hasSeen = sessionStorage.getItem('kabir_preloader_seen');
    if (hasSeen === 'true') {
      setIsRemoved(true);
      if (onComplete) onComplete();
      return;
    }

    const DURATION = 2500;
    const EXIT_DELAY = 180;
    const EXIT_DURATION = 650;
    const totalLines = STATUS_LINES.length;

    const start = performance.now();
    let animationFrameId: number;

    const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = clamp(elapsed / DURATION, 0, 1);

      const value = Math.min(100, Math.floor(t * 100));
      setPercent(value + '%');

      const count = Math.min(
        totalLines,
        Math.floor(t * totalLines * 1.08) + 1
      );
      setVisibleCount(count);
      setActiveIdx(Math.min(count - 1, totalLines - 1));

      if (t < 1) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      setPercent('100%');

      setTimeout(() => {
        setIsDone(true);
        sessionStorage.setItem('kabir_preloader_seen', 'true');

        setTimeout(() => {
          setIsRemoved(true);
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, EXIT_DURATION);
      }, EXIT_DELAY);
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`motion-loader ${isDone ? 'is-done' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        width: '100vw',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
        transition: 'opacity .65s cubic-bezier(.76,0,.24,1)',
        opacity: isDone ? 0 : 1,
        pointerEvents: isDone ? 'none' : 'auto',
      }}
    >
      <div className="loader-inner" style={{ position: 'absolute', inset: 0 }}>
        {/* Left status stack */}
        <div
          className="status-stack"
          style={{
            position: 'absolute',
            left: '2.05vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '220px',
            fontSize: 'clamp(6px, .54vw, 10px)',
            lineHeight: 1.55,
            fontWeight: 400,
            letterSpacing: '.02em',
            textTransform: 'uppercase',
            fontFamily: '"IBM Plex Mono", "JetBrains Mono", "Courier New", monospace',
          }}
        >
          {STATUS_LINES.map((text, idx) => {
            const isVisible = idx < visibleCount;
            const isActive = idx === activeIdx;
            return (
              <div
                key={text}
                style={{
                  height: '1.55em',
                  color: isActive ? '#f01932' : '#777',
                  whiteSpace: 'nowrap',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(2px)',
                  transition: 'opacity .18s ease, transform .18s ease, color .18s ease',
                }}
              >
                {text}
              </div>
            );
          })}
        </div>

        {/* Center percentage */}
        <div
          className="percent-indicator"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#f01932',
            fontFamily: '"IBM Plex Mono", "JetBrains Mono", "Courier New", monospace',
            fontSize: 'clamp(28px, 2.55vw, 49px)',
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '.04em',
            whiteSpace: 'nowrap',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          ( {percent} )
        </div>

        {/* Right paragraph */}
        <div
          className="message-paragraph"
          style={{
            position: 'absolute',
            right: '2.05vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '170px',
            color: '#bcbcbc',
            fontSize: 'clamp(6px, .54vw, 10px)',
            lineHeight: 1.45,
            fontWeight: 400,
            letterSpacing: '.01em',
            textTransform: 'uppercase',
            fontFamily: '"IBM Plex Mono", "JetBrains Mono", "Courier New", monospace',
          }}
        >
          HANG TIGHT, EXPLORER. THE DATA TRANSFER IS IN PROGRESS. IT MIGHT TAKE A MOMENT, BUT THE JOURNEY AHEAD IS WORTH THE WAIT...
        </div>

        {/* Small cursor-like mark */}
        <div
          className="mark-dot"
          style={{
            position: 'absolute',
            right: '24.4vw',
            top: '37.2%',
            width: '2px',
            height: '2px',
            background: '#fff',
            opacity: 0.85,
          }}
        />
      </div>

      <style>{`
        @media(max-width: 700px) {
          .status-stack {
            left: 4vw !important;
            width: 30vw !important;
          }
          .message-paragraph {
            right: 4vw !important;
            width: 27vw !important;
          }
          .percent-indicator {
            font-size: 7vw !important;
          }
          .mark-dot {
            right: 24vw !important;
          }
        }
      `}</style>
    </div>
  );
}


