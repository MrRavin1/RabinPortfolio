import { FiGithub, FiMail } from 'react-icons/fi';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { socialLinks, navLinks } from '../data';

export default function Footer() {
  const socials = [
    { href: socialLinks.github,    icon: <FiGithub size={18} />,    label: 'GitHub' },
    { href: socialLinks.linkedin,  icon: <FaLinkedin size={18} />,  label: 'LinkedIn' },
    { href: socialLinks.email,     icon: <FiMail size={18} />,      label: 'Email' },
    { href: socialLinks.instagram, icon: <FaInstagram size={18} />, label: 'Instagram' },
    { href: socialLinks.facebook,  icon: <FaFacebook size={18} />,  label: 'Facebook' },
  ];

  return (
    <footer className="border-t border-white/[0.07] bg-dark-900/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left — logo */}
          <a href="#" className="font-black text-xl tracking-tight shrink-0">
            <span className="text-white">Rabin</span>
            <span className="text-primary-400">Karki</span>
            <span className="text-primary-400">_</span>
          </a>

          {/* Center — nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-gray-500 hover:text-primary-400 transition-colors text-sm font-medium">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — social icons */}
          <div className="flex items-center gap-2 shrink-0">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-500/40 hover:bg-primary-600/10 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Rabin Karki. Built with React & TypeScript.
          </p>
        </div>
      </div>
    </footer>
  );
}
