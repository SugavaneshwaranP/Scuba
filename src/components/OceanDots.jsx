import React, { useEffect, useRef } from 'react';

// animejs.com-style dot field — scroll-reactive (color/amplitude shift with depth).
// Reads window scroll progress directly each frame, no React re-renders.
export default function OceanDots({
  spacing = 28,
  baseSize = 1.1,
  className = '',
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const burst = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots = [];
    let w = 0;
    let h = 0;

    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({
            ox: x * spacing,
            oy: y * spacing,
            phase: x * 0.35 + y * 0.55,
          });
        }
      }
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      buildDots();
    };

    // sky-300 → deep teal → indigo as you descend
    const lerp = (a, b, t) => a + (b - a) * t;
    const mixColor = (p) => {
      const stops = [
        [125, 211, 252], // sky-300
        [56, 189, 248],  // sky-400
        [14, 165, 233],  // sky-500
        [99, 102, 241],  // indigo-500
      ];
      const seg = p * (stops.length - 1);
      const i = Math.min(stops.length - 2, Math.floor(seg));
      const f = seg - i;
      return [
        Math.round(lerp(stops[i][0], stops[i + 1][0], f)),
        Math.round(lerp(stops[i][1], stops[i + 1][1], f)),
        Math.round(lerp(stops[i][2], stops[i + 1][2], f)),
      ];
    };

    const loop = (t) => {
      const time = t * 0.001;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const sp = Math.min(1, Math.max(0, window.scrollY / max));

      // Depth-driven parameters
      const amp = 3 + sp * 8;          // wave amplitude grows with depth
      const ambient = 0.06 + (1 - sp) * 0.08;
      const [r, g, b] = mixColor(sp);

      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const cursorR = 220;

      const now = t;
      burst.current = burst.current.filter((bx) => now - bx.t < 1400);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        const wave =
          Math.sin(time * (0.6 + sp * 0.4) + d.phase) * amp +
          Math.cos(time * 0.35 + d.ox * 0.005) * (amp * 0.6);

        const dx = d.ox - mx;
        const dy = d.oy - my;
        const dist = Math.hypot(dx, dy) || 1;
        const force = Math.max(0, 1 - dist / cursorR);
        const fx = (dx / dist) * force * 26;
        const fy = (dy / dist) * force * 26;

        let rippleA = 0;
        let rippleOff = 0;
        for (const bb of burst.current) {
          const age = (now - bb.t) / 1400;
          const radius = age * 700;
          const rdx = d.ox - bb.x;
          const rdy = d.oy - bb.y;
          const rd = Math.hypot(rdx, rdy);
          const band = Math.exp(-Math.pow((rd - radius) / 40, 2));
          rippleA += band * (1 - age) * 0.7;
          rippleOff += band * (1 - age) * 8;
        }

        const px = d.ox + fx + Math.sin(time + d.phase) * 1.2;
        const py = d.oy + fy + wave + rippleOff;

        const a = Math.min(
          1,
          ambient + Math.sin(time * 0.6 + d.phase) * 0.05 + force * 0.75 + rippleA
        );
        const rad = baseSize + force * 1.6 + rippleA * 1.5;

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, rad, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    const onClick = (e) => {
      burst.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (burst.current.length > 6) burst.current.shift();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, [spacing, baseSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
