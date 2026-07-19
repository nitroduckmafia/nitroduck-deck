import type { CSSProperties, ReactNode } from 'react';

interface HeadlineProps {
  pre?: ReactNode;
  accent?: ReactNode;
  post?: ReactNode;
  level?: 'hero' | 'h1' | 'h2';
  style?: CSSProperties;
}

/** Display headline: `pre` + gold-italic `accent` + `post`. `level` = hero | h1 | h2. */
export function Headline({ pre, accent, post, level = 'h1', style = {} }: HeadlineProps) {
  const size =
    level === 'hero' ? 'var(--nd-fs-hero)' : level === 'h2' ? 'var(--nd-fs-h2)' : 'var(--nd-fs-h1)';
  return (
    <h2
      style={{
        fontFamily: 'var(--nd-font-display)',
        fontWeight: 600,
        fontSize: size,
        lineHeight: 'var(--nd-lh-tight)',
        letterSpacing: 0,
        color: 'var(--nd-text)',
        margin: 0,
        textWrap: 'balance',
        ...style,
      }}
    >
      {pre}
      {accent ? <span style={{ color: 'var(--nd-gold)', fontStyle: 'italic' }}>{accent}</span> : null}
      {post}
    </h2>
  );
}
