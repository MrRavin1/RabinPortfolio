import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-2 border-primary-600/30 border-t-primary-500 rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
        <motion.p
          className="font-mono text-primary-400 text-sm tracking-widest"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          LOADING...
        </motion.p>
      </div>
    </motion.div>
  );
}
