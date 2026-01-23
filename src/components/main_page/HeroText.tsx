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
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  const measurerRef = useRef<HTMLSpanElement>(null);

  // Measure widest word once
  useLayoutEffect(() => {
    if (!measurerRef.current) return;

    let widest = 0;
    words.forEach((word) => {
      measurerRef.current!.textContent = word;
      widest = Math.max(widest, measurerRef.current!.getBoundingClientRect().width);
    });

    setMaxWidth(widest);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLeaving(true);

      const changeTimer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsLeaving(false);
      }, 400);

      return () => clearTimeout(changeTimer);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  const currentWord = words[index];

  return (
    <>
    <p className="text-xl md:text-2xl md:text-3xl text-gray-400 mb-4 max-w-3xl leading-relaxed font-urbanist">
      Engineered just for YOUR{' '}
      <span className="inline-flex ">
         
        <span
          className="relative inline-block font-bold text-green-400"
          style={maxWidth ? { width: `${maxWidth}px` } : undefined}
        >&nbsp;
          <span
            className={`
              absolute inset-0 transition-all duration-500 ease-in-out
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
      </span>{' '}
      
    </p>
    <p className="text-xl md:text-2xl md:text-3xl text-gray-400 mb-12 max-w-3xl leading-relaxed font-urbanist">
               at the same cost as the native one…

   </p>
   </>
  );
}