import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiCalendar, FiMapPin, FiBook } from 'react-icons/fi';

export default function Education() {
  return (
    <SectionWrapper id="education" className="bg-dark-800/30">
      <div className="text-center mb-14">
        <AnimatedHeading normal="My" highlight="Education" />
        <p className="section-subheading">Academic foundation that drives my technical growth</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <motion.div
          className="glass rounded-2xl p-8 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-primary-700 rounded-l-2xl" />
          <div className="pl-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiBook className="text-primary-400" size={18} />
                  <h3 className="text-xl font-bold text-white">Bachelor of Science in Computing</h3>
                </div>
                <p className="text-primary-400 font-semibold text-lg mb-4">Herald College Kathmandu</p>
              </div>
              <div className="glass rounded-lg px-4 py-2 text-center">
                <div className="text-primary-400 font-bold text-xl">2022</div>
                <div className="text-gray-500 text-xs">— 2026</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: <FiMapPin size={14} />, text: 'Kathmandu, Nepal' },
                { icon: <FiCalendar size={14} />, text: 'Graduating 2026' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-primary-400">{icon}</span>
                  {text}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary-600/5 border border-primary-600/20 rounded-xl">
              <p className="text-gray-300 text-sm leading-relaxed">
                Pursuing a comprehensive Computer Science curriculum covering software engineering,
                data structures, algorithms, web development, and system design. Complemented by
                hands-on project work building full-stack applications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
