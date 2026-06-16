import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import { socialLinks } from '../data';

const roles = ['Full-Stack Developer', 'React Specialist', 'Laravel Developer', 'TypeScript Engineer', 'CS Graduate 2026'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
    if (typing) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-700/10 rounded-full blur-3xl" />
      </div>
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="mb-4">
          <span className="font-mono text-primary-400 text-sm tracking-widest uppercase">Hello, World! I'm</span>
        </motion.div>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight">
          Rabin
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"> Karki</span>
        </motion.h1>

        <motion.div variants={item} className="h-12 flex items-center justify-center mb-6">
          <span className="text-xl md:text-2xl text-gray-300 font-medium">
            {displayed}
            <span className="inline-block w-0.5 h-6 bg-primary-400 ml-1 animate-pulse" />
          </span>
        </motion.div>

        <motion.p variants={item} className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafting scalable, high-performance web applications with modern technologies.
          Passionate about clean code, great UX, and turning ideas into reality.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href="#projects" className="btn-primary">
            <FiArrowRight size={16} /> View Projects
          </a>

          <a href="#contact" className="btn-outline">
            <FiMail size={16} /> Contact Me
          </a>
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-center gap-6">
          {[
            { href: socialLinks.github, icon: <FiGithub size={22} />, label: 'GitHub' },
            { href: socialLinks.linkedin, icon: <FiLinkedin size={22} />, label: 'LinkedIn' },
            { href: socialLinks.email, icon: <FiMail size={22} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={href}
              href={href}
              aria-label={label}
              className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
