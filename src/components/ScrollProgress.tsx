import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-dark-800">
      <div
        className="h-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
