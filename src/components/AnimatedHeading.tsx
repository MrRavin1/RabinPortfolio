import { motion } from 'framer-motion';

interface Props {
  normal: string;
  highlight: string;
  /** highlight comes after normal by default; set to true to put it before */
  highlightFirst?: boolean;
}

function LetterAnim({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 48, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: (delayOffset + i) * 0.045, duration: 0.4, ease: 'easeOut' as const }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
}

export default function AnimatedHeading({ normal, highlight, highlightFirst }: Props) {
  const normalLen = normal.replace(/ /g, '').length + (normal.split(' ').length - 1);

  return (
    <h2 className="section-heading" style={{ perspective: 400 }}>
      {highlightFirst ? (
        <>
          <span className="text-primary-400"><LetterAnim text={highlight} /></span>
          {'\u00A0'}
          <LetterAnim text={normal} delayOffset={highlight.length + 1} />
        </>
      ) : (
        <>
          <LetterAnim text={normal} />
          {'\u00A0'}
          <span className="text-primary-400">
            <LetterAnim text={highlight} delayOffset={normalLen + 1} />
          </span>
        </>
      )}
    </h2>
  );
}
