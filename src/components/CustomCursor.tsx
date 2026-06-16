import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setDot({ x: e.clientX, y: e.clientY }), 80);
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"]')) setHovering(true);
      else setHovering(false);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, []);

  return (
    <>
      <div
        className="custom-cursor w-4 h-4 bg-primary-500 transition-transform duration-100"
        style={{ left: pos.x - 8, top: pos.y - 8, transform: hovering ? 'scale(2)' : 'scale(1)' }}
      />
      <div
        className="custom-cursor w-8 h-8 border border-primary-500/50"
        style={{ left: dot.x - 16, top: dot.y - 16 }}
      />
    </>
  );
}
