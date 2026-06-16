import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { FiGithub, FiStar, FiGitBranch, FiUsers } from 'react-icons/fi';
import { socialLinks } from '../data';

const ghStats = [
  { icon: <FiGitBranch size={20} />, label: 'Repositories', value: '20+' },
  { icon: <FiStar size={20} />, label: 'Stars Earned', value: '15+' },
  { icon: <FiUsers size={20} />, label: 'Following', value: '30+' },
  { icon: <FiGithub size={20} />, label: 'Contributions', value: '500+' },
];

export default function GitHub() {
  const username = 'MrRavin1';
  return (
    <SectionWrapper id="github">
      <div className="text-center mb-14">
        <AnimatedHeading normal="GitHub" highlight="Activity" />
        <p className="section-subheading">Open source contributions and coding activity</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {ghStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-primary-400 flex justify-center mb-3">{stat.icon}</span>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Contribution Graph</h3>
          <img
            src={`https://ghchart.rshah.org/2563eb/${username}`}
            alt="GitHub Contribution Chart"
            className="w-full rounded-lg"
            loading="lazy"
          />
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">GitHub Stats</h3>
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=60a5fa&icon_color=60a5fa&text_color=9ca3af&bg_color=00000000&hide_border=true`}
            alt="GitHub Stats"
            className="w-full"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <motion.a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
          whileHover={{ scale: 1.02 }}
        >
          <FiGithub size={18} /> View Full Profile
        </motion.a>
      </div>
    </SectionWrapper>
  );
}
