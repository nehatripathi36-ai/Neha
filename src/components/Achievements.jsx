import { motion } from 'framer-motion'
import { achievements, highlight } from '../data/content'
import SectionReveal from './SectionReveal'

const itemVariant = {
  hidden: { opacity: 0, x: -30, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      damping: 12,
      stiffness: 80,
    },
  }),
}

function Achievements() {
  return (
    <SectionReveal id="achievements" className="achievements">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Achievements <span>& highlight</span>
      </motion.h2>

      <motion.div
        className="highlight-box"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div className="highlight-glow" />
        <motion.span
          className="highlight-icon"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          &#10024;
        </motion.span>
        <p className="highlight-text">&ldquo;{highlight}&rdquo;</p>
      </motion.div>

      <ul className="achievements-list">
        {achievements.map((text, i) => (
          <motion.li
            key={i}
            className="achievements-item"
            custom={i}
            variants={itemVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20px' }}
          >
            <motion.span
              className="achievements-bullet"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <span>{text}</span>
          </motion.li>
        ))}
      </ul>

      <style>{`
        .highlight-box {
          position: relative;
          background: linear-gradient(135deg, var(--color-accent-soft), var(--color-teal-soft));
          border: 1px solid rgba(201, 162, 39, 0.2);
          border-radius: var(--radius-lg);
          padding: 1.5rem 1.75rem;
          margin-bottom: 2rem;
          overflow: hidden;
        }
        .highlight-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 40%, rgba(201, 162, 39, 0.06) 0%, transparent 50%);
          animation: rotate 20s linear infinite;
          pointer-events: none;
        }
        .highlight-icon {
          display: block;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .highlight-text {
          font-size: 1.05rem;
          color: var(--color-text);
          font-style: italic;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }
        .achievements-list { list-style: none; }
        .achievements-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: var(--color-text-muted);
          padding: 0.75rem 1rem;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.06);
          border-radius: var(--radius);
          transition: border-color 0.2s;
        }
        .achievements-item:hover {
          border-color: rgba(201, 162, 39, 0.2);
        }
        .achievements-bullet {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          margin-top: 0.4rem;
          border-radius: 50%;
          background: var(--color-accent);
        }
      `}</style>
    </SectionReveal>
  )
}

export default Achievements
