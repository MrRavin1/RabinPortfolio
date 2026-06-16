import AnimatedHeading from '../components/AnimatedHeading';
import SectionWrapper from '../components/SectionWrapper';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiCode } from 'react-icons/fi';
import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';
import { stats, socialLinks } from '../data';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, inView } = useInView();
  const count = useCounter(value, 2000, inView);
  return (
    <div ref={ref} className="glass rounded-xl p-5 text-center">
      <div className="text-3xl font-black text-primary-400">{count}{suffix}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-dark-800/30">
      <div className="text-center mb-14">
        <AnimatedHeading normal="About" highlight="Me" />
        <p className="section-subheading">A passionate developer crafting digital experiences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — big profile image */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Glowing circle avatar */}
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary-600/20 blur-2xl scale-110" />
            <div className="relative w-64 h-64 rounded-full p-[3px] bg-gradient-to-br from-primary-400 via-primary-600 to-primary-900">
              <img
                src="/profile.jpg"
                alt="Rabin Karki"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {/* Available badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-dark-800 border border-white/10 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-semibold">Available</span>
            </div>
          </div>

          {/* Name + title */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-white">Rabin Karki</h3>
            <p className="text-primary-400 font-medium mt-1">Full-Stack Developer</p>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            {[
              { href: socialLinks.github, icon: <FaGithub size={18} />, label: 'GitHub' },
              { href: socialLinks.linkedin, icon: <FaLinkedin size={18} />, label: 'LinkedIn' },
              { href: socialLinks.instagram, icon: <FaInstagram size={18} />, label: 'Instagram' },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/40 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — bio + info + stats */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            Namaste! 👋 I'm <span className="text-primary-400 font-semibold">Rabin Karki</span>, a Full-Stack Developer from Nepal 🇳🇵. I turn coffee ☕ into code and ideas 💡 into web applications. From crafting smooth user interfaces to building powerful backend systems, I enjoy creating digital experiences that are fast, scalable, and actually fun to use.
          </p>

          <div className="space-y-3">
            {[
              { icon: <FiMapPin size={15} />, text: 'Kathmandu, Nepal' },
              { icon: <FiMail size={15} />,    text: '29rabinkarki@gmail.com' },
              { icon: <FiCode size={15} />,    text: 'React · TypeScript · Laravel · PHP' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-primary-400">{icon}</span>
                {text}
              </div>
            ))}
          </div>

          {/* Code snippet */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-mono text-xs text-gray-500 ml-2">rabin.ts</span>
            </div>
            <pre className="font-mono text-sm text-gray-300 leading-relaxed overflow-x-auto">
              <span className="text-blue-400">const</span>{' '}
              <span className="text-white">dev</span>{' '}
              <span className="text-blue-400">=</span>{' '}
              <span className="text-yellow-400">{'{'}</span>{'\n'}
              {'  '}<span className="text-green-400">name</span><span className="text-white">:</span>{' '}<span className="text-orange-300">'Rabin Karki'</span><span className="text-white">,</span>{'\n'}
              {'  '}<span className="text-green-400">stack</span><span className="text-white">:</span>{' '}<span className="text-orange-300">'React + Laravel'</span><span className="text-white">,</span>{'\n'}
              {'  '}<span className="text-green-400">available</span><span className="text-white">:</span>{' '}<span className="text-blue-400">true</span><span className="text-white">,</span>{'\n'}
              <span className="text-yellow-400">{'}'}</span>
            </pre>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(s => <StatCard key={s.label} {...s} />)}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
