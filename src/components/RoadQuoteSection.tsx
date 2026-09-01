import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RoadQuoteData, roadQuoteContent } from '../content/roadQuote';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RoadQuoteSectionProps {
  quote?: RoadQuoteData;
}

export default function RoadQuoteSection({ quote = roadQuoteContent }: RoadQuoteSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const focusWordRef = useRef<HTMLSpanElement>(null);
  const horizontalRulerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Split line 1 into individual words for subtle kinetic settling
  const line1Words = useMemo(() => {
    return quote.line1.split(' ');
  }, [quote.line1]);

  // Subtle entry offsets for refined micro-drift (never pushed offscreen)
  const line1Offsets = useMemo(() => {
    return [-7, 7, -5, 6, -6, 8, -5, 6];
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !line1Ref.current || !line2Ref.current) return;

      const l1WordElements = line1Ref.current.querySelectorAll<HTMLElement>('.road-word-1');
      const l2Intro = line2Ref.current.querySelector<HTMLElement>('.road-intro');
      const l2Outro = line2Ref.current.querySelector<HTMLElement>('.road-outro');

      // 1. Initial State: FULLY VISIBLE (opacity: 1) throughout the entire animation.
      l1WordElements.forEach((el, i) => {
        const xOffset = line1Offsets[i % line1Offsets.length];
        gsap.set(el, {
          y: 4,
          x: xOffset,
          opacity: 1,
          display: 'inline-block',
        });
      });

      if (l2Intro) {
        gsap.set(l2Intro, {
          y: 6,
          opacity: 1,
        });
      }

      if (focusWordRef.current) {
        gsap.set(focusWordRef.current, {
          scale: 0.98,
          opacity: 1,
        });
      }

      if (l2Outro) {
        gsap.set(l2Outro, {
          y: 4,
          opacity: 1,
        });
      }

      if (horizontalRulerRef.current) {
        gsap.set(horizontalRulerRef.current, {
          scaleX: 0.7,
          opacity: 0.45,
        });
      }

      // 2. Calibrated GSAP ScrollTrigger Pinning:
      // - pin: true with pinSpacing: true
      // - end: '+=100%' (~1 viewport height) ensures an intentional pause without screen lock
      // - scrub: 0.8 provides silky, responsive momentum tracking
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(Math.round(self.progress * 100));
          },
        },
      });

      // Phase 1 (0 -> 0.4): Words settle smoothly into crisp typographic alignment
      l1WordElements.forEach((el) => {
        tl.to(
          el,
          {
            x: 0,
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0
        );
      });

      if (l2Intro) {
        tl.to(
          l2Intro,
          {
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.05
        );
      }

      if (focusWordRef.current) {
        tl.to(
          focusWordRef.current,
          {
            scale: 1.03,
            ease: 'power2.out',
            duration: 0.45,
          },
          0.08
        );
      }

      if (l2Outro) {
        tl.to(
          l2Outro,
          {
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.12
        );
      }

      if (horizontalRulerRef.current) {
        tl.to(
          horizontalRulerRef.current,
          {
            scaleX: 1,
            opacity: 0.8,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.05
        );
      }

      // Phase 2 (0.4 -> 0.8): Clean, crystal-clear hold where the entire quote sits in high-contrast focus

      // Phase 3 (0.8 -> 1.0): Gentle elevation handing over cleanly to the clothing and products section
      tl.to(
        line1Ref.current,
        {
          y: -16,
          ease: 'power1.inOut',
          duration: 0.3,
        },
        0.7
      );

      tl.to(
        line2Ref.current,
        {
          y: -8,
          ease: 'power1.inOut',
          duration: 0.3,
        },
        0.7
      );
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [quote, line1Offsets]);

  return (
    <section
      id="road-quote"
      ref={containerRef}
      className="relative w-full min-h-[100svh] bg-[#09090b] text-zinc-100 border-b border-zinc-900 overflow-hidden select-none flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-12 box-border"
      aria-label="Kabir Gureja Autonomous Road Manifesto"
    >
      {/* Subtle Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,59,48,0.03),transparent)]" />

      {/* Real-time Scrub Progress Track (Prevents perceived lock with instant visual feedback) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-900/60 z-30">
        <div
          className="h-full bg-gradient-to-r from-[#ff3b30] to-rose-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* =========================================================================
          1. TOP EDITORIAL META HEADER
          ========================================================================= */}
      <header className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#ff3b30] font-bold text-xs tracking-widest">
            {quote.indexCode || 'REF.06 // PATHWAY'}
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-400 uppercase tracking-wider text-[11px]">
            {quote.tagline || 'AUTONOMOUS TRAJECTORY // UNPAVED'}
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md text-[10px] font-mono-code text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] animate-pulse" />
          <span className="tracking-wider uppercase">STATEMENT 02</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="text-zinc-600 font-mono-code">UNPAVED ROAD // 00° N, 00° E</span>
        </div>
      </header>

      {/* =========================================================================
          2. CENTER TYPOGRAPHY STAGE - BIG, COMMANDING WORDS FULLY VISIBLE
          ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto my-auto px-2 sm:px-6 py-4 sm:py-6">
        {/* LINE 1: “I don’t really have a single lane.” (Large, Refined Display Type) */}
        <div
          ref={line1Ref}
          className="w-full text-center mb-2 sm:mb-4 px-2 sm:px-4"
        >
          <p className="font-display font-semibold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-zinc-100 tracking-tight leading-snug max-w-4xl mx-auto drop-shadow-sm">
            “
            {line1Words.map((word, idx) => (
              <span
                key={idx}
                className="road-word-1 mx-1 sm:mx-1.5 inline-block text-zinc-100"
              >
                {word}
              </span>
            ))}
            ”
          </p>
        </div>

        {/* Minimal Architectural Divider Ruler */}
        <div
          ref={horizontalRulerRef}
          className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent mb-2 sm:mb-4 origin-center shrink-0"
        />

        {/* LINE 2: “I’d rather build my own road and see where it goes.” (Monumental Editorial Presence) */}
        <div
          ref={line2Ref}
          className="relative z-10 w-full flex flex-col items-center justify-center text-center text-zinc-100 space-y-1 sm:space-y-1.5"
        >
          {/* Part 1: "I’d rather build" */}
          <div className="road-intro overflow-visible py-0.5 w-full flex justify-center">
            <span className="block font-display font-bold text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase tracking-wider text-zinc-300 leading-tight">
              {quote.line2Intro || 'I’d rather build'}
            </span>
          </div>

          {/* Part 2: “my own road” (Monumental Editorial Focus, Giant Serif Italic) */}
          <div className="overflow-visible pt-1 w-full flex justify-center items-center">
            <span
              ref={focusWordRef}
              className="block font-serif-editorial italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] text-white leading-none tracking-tight drop-shadow-2xl origin-center"
            >
              {quote.line2Focus || 'my own road'}
            </span>
          </div>

          {/* Part 3: "and see where it goes." */}
          <div className="road-outro overflow-visible pt-1 w-full flex justify-center">
            <span className="block font-sans-alt font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-zinc-300 tracking-normal leading-relaxed">
              {quote.line2Outro || 'and see where it goes.'}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM EDITORIAL FOOTER
          ========================================================================= */}
      <footer className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-zinc-900/90 pt-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
            {quote.descriptor || 'ON CREATIVE INDEPENDENCE'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-zinc-500 font-mono-code tabular-nums">
            [{String(scrollProgress).padStart(2, '0')}%]
          </span>
        </div>
      </footer>
    </section>
  );
}
