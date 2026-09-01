import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BounceCards.css';

export default function BounceCards({
  className = '',
  images = [],
  items = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.3,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(-12deg) translate(-210px, 10px)',
    'rotate(-6deg) translate(-125px, -6px)',
    'rotate(-2deg) translate(-40px, 4px)',
    'rotate(3deg) translate(45px, -8px)',
    'rotate(8deg) translate(130px, 8px)',
    'rotate(14deg) translate(215px, -4px)',
    'rotate(-8deg) translate(-80px, 20px)',
    'rotate(8deg) translate(80px, 20px)'
  ],
  enableHover = true,
  onCardClick
}) {
  const containerRef = useRef(null);

  // Normalize cards: use items if provided, else convert images
  const cardList = items.length > 0 ? items : images.map((img, i) => ({ image: img, id: `card-${i}` }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay, cardList.length]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    cardList.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          scale: 1.08,
          zIndex: 40,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      } else {
        const offsetX = i < hoveredIdx ? -150 : 150;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.04;

        gsap.to(target, {
          transform: pushedTransform,
          scale: 0.95,
          zIndex: 10,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto'
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    cardList.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      const baseTransform = transformStyles[i] || 'none';
      gsap.to(target, {
        transform: baseTransform,
        scale: 1,
        zIndex: 1,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
        height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight
      }}
    >
      {cardList.map((card, idx) => {
        const imageSrc = card.image || card.previewImage || (typeof card === 'string' ? card : '');
        return (
          <div
            key={card.id || idx}
            className={`card card-${idx} cursor-pointer group`}
            style={{
              transform: transformStyles[idx] ?? 'none'
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
            onClick={() => {
              if (onCardClick) onCardClick(card, idx);
              else if (card.onClick) card.onClick();
            }}
          >
            {imageSrc ? (
              <img className="image" src={imageSrc} alt={card.title || `card-${idx}`} />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col justify-end p-4">
                <span className="text-xs font-mono text-zinc-400 uppercase">{card.category}</span>
                <span className="text-sm font-bold text-white">{card.title}</span>
              </div>
            )}

            {/* Overlay label if title provided */}
            {card.title && (
              <div className="card-label-overlay">
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{card.category || 'PROJECT'}</div>
                <div className="text-sm font-bold text-white leading-tight mt-0.5">{card.title}</div>
                <div className="text-[11px] text-zinc-300 line-clamp-1 mt-1 font-mono">{card.subtitle || 'Click to expand'}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
