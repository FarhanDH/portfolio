import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  // Split text manually
  const words = text.split(' ');

  useGSAP(() => {
    if (!containerRef.current || animated) return;

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    // Target elements to animate (either chars or words)
    const targets = containerRef.current.querySelectorAll(
      splitType.includes('chars') ? '.split-char' : '.split-word'
    );

    if (targets.length === 0) return;

    gsap.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
          fastScrollEnd: true,
        },
        onComplete: () => {
          setAnimated(true);
          onLetterAnimationComplete?.();
        },
        willChange: 'transform, opacity',
        force3D: true
      }
    );
  }, {
    dependencies: [text, delay, duration, ease, splitType, threshold, rootMargin],
    scope: containerRef
  });

  const Tag = (tag || 'p') as any;

  return (
    <Tag
      ref={containerRef}
      style={{ textAlign, wordWrap: 'break-word' }}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
    >
      {words.map((word, wordIdx) => {
        const isLastWord = wordIdx === words.length - 1;
        if (splitType.includes('chars')) {
          const chars = Array.from(word);
          return (
            <span key={wordIdx} className="split-word inline-block whitespace-nowrap">
              {chars.map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="split-char inline-block"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {char}
                </span>
              ))}
              {!isLastWord && <span className="split-char inline-block">&nbsp;</span>}
            </span>
          );
        } else {
          return (
            <span key={wordIdx} className="split-word inline-block whitespace-nowrap">
              <span style={{ willChange: 'transform, opacity' }} className="split-word inline-block">
                {word}
              </span>
              {!isLastWord && <span className="inline-block">&nbsp;</span>}
            </span>
          );
        }
      })}
    </Tag>
  );
};

export default SplitText;
