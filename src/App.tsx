import { useMemo, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { DuckweedVideo } from './components/main_page/DuckweedVideo';
import { PollenField } from './components/ui/PollenField';
import { Headline } from './components/ui/Headline';
import { Eyebrow } from './components/ui/Eyebrow';
import { Button } from './components/ui/Button';
import { Logo } from './components/ui/Logo';

const BOOK_URL = 'https://calendar.app.google/waauJ9rnj6JhZmSt9';
const MAIL_URL = 'mailto:mafia@nitroduck.tech';
const LINKEDIN_URL = 'https://www.linkedin.com/company/nitroduck-tech/';
const MARK_SRC = '/images/nitroduck_5.png';

// Duckweed Mafia — the 3 founders. Order matters (see design handoff).
// NOTE: Matúš's photo file is team/jonas.jpg (carried over from the current site).
const members = [
  {
    name: 'Matej Zámečník',
    role: 'Co-Founder & CEO',
    img: '/images/team/matej.jpg',
    email: 'matej@nitroduck.tech',
    linkedin: 'https://www.linkedin.com/in/matejzamecnik/',
  },
  {
    name: 'Matúš Grieš',
    role: 'Co-Founder & CTO',
    img: '/images/team/jonas.jpg',
    email: 'matus@nitroduck.tech',
    linkedin: 'https://www.linkedin.com/in/mat%C3%BA%C5%A1-grie%C5%A1-45b655202/',
  },
  {
    name: 'Miroslav Rosputinský',
    role: 'Co-Founder & CSO',
    img: '/images/team/miro.jpg',
    email: 'miro@nitroduck.tech',
    linkedin: 'https://www.linkedin.com/in/miroslav-rosputinsk%C3%BD-23b759307/',
  },
];

const GUTTER_X = '0 var(--nd-gutter)';

// ── Arcball (virtual trackball) ─────────────────────────────────────────────
// Drag anywhere in the hero to tumble the flock in 3D: through the centre pitches
// and yaws it in depth, an arc near the edge rolls it. Orientation is kept as a
// quaternion so rotations about every axis compose correctly, in any order.
type Vec3 = [number, number, number];
type Quat = [number, number, number, number]; // x, y, z, w
const qNorm = (q: Quat): Quat => {
  const l = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / l, q[1] / l, q[2] / l, q[3] / l];
};
const qMul = (a: Quat, b: Quat): Quat => [
  a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
  a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
  a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
  a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
];
// Shortest-arc rotation carrying unit vector a onto unit vector b.
const qBetween = (a: Vec3, b: Vec3): Quat =>
  qNorm([
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
    1 + a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  ]);
// Map a pointer onto the virtual sphere (falls to the rim outside the unit circle).
const arcballVec = (clientX: number, clientY: number, rect: DOMRect): Vec3 => {
  const rad = Math.min(rect.width, rect.height) / 2;
  const x = (clientX - (rect.left + rect.width / 2)) / rad;
  const y = -(clientY - (rect.top + rect.height / 2)) / rad; // screen-y is down; flip to math-y
  const d2 = x * x + y * y;
  if (d2 <= 1) return [x, y, Math.sqrt(1 - d2)];
  const inv = 1 / Math.sqrt(d2);
  return [x * inv, y * inv, 0];
};

function App() {
  // Grab-to-tumble pollen: press anywhere in the hero and drag to rotate the whole
  // 3D flock (all axes) — and it stays where you let go. Orientation lives in a ref
  // as a quaternion; the canvas reads it each frame, so a drag never re-renders React.
  const heroRef = useRef<HTMLElement>(null);
  const qRef = useRef<Quat>([0, 0, 0, 1]); // current orientation
  const qStartRef = useRef<Quat>([0, 0, 0, 1]); // orientation at grab
  const startVecRef = useRef<Vec3>([0, 0, 1]); // sphere point under the cursor at grab
  const draggingRef = useRef(false);

  const reducedMotion = useMemo(
    () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  // Fewer grains on small screens (lighter canvas loop).
  const pollenDensity = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.62 : 1.15),
    []
  );

  const grabPollen = (e: ReactPointerEvent<HTMLElement>) => {
    // Touch keeps native scrolling; steering is a mouse/pen gesture. Real controls win.
    if (reducedMotion || e.pointerType === 'touch') return;
    if ((e.target as HTMLElement).closest('a, button')) return;
    draggingRef.current = true;
    qStartRef.current = qRef.current;
    startVecRef.current = arcballVec(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    e.currentTarget.setPointerCapture?.(e.pointerId);
    if (heroRef.current) heroRef.current.style.cursor = 'grabbing';
  };
  const turnPollen = (e: ReactPointerEvent<HTMLElement>) => {
    if (!draggingRef.current) return;
    const cur = arcballVec(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    // Total rotation from grab point to now, composed onto the grab orientation
    // (world-frame pre-multiply) so the point under the cursor tracks the cursor.
    // The canvas render loop picks this up on the next frame.
    qRef.current = qNorm(qMul(qBetween(startVecRef.current, cur), qStartRef.current));
  };
  const releasePollen = (e: ReactPointerEvent<HTMLElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    if (heroRef.current) heroRef.current.style.cursor = 'grab';
  };

  return (
    <div
      style={{
        background: 'var(--nd-bg)',
        color: 'var(--nd-text)',
        fontFamily: 'var(--nd-font-body)',
        minHeight: '100vh',
      }}
    >
      {/* ── Sticky nav ─────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(32,42,23,.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: GUTTER_X,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo size={28} src={MARK_SRC} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <a href="#team" className="nd-navlink">
              Team
            </a>
            <Button href={BOOK_URL} target="_blank" rel="noopener noreferrer">
              Book a call
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="nd-hero"
          onPointerDown={grabPollen}
          onPointerMove={turnPollen}
          onPointerUp={releasePollen}
          onPointerCancel={releasePollen}
          style={{
            cursor: reducedMotion ? 'default' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {/* Volumetric pollen flock (canvas). Fills the hero; its 3D orientation is
              driven by the arcball handlers above via qRef, read on each frame. */}
          <PollenField
            orientationRef={qRef}
            reducedMotion={reducedMotion}
            density={pollenDensity}
          />
          {/* Left protection scrim — keeps the headline legible over the motif. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background:
                'linear-gradient(90deg, rgba(32,42,23,.96), rgba(32,42,23,.62) 44%, rgba(32,42,23,.12) 74%, transparent)',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 1120,
              margin: '0 auto',
              padding: GUTTER_X,
              width: '100%',
            }}
          >
            <div style={{ maxWidth: 660 }}>
              <div className="nd-in">
                <Headline level="hero" pre="We make every crop " accent="editable." />
              </div>
            </div>
          </div>
        </section>

        {/* ── Proof band (video + CTA) — one full window ───────── */}
        <section className="nd-proof">
          {/* 3a — video banner */}
          <div className="nd-video-band">
            <div style={{ position: 'absolute', inset: 0 }}>
              <DuckweedVideo />
            </div>
            {/* Left scrim */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(23,31,15,.95), rgba(23,31,15,.6) 46%, rgba(23,31,15,.08) 82%)',
              }}
            />
            {/* Top blend — melts the hero color into the video */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 300,
                zIndex: 1,
                background: 'linear-gradient(to bottom, var(--nd-bg), transparent)',
              }}
            />
            {/* Bottom blend — melts the video into the band below */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 360,
                zIndex: 1,
                background: 'linear-gradient(to top, var(--nd-bg-deep), transparent)',
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                maxWidth: 1120,
                margin: '0 auto',
                padding: '0 var(--nd-gutter) 96px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <Headline level="h1" pre="The fastest growing one " accent="already is." />
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: 'var(--nd-text-soft)',
                    margin: '20px 0 0',
                    maxWidth: 520,
                  }}
                >
                  We made duckweed <span style={{ fontFamily: 'var(--nd-font-mono)' }}>5×</span> faster
                  to engineer — and won the Grand Prize at the iGEM competition with it.
                </p>
              </div>
            </div>
          </div>

          {/* 3b — CTA */}
          <div
            style={{
              maxWidth: 1120,
              margin: '0 auto',
              padding: '56px var(--nd-gutter) 72px',
              textAlign: 'center',
            }}
          >
            <Headline level="h2" pre="Want your crop " accent="editable?" />
            <div
              style={{
                display: 'flex',
                gap: 14,
                justifyContent: 'center',
                marginTop: 26,
                flexWrap: 'wrap',
              }}
            >
              <Button size="lg" href={BOOK_URL} target="_blank" rel="noopener noreferrer">
                Book a call
              </Button>
              <Button variant="ghost" size="lg" href={MAIL_URL}>
                Email us
              </Button>
            </div>
          </div>
        </section>

        {/* ── Team — "Duckweed Mafia" ──────────────────────────── */}
        <section id="team" className="nd-team">
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: GUTTER_X }}>
            <Eyebrow>Sincerely,</Eyebrow>
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <Headline level="h1" pre="Duckweed " accent="Mafia" />
              <a
                className="nd-iconbtn"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nitroduck on LinkedIn"
              >
                <Linkedin size={18} strokeWidth={1.8} />
              </a>
            </div>

            <div className="nd-team-grid">
              {members.map((member) => (
                <div key={member.name} className="nd-card">
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: 'var(--nd-radius-sm)',
                      overflow: 'hidden',
                      background: 'var(--nd-bg-cover)',
                    }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top',
                        display: 'block',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--nd-font-body)',
                      fontWeight: 600,
                      fontSize: 17,
                      color: 'var(--nd-text)',
                      marginTop: 14,
                    }}
                  >
                    {member.name}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--nd-text-soft)', marginTop: 4 }}>
                    {member.role}
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
                    <a
                      className="nd-contact"
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail size={18} strokeWidth={1.8} />
                    </a>
                    <a
                      className="nd-contact"
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin size={18} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ background: 'var(--nd-bg-deep)', padding: '56px 0 40px' }}>
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            padding: GUTTER_X,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <Logo size={30} src={MARK_SRC} />
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <a
              className="nd-iconbtn"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nitroduck on LinkedIn"
            >
              <Linkedin size={18} strokeWidth={1.8} />
            </a>
            <a className="nd-iconbtn" href={MAIL_URL} aria-label="Email Nitroduck">
              <Mail size={18} strokeWidth={1.8} />
            </a>
          </div>
        </div>
        <div
          style={{
            maxWidth: 1120,
            margin: '40px auto 0',
            padding: '22px var(--nd-gutter) 0',
            borderTop: '1px solid var(--nd-hairline)',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--nd-font-mono)',
            fontSize: 11,
            letterSpacing: '.06em',
            color: 'var(--nd-text-muted)',
          }}
        >
          <span>© 2026 Nitroduck, Inc.</span>
        </div>
      </footer>

      <Analytics />
    </div>
  );
}

export default App;
