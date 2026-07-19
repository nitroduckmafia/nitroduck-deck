import type { CSSProperties } from 'react';

interface LogoProps {
  size?: number;
  wordmark?: boolean;
  tone?: 'dark' | 'paper';
  /** Path to the green "N" mark asset — never recolored or redrawn. */
  src?: string;
  style?: CSSProperties;
}

/** Nitroduck lockup — the green "N" mark on a cream chip + optional Literata wordmark. */
export function Logo({
  size = 30,
  wordmark = true,
  tone = 'dark',
  src = 'assets/mark.png',
  style = {},
}: LogoProps) {
  const chip = Math.round(size);
  const glyph = Math.round(size * 0.66);
  const dark = tone !== 'paper';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(size * 0.4), ...style }}>
      <span
        style={{
          display: 'inline-grid',
          placeItems: 'center',
          width: chip,
          height: chip,
          borderRadius: Math.max(6, Math.round(size * 0.27)),
          background: 'var(--nd-cream)',
          flex: 'none',
        }}
      >
        <img
          src={src}
          alt="Nitroduck"
          style={{ width: glyph, height: glyph, objectFit: 'contain', display: 'block' }}
        />
      </span>
      {wordmark ? (
        <span
          style={{
            fontFamily: 'var(--nd-font-display)',
            fontWeight: 600,
            fontSize: Math.round(size * 0.78),
            letterSpacing: '-.005em',
            color: dark ? 'var(--nd-text)' : 'var(--nd-ink)',
          }}
        >
          Nitroduck
        </span>
      ) : null}
    </span>
  );
}
