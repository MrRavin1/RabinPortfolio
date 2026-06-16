import { motion } from 'framer-motion';

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

export default function SectionWrapper({ id, children, className = '' }: Props) {
  return (
    <motion.section
      id={id}
      className={`py-24 px-6 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
