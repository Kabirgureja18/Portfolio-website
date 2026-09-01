import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Detect touch device & listen to toggle events from Navbar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isCoarse);

    const saved = localStorage.getItem('kabir_custom_cursor');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }

    const handleToggle = () => {
      setIsEnabled((prev) => {
        const next = !prev;
        localStorage.setItem('kabir_custom_cursor', String(next));
        return next;
      });
    };

    window.addEventListener('toggle-custom-cursor', handleToggle);
    return () => window.removeEventListener('toggle-custom-cursor', handleToggle);
  }, []);

  // Toggle html class to hide standard pointer on desktop
  useEffect(() => {
    if (typeof document === 'undefined' || isTouchDevice) return;

    if (isEnabled) {
      document.documentElement.classList.add('has-custom-cursor');
    } else {
      document.documentElement.classList.remove('has-custom-cursor');
    }

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [isEnabled, isTouchDevice]);

  // Instant hardware-accelerated mouse tracking with zero lag
  useEffect(() => {
    if (typeof window === 'undefined' || isTouchDevice || !isEnabled) return;

    const dot = dotRef.current;
    if (!dot) return;

    let rafId: number | null = null;
    let mouseX = -100;
    let mouseY = -100;

    const updatePosition = () => {
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      const isInput = target?.closest(
        'input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]'
      );

      if (isInput) {
        setIsVisible(false);
        return;
      } else {
        setIsVisible(true);
      }

      const interactive = target?.closest(
        'a, button, [role="button"], [data-interactive="true"], .cursor-pointer'
      );
      setIsHovering(!!interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isEnabled, isTouchDevice, isVisible]);

  if (isTouchDevice || !isEnabled) return null;

  return (
    <div
      ref={dotRef}
      id="custom-cursor-dot"
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out flex items-center justify-center ${
          isHovering
            ? 'w-6 h-6 bg-white/20 border border-white/80 backdrop-blur-[1px] shadow-[0_0_12px_rgba(255,255,255,0.6)]'
            : isClicking
            ? 'w-2 h-2 bg-white scale-75 shadow-[0_0_6px_rgba(255,255,255,0.9)]'
            : 'w-2.5 h-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]'
        }`}
      />
    </div>
  );
}
