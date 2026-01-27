import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const words = [
  "ELISA kits",
  "Western blots",
  "immunohistochemistry",
  "hydrogels",
  "waste-water treatment",
] as const;

export default function HeroText() {
  const [index, setIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const measurerRef = useRef<HTMLSpanElement>(null);

  // Measure current word width
  useLayoutEffect(() => {
    if (!measurerRef.current) return;
    measurerRef.current.textContent = words[index];
    setCurrentWidth(measurerRef.current.getBoundingClientRect().width);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLeaving(true);
      const changeTimer = setTimeout(() => {
        // First update the width (creating the gap)
        if (measurerRef.current) {
          const nextIndex = (index + 1) % words.length;
          measurerRef.current.textContent = words[nextIndex];
          setCurrentWidth(measurerRef.current.getBoundingClientRect().width);
        }
        
        // Then update the index and show the new word after a small delay
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          setIsLeaving(false);
        }, 100);
      }, 400);
      return () => clearTimeout(changeTimer);
    }, 2400);
    return () => clearInterval(interval);
  }, [index]);

  const currentWord = words[index];

  return (
    <p className="text-xl md:text-2xl md:text-3xl text-gray-400 mb-12 leading-relaxed font-urbanist">
      engineered just for YOUR{' '}
      <span className="inline-flex items-baseline">
        <span
          className="relative inline-block font-bold text-green-400 transition-all duration-500"
          style={{ width: `${currentWidth}px` }}
        >
          <span
            className={`
              transition-all duration-500 ease-in-out whitespace-nowrap
              ${isLeaving ? 'opacity-0 scale-95 translate-y-0.5' : 'opacity-100 scale-100 translate-y-0'}
            `}
          >
            {currentWord}
          </span>
          {/* Invisible measurer */}
          <span
            ref={measurerRef}
            className="invisible absolute whitespace-nowrap pointer-events-none"
            aria-hidden="true"
          />
        </span>
        <span className="ml-1">at the same cost as the native one…</span>
      </span>
    </p>
  );
}