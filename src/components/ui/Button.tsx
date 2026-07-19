import { useState } from 'react';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  href?: string;
  /** Anchor target (e.g. "_blank") when rendered as a link. */
  target?: string;
  /** Anchor rel (e.g. "noopener noreferrer") when rendered as a link. */
  rel?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  style?: CSSProperties;
}

/** Gold pill (primary) or hairline pill (ghost). Renders an <a> when `href` is set. */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  onClick,
  children,
  style = {},
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const big = size === 'lg';
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--nd-font-body)',
    fontWeight: 600,
    fontSize: big ? 14 : 13,
    letterSpacing: '.02em',
    lineHeight: 1,
    borderRadius: 'var(--nd-radius-pill)',
    padding: big ? '13px 26px' : '10px 20px',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background .2s, border-color .2s, color .2s, transform .2s',
    transform: hover ? 'translateY(-1px)' : 'none',
    ...style,
  };
  const vs: CSSProperties =
    variant === 'primary'
      ? {
          background: hover ? '#C0912F' : 'var(--nd-gold)',
          color: 'var(--nd-accent-ink)',
          border: '1.5px solid transparent',
        }
      : {
          background: 'transparent',
          color: hover ? 'var(--nd-gold)' : 'var(--nd-text)',
          border: `1.5px solid ${hover ? 'var(--nd-gold)' : 'var(--nd-hairline)'}`,
        };
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ ...base, ...vs }}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ ...base, ...vs }}
    >
      {children}
    </button>
  );
}
