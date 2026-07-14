import AnimatedHeading from '../components/AnimatedHeading';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import SectionWrapper from '../components/SectionWrapper';
import { projects } from '../data';

export default function Projects() {
  return (
    <SectionWrapper id="projects" className="bg-dark-800/30">
      <div className="text-center mb-14">
        <AnimatedHeading normal="Featured" highlight="Projects" />
        <p className="section-subheading">Handcrafted with passion and shipped with care</p>
      </div>

      <div className="space-y-8">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className="glass rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-2 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-3 p-5 sm:p-8 flex flex-col justify-between">
                <div>
                  {project.featured && (
                    <div className="flex items-center gap-2 mb-3">
                      <FiStar className="text-yellow-400" size={14} />
                      <span className="text-xs font-medium text-yellow-400 uppercase tracking-widest">Featured Project</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-5">{project.description}</p>

                  <ul className="space-y-2 mb-6">
                    {project.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                    whileHover={{ x: 3 }}
                  >
                    <FiGithub size={16} /> View Code
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-2 text-sm"
                      whileHover={{ scale: 1.02 }}
                    >
                      <FiExternalLink size={14} /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
