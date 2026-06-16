import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { navLinks } from '../data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastScrollY.current && y > 200);
      lastScrollY.current = y;

      const sections = navLinks
        .map(l => document.querySelector(l.href) as HTMLElement)
        .filter(Boolean);
      const current = [...sections].reverse().find(s => window.scrollY >= s.offsetTop - 120);
      if (current) setActive(`#${current.id}`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass shadow-xl shadow-black/30' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Top accent line */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      )}

      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          className="font-mono font-black text-xl group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-primary-400 group-hover:text-primary-300 transition-colors">RK</span>
          <span className="text-white">.</span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:text-primary-400 hover:bg-primary-600/10 ${
                active === link.href ? 'text-primary-400' : 'text-gray-400'
              }`}
            >
              {active === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary-600/10 rounded-lg border border-primary-600/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>



        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass border-t border-white/10 px-6 py-4 space-y-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`flex items-center py-3 px-3 rounded-lg text-sm font-medium transition-colors ${
                  active === link.href
                    ? 'text-primary-400 bg-primary-600/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.a>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
