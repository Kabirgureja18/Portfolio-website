import { useState } from 'react';
import { motion } from 'motion/react';

interface VelocityMarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
}

export default function VelocityMarquee({
  items,
  speed = 25,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  itemClassName = '',
}: VelocityMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items 4 times to guarantee seamless wrapping
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      className={`overflow-hidden whitespace-nowrap flex w-full select-none py-3 ${className}`}
    >
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
        className="flex shrink-0 items-center gap-8"
      >
        {repeatedItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 text-xs sm:text-sm font-mono-code uppercase tracking-wider text-zinc-400 ${itemClassName}`}
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] opacity-60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
