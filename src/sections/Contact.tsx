import AnimatedHeading from '../components/AnimatedHeading';
import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { socialLinks } from '../data';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:29rabinkarki@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.email)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contactLinks = [
    { icon: <FiMail size={20} />, label: 'Email', value: '29rabinkarki@gmail.com', href: 'mailto:29rabinkarki@gmail.com' },
    { icon: <FiLinkedin size={20} />, label: 'LinkedIn', value: 'linkedin.com/in/rabin-karki-4105262b8', href: socialLinks.linkedin },
    { icon: <FiGithub size={20} />, label: 'GitHub', value: 'github.com/MrRavin1', href: socialLinks.github },
  ];

  return (
    <SectionWrapper id="contact">
      <div className="text-center mb-14">
        <AnimatedHeading normal="Get In" highlight="Touch" />
        <p className="section-subheading">Open to opportunities, collaborations, and conversations</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            I'm actively looking for collaborations and exciting projects.
            Whether you have an opportunity or just want to connect — my inbox is open.
          </p>

          <div className="space-y-4">
            {contactLinks.map(({ icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:border-primary-500/50 transition-all duration-200 group"
                whileHover={{ x: 4 }}
              >
                <span className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-400 group-hover:bg-primary-600/30 transition-colors">{icon}</span>
                <div>
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-gray-300 text-sm font-medium">{value}</div>
                </div>
              </motion.a>
            ))}
          </div>


        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-5 sm:p-8 space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {[{ id: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' }]
            .map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm text-gray-400 mb-2 font-medium">{label}</label>
                <input
                  id={id}
                  type={type}
                  required
                  placeholder={placeholder}
                  value={form[id as 'name' | 'email']}
                  onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                  className="w-full bg-dark-900/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors text-sm"
                />
              </div>
            ))}
          <div>
            <label htmlFor="message" className="block text-sm text-gray-400 mb-2 font-medium">Message</label>
            <textarea
              id="message"
              rows={4}
              required
              placeholder="Tell me about the role or project..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="w-full bg-dark-900/50 border border-white/10 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-primary-500 transition-colors text-sm resize-none"
            />
          </div>
          <motion.button
            type="submit"
            className="btn-primary w-full justify-center"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {sent ? '✓ Opening Email Client...' : <><FiSend size={14} /> Send Message</>}
          </motion.button>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
