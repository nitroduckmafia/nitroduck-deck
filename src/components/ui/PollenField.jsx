import React from 'react';

/* Volumetric pollen flock. Grains live at real 3D positions (a wind-borne cloud
   streaming from a source, plus fine dust and a few large ornamented grains). Every
   frame the cloud is rotated by an orientation quaternion, perspective-projected, and
   painted back-to-front on a <canvas> — so it tumbles like a real flock instead of a
   flat sheet, keeping a full silhouette at any angle. Larger grains carry an irregular
   blob outline, a cream rim, and exine ornamentation (reticulate net / ridges /
   spinules); fine dust stays a cheap dot. Fills its (position:relative) parent; drive
   the orientation via the `orientationRef` quaternion [x,y,z,w]. */

const GOLD = [210, 162, 76]; //  #D2A24C — the accent grain
const GRAIN = [205, 201, 138]; // #CDC98A — pale pollen
const RND = (a, b) => a + Math.random() * (b - a);

// Irregular grain outline: unit-radius points (aspect + rotation + lobing baked in),
// scaled by the projected radius at draw time. Stable per grain, so it never flickers.
function makeShape(r) {
  const pts = r > 0.006 ? 9 : 7;
  const irr = r > 0.006 ? 0.24 : 0.33;
  const asp = RND(0.62, 1.38);
  const rot = RND(0, 6.283);
  const P = [];
  for (let i = 0; i < pts; i++) {
    const a = (i / pts) * 6.2832, rad = 1 + RND(-irr, irr);
    const bx = Math.cos(a) * rad * asp, by = Math.sin(a) * rad;
    P.push([bx * Math.cos(rot) - by * Math.sin(rot), bx * Math.sin(rot) + by * Math.cos(rot)]);
  }
  return P;
}

// Exine ornamentation in unit-radius coords: 0 = reticulate net, 1 = parallel ridges,
// 2 = scattered spinules. Flat number arrays keep per-frame drawing allocation-free.
function makeDeco() {
  const t = Math.random();
  if (t < 0.58) {
    const nn = 7 + ((Math.random() * 4) | 0);
    const p = [];
    for (let i = 0; i < nn; i++) { const a = RND(0, 6.283), rr = RND(0.1, 0.78); p.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    const lines = []; // segments of 4 numbers: x0,y0,x1,y1
    for (let i = 0; i < nn; i++) {
      const a = p[i], b = p[(i + 1) % nn], c = p[(i + 2) % nn];
      lines.push(a[0], a[1], b[0], b[1], a[0], a[1], c[0], c[1]);
    }
    return { type: 0, lines };
  }
  if (t < 0.78) {
    const ang = RND(0, 3.14), dx = Math.cos(ang), dy = Math.sin(ang), px = -dy, py = dx;
    const arcs = []; // quads of 6 numbers: x0,y0,cx,cy,x1,y1
    for (let i = -2; i <= 2; i++) {
      const off = i * 0.3, len = 0.72 * Math.sqrt(Math.max(0.05, 1 - (i * 0.3) * (i * 0.3)));
      const cx = px * off, cy = py * off;
      arcs.push(cx - dx * len, cy - dy * len, cx + px * 0.35, cy + py * 0.35, cx + dx * len, cy + dy * len);
    }
    return { type: 1, arcs };
  }
  const nn = 5 + ((Math.random() * 4) | 0), dots = []; // triples: x,y,r
  for (let i = 0; i < nn; i++) { const a = RND(0, 6.283), rr = RND(0, 0.6); dots.push(Math.cos(a) * rr, Math.sin(a) * rr, RND(0.08, 0.18)); }
  return { type: 2, dots };
}

function buildCloud(density) {
  const R = (a, b) => a + Math.random() * (b - a);
  const g = [];
  const add = (x, y, z, r, goldBias, shaped) => {
    const c = Math.random() < goldBias ? GOLD : GRAIN;
    g.push({
      x, y, z, r,
      rgb: c[0] + ',' + c[1] + ',' + c[2],
      shape: shaped ? makeShape(r) : null, // irregular outline (null → drawn as a dot)
      deco: shaped ? makeDeco() : null, // exine ornamentation
      // per-grain drift phases/speed for a gentle, independent shimmer
      pa: R(0, 6.283), pb: R(0, 6.283), pc: R(0, 6.283), w: R(0.35, 1.05),
    });
  };

  // Streams — grains flow along curved paths from a right-hand source, now in depth.
  const S = Math.round(26 * density);
  for (let s = 0; s < S; s++) {
    const sy = R(-0.55, 0.55), sz = R(-0.6, 0.6);
    const ey = sy + R(-0.45, 0.45), ez = sz + R(-0.5, 0.5);
    const p0x = 0.9, p3x = -0.92;
    const c1 = [R(0.15, 0.5), sy + R(-0.25, 0.25), sz + R(-0.25, 0.25)];
    const c2 = [R(-0.45, 0.1), ey + R(-0.25, 0.25), ez + R(-0.25, 0.25)];
    for (let k = 0; k <= 10; k++) {
      const t = k / 10, mt = 1 - t;
      const b0 = mt * mt * mt, b1 = 3 * mt * mt * t, b2 = 3 * mt * t * t, b3 = t * t * t;
      const x = b0 * p0x + b1 * c1[0] + b2 * c2[0] + b3 * p3x;
      const y = b0 * sy + b1 * c1[1] + b2 * c2[1] + b3 * ey;
      const z = b0 * sz + b1 * c1[2] + b2 * c2[2] + b3 * ez;
      const j = 0.03;
      add(
        x + R(-j, j), y + R(-j, j), z + R(-j, j),
        Math.max(0.0018, 0.0058 * (1 - t * 0.45) * R(0.55, 1.5)),
        0.34, true
      );
    }
  }

  // Dust — fine grains filling a rounded (ellipsoidal) volume (drawn as plain dots).
  const D = Math.round(1600 * density);
  for (let k = 0; k < D; k++) {
    let x, y, z, d2;
    do {
      x = R(-1, 1); y = R(-0.94, 0.94); z = R(-0.84, 0.84);
      d2 = x * x * 0.92 + y * y + z * z * 1.15;
    } while (d2 > 1.0);
    add(x, y, z, R(0.0009, 0.0026), 0.3, false);
  }

  // A few large, richly ornamented grains.
  const L = Math.round(15 * density);
  for (let k = 0; k < L; k++) {
    add(R(-0.78, 0.78), R(-0.72, 0.72), R(-0.66, 0.66), R(0.006, 0.011), 0.5, true);
  }

  return g;
}

export function PollenField({ orientationRef, reducedMotion = false, density = 1 }) {
  const canvasRef = React.useRef(null);
  const cloud = React.useMemo(() => buildCloud(density), [density]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const n = cloud.length;

    // Scratch buffers reused each frame (no per-frame allocation).
    const zr = new Float32Array(n);
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    const sr = new Float32Array(n);
    const sa = new Float32Array(n);
    const order = new Array(n);
    for (let i = 0; i < n; i++) order[i] = i;

    const F = 2.6; // camera focal length (normalized units) → perspective strength
    const IDENT = [0, 0, 0, 1];
    let cw = 0, ch = 0, raf = 0, lastT = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const rw = Math.round(canvas.clientWidth || (parent ? parent.clientWidth : 0));
      const rh = Math.round(canvas.clientHeight || (parent ? parent.clientHeight : 0));
      if (rw < 2 || rh < 2) return false; // ignore a degenerate (pre-layout) measurement
      if (rw === cw && rh === ch && canvas.width) return true; // unchanged
      cw = rw; ch = rh;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    // Draw one grain's irregular outline as a smooth closed path (quadratics through
    // the midpoints, control points at the vertices).
    const shapePath = (P, gx, gy, r) => {
      const nP = P.length, last = P[nP - 1], first = P[0];
      ctx.beginPath();
      ctx.moveTo(gx + (last[0] + first[0]) * 0.5 * r, gy + (last[1] + first[1]) * 0.5 * r);
      for (let k = 0; k < nP; k++) {
        const c0 = P[k], c1 = P[(k + 1) % nP];
        ctx.quadraticCurveTo(
          gx + c0[0] * r, gy + c0[1] * r,
          gx + (c0[0] + c1[0]) * 0.5 * r, gy + (c0[1] + c1[1]) * 0.5 * r
        );
      }
      ctx.closePath();
    };

    const decoDraw = (deco, gx, gy, r, a) => {
      if (deco.type === 0) {
        const L = deco.lines;
        ctx.strokeStyle = 'rgba(48,52,28,' + (a * 0.5).toFixed(3) + ')';
        ctx.lineWidth = Math.max(0.35, r * 0.06);
        ctx.beginPath();
        for (let k = 0; k < L.length; k += 4) {
          ctx.moveTo(gx + L[k] * r, gy + L[k + 1] * r);
          ctx.lineTo(gx + L[k + 2] * r, gy + L[k + 3] * r);
        }
        ctx.stroke();
      } else if (deco.type === 1) {
        const A = deco.arcs;
        ctx.strokeStyle = 'rgba(48,52,28,' + (a * 0.46).toFixed(3) + ')';
        ctx.lineWidth = Math.max(0.35, r * 0.07);
        ctx.beginPath();
        for (let k = 0; k < A.length; k += 6) {
          ctx.moveTo(gx + A[k] * r, gy + A[k + 1] * r);
          ctx.quadraticCurveTo(gx + A[k + 2] * r, gy + A[k + 3] * r, gx + A[k + 4] * r, gy + A[k + 5] * r);
        }
        ctx.stroke();
      } else {
        const Dt = deco.dots;
        ctx.fillStyle = 'rgba(44,48,24,' + (a * 0.55).toFixed(3) + ')';
        ctx.beginPath();
        for (let k = 0; k < Dt.length; k += 3) {
          const rr = Math.max(0.4, Dt[k + 2] * r);
          ctx.moveTo(gx + Dt[k] * r + rr, gy + Dt[k + 1] * r);
          ctx.arc(gx + Dt[k] * r, gy + Dt[k + 1] * r, rr, 0, 6.2832);
        }
        ctx.fill();
      }
    };

    const draw = (timeMs) => {
      lastT = timeMs;
      if (cw < 2 || ch < 2) { if (!reducedMotion) raf = requestAnimationFrame(draw); return; }
      const q = orientationRef && orientationRef.current ? orientationRef.current : IDENT;
      const x = q[0], y = q[1], z = q[2], w = q[3];
      const xx = x * x, yy = y * y, zz = z * z;
      const xy = x * y, xz = x * z, yz = y * z, wx = w * x, wy = w * y, wz = w * z;
      const r00 = 1 - 2 * (yy + zz), r01 = 2 * (xy - wz), r02 = 2 * (xz + wy);
      const r10 = 2 * (xy + wz), r11 = 1 - 2 * (xx + zz), r12 = 2 * (yz - wx);
      const r20 = 2 * (xz - wy), r21 = 2 * (yz + wx), r22 = 1 - 2 * (xx + yy);

      const base = Math.max(cw, ch) * 0.62; // normalized unit → px (keeps it filling)
      const cxp = cw / 2, cyp = ch / 2;
      const t = reducedMotion ? 0 : timeMs * 0.001;
      const amp = 0.02;

      for (let i = 0; i < n; i++) {
        const gi = cloud[i];
        let px = gi.x, py = gi.y, pz = gi.z;
        if (!reducedMotion) {
          px += amp * Math.sin(t * gi.w + gi.pa);
          py += amp * Math.sin(t * gi.w * 0.9 + gi.pb);
          pz += amp * Math.sin(t * gi.w * 1.1 + gi.pc);
        }
        const rx = r00 * px + r01 * py + r02 * pz;
        const ry = r10 * px + r11 * py + r12 * pz;
        const rz = r20 * px + r21 * py + r22 * pz;
        const persp = F / (F + rz);
        zr[i] = rz;
        sx[i] = cxp + rx * base * persp;
        sy[i] = cyp + ry * base * persp;
        sr[i] = gi.r * base * persp;
        const a = 0.9 - rz * 0.55; // nearer grains (smaller rz) read brighter
        sa[i] = a > 1 ? 1 : a < 0.16 ? 0.16 : a;
      }

      order.sort((a, b) => zr[b] - zr[a]); // far → near (painter's algorithm)

      ctx.clearRect(0, 0, cw, ch);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      for (let o = 0; o < n; o++) {
        const i = order[o];
        const r = sr[i];
        if (r < 0.15) continue;
        const gi = cloud[i];
        const a = sa[i];
        const gx = sx[i], gy = sy[i];

        if (gi.shape && r >= 1.6) {
          // Irregular grain: filled blob + cream rim + (when large enough) ornamentation.
          shapePath(gi.shape, gx, gy, r);
          ctx.fillStyle = 'rgba(' + gi.rgb + ',' + a.toFixed(3) + ')';
          ctx.fill();
          if (r >= 2.2) {
            ctx.strokeStyle = 'rgba(237,227,176,' + (a * 0.42).toFixed(3) + ')';
            ctx.lineWidth = Math.max(0.4, r * 0.12);
            ctx.stroke();
          }
          if (gi.deco && r >= 3) decoDraw(gi.deco, gx, gy, r, a);
        } else {
          // Fine dust / far grains: a simple dot.
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, 6.2832);
          ctx.fillStyle = 'rgba(' + gi.rgb + ',' + a.toFixed(3) + ')';
          ctx.fill();
        }
      }

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0; } };

    resize();
    draw(0); // immediate first frame — never a blank flash before the first rAF
    // Late-layout safeguards: fonts/reflow (or a throttled RO/rAF inside a preview pane)
    // can leave the first measure degenerate — re-measure via timers, which keep firing
    // even when rAF is paused, so the canvas always ends up correctly sized.
    const repaint = () => { if (resize()) draw(lastT); };
    const t1 = setTimeout(repaint, 60);
    const t2 = setTimeout(repaint, 300);
    const ro = new ResizeObserver(repaint);
    ro.observe(canvas);

    let io = null;
    if (!reducedMotion) {
      // Pause the drift loop while the hero is scrolled out of view.
      io = new IntersectionObserver(
        (ents) => { if (ents[0].isIntersecting) start(); else stop(); },
        { threshold: 0 }
      );
      io.observe(canvas);
      start();
    }

    return () => { clearTimeout(t1); clearTimeout(t2); stop(); ro.disconnect(); if (io) io.disconnect(); };
  }, [cloud, reducedMotion, orientationRef]);

  return React.createElement('canvas', {
    ref: canvasRef,
    'aria-hidden': 'true',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      display: 'block',
    },
  });
}
