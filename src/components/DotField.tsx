import { useEffect, useRef } from 'react';

interface Props {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function lerpColor(a: string, b: string, t: number) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  return `rgb(${Math.round(ca.r + (cb.r - ca.r) * t)},${Math.round(ca.g + (cb.g - ca.g) * t)},${Math.round(ca.b + (cb.b - ca.b) * t)})`;
}

export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 27,
  cursorRadius = 500,
  cursorForce = 0.53,
  bulgeOnly = true,
  bulgeStrength = 84,
  glowRadius = 130,
  sparkle = true,
  waveAmplitude = 3,
  gradientFrom = '#a19c9c',
  gradientTo = '#544a4a',
  glowColor = '#120F17',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const src = 'touches' in e ? e.touches[0] : e;
      mouse.current = { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove as EventListener);

    const draw = (ts: number) => {
      timeRef.current = ts * 0.001;
      const t = timeRef.current;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x, my = mouse.current.y;

      for (let gx = dotSpacing / 2; gx < w; gx += dotSpacing) {
        for (let gy = dotSpacing / 2; gy < h; gy += dotSpacing) {
          const dx = gx - mx, dy = gy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Wave offset
          const wave = Math.sin(gx * 0.02 + t) * Math.cos(gy * 0.02 + t * 0.7) * waveAmplitude;

          // Cursor bulge
          let ox = 0, oy = 0;
          if (dist < cursorRadius) {
            const strength = (1 - dist / cursorRadius) * cursorForce * bulgeStrength;
            ox = (dx / (dist || 1)) * strength * (bulgeOnly ? -1 : 1);
            oy = (dy / (dist || 1)) * strength * (bulgeOnly ? -1 : 1);
          }

          const px = gx + ox;
          const py = gy + oy + wave;

          // Color gradient top→bottom
          const colorT = gy / h;
          const baseColor = lerpColor(gradientFrom, gradientTo, colorT);

          // Glow near cursor
          let radius = dotRadius;
          let alpha = 0.6;
          if (dist < glowRadius) {
            const gf = 1 - dist / glowRadius;
            radius = dotRadius + gf * 1.5;
            alpha = 0.6 + gf * 0.4;
          }

          // Sparkle
          if (sparkle && Math.random() < 0.0003) {
            radius = dotRadius * 2.5;
            alpha = 1;
          }

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = baseColor.replace('rgb', 'rgba').replace(')', `,${alpha})`);
          ctx.fill();
        }
      }

      // Glow circle under cursor
      if (mouse.current.x > 0) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
        const gc = hexToRgb(glowColor);
        grd.addColorStop(0, `rgba(${gc.r},${gc.g},${gc.b},0.18)`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove as EventListener);
    };
  }, [dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength,
      glowRadius, sparkle, waveAmplitude, gradientFrom, gradientTo, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
