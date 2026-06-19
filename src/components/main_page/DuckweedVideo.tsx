// DuckweedVideo.tsx — autoplaying, looping duckweed timelapse for the "Grown in
// duckweed" pillar. Muted autoplay is allowed by browsers, but offscreen/background
// throttling can pause it; an IntersectionObserver re-plays it whenever it scrolls
// into view, and we retry on `canplay` so it starts reliably.

import { useEffect, useRef } from 'react';

export function DuckweedVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // ensure the property is set so autoplay is permitted
    const play = () => { void v.play().catch(() => {}); };

    play();
    v.addEventListener('canplay', play);

    // resume if the browser throttled playback while the card was offscreen
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) play(); }),
      { threshold: 0.1 }
    );
    io.observe(v);

    return () => {
      v.removeEventListener('canplay', play);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      src="/images/duckweed-timelapse.mp4"
      poster="/images/duckweed-08409.jpg"
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-label="Duckweed timelapse"
    />
  );
}
