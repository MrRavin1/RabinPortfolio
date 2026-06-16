import { useEffect, useState } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import GitHub from './sections/GitHub';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import { FiGithub, FiMail } from 'react-icons/fi';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { socialLinks } from './data';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return <LoadingScreen />;

  const socials = [
    { href: socialLinks.github,    icon: <FiGithub size={17} />,    label: 'GitHub' },
    { href: socialLinks.linkedin,  icon: <FaLinkedin size={17} />,  label: 'LinkedIn' },
    { href: socialLinks.email,     icon: <FiMail size={17} />,      label: 'Email' },
    { href: socialLinks.instagram, icon: <FaInstagram size={17} />, label: 'Instagram' },
    { href: socialLinks.facebook,  icon: <FaFacebook size={17} />,  label: 'Facebook' },
  ];

  return (
    <div className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 px-6 h-14 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-white/[0.06]' : ''}`}>
        {/* Logo */}
        <a href="#" className="font-black text-lg tracking-tight group">
          <span className="text-white group-hover:text-primary-300 transition-colors">Rabin</span>
          <span className="text-primary-400">Karki</span>
          <span className="text-primary-400 animate-pulse">_</span>
        </a>

        {/* Social icons top-right */}
        <div className="flex items-center gap-1">
          {socials.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-primary-400 hover:bg-primary-600/10 transition-all duration-200"
            >
              {icon}
            </a>
          ))}
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHub />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
