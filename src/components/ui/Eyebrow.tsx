import type { CSSProperties, ReactNode } from 'react';

interface EyebrowProps {
  children?: ReactNode;
  style?: CSSProperties;
}

/** Uppercase mono kicker in bright pollen-gold. */
export function Eyebrow({ children, style = {} }: EyebrowProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--nd-font-mono)',
        fontWeight: 500,
        fontSize: 'var(--nd-fs-eyebrow)',
        letterSpacing: 'var(--nd-tracking-eyebrow)',
        textTransform: 'uppercase',
        color: 'var(--nd-gold-bright)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
