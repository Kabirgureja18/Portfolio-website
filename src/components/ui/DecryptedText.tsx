import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: 'hover' | 'view' | 'both';
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#*/<>[]{}';

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_CHARS,
  className = '',
  parentClassName = '',
  animateOn = 'hover',
  tag = 'span',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const charPool = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).join('')
    : characters;

  const getRandomChar = () => {
    return charPool[Math.floor(Math.random() * charPool.length)] || '*';
  };

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const totalLength = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            let shouldReveal = false;
            if (sequential) {
              if (revealDirection === 'start') {
                shouldReveal = index < (iteration / maxIterations) * totalLength;
              } else if (revealDirection === 'end') {
                shouldReveal = totalLength - index < (iteration / maxIterations) * totalLength;
              } else {
                const mid = totalLength / 2;
                const dist = Math.abs(index - mid);
                shouldReveal = dist > mid - (iteration / maxIterations) * mid;
              }
            } else {
              shouldReveal = iteration >= maxIterations;
            }

            if (shouldReveal) {
              return char;
            }
            return getRandomChar();
          })
          .join('');
      });

      iteration += 1;

      if (iteration > maxIterations + totalLength) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  useEffect(() => {
    if (animateOn === 'view' || animateOn === 'both') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scramble();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [animateOn, text]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (animateOn === 'hover' || animateOn === 'both') {
      scramble();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const Component = tag as any;

  return (
    <Component
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none cursor-default ${parentClassName}`}
    >
      <span className={className}>{displayText}</span>
    </Component>
  );
}
