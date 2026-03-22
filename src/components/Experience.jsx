import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { experience } from '../data/content'
import SectionReveal from './SectionReveal'

const cardVariant = {
  hidden: { opacity: 0, x: -40, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  }),
}

function TimelineDot({ index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="exp-dot"
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : { scale: 0 }}
      transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="exp-dot-ring"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
      />
    </motion.div>
  )
}

function Experience() {
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 80%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <SectionReveal id="experience" className="experience">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experience <span>—</span>
      </motion.h2>

      <div className="exp-timeline" ref={lineRef}>
        <div className="exp-line-track">
          <motion.div className="exp-line-fill" style={{ height: lineHeight }} />
        </div>
        {experience.map((job, i) => (
          <motion.article
            key={job.id}
            className="exp-card"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-30px' }}
          >
            <TimelineDot index={i} />
            <motion.div
              className="exp-content"
              whileHover={{
                borderColor: 'rgba(201, 162, 39, 0.25)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                y: -2,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="exp-head">
                <h3 className="exp-role">{job.role}</h3>
                <span className="exp-period">{job.period}</span>
              </div>
              <p className="exp-company">{job.company}</p>
              <p className="exp-location">{job.location}</p>
              <ul className="exp-points">
                {job.points.map((point, pi) => (
                  <motion.li
                    key={pi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + pi * 0.08 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.article>
        ))}
      </div>

      <style>{`
        .exp-timeline {
          position: relative;
          padding-left: 2.5rem;
        }
        .exp-line-track {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(232, 236, 240, 0.08);
          border-radius: 1px;
          overflow: hidden;
        }
        .exp-line-fill {
          width: 100%;
          background: linear-gradient(to bottom, var(--color-accent), var(--color-teal));
          border-radius: 1px;
        }
        .exp-card {
          position: relative;
          padding-bottom: 2rem;
        }
        .exp-card:last-child { padding-bottom: 0; }
        .exp-dot {
          position: absolute;
          left: -2.5rem;
          top: 0.5rem;
          transform: translateX(-50%);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--color-teal);
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exp-dot-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid var(--color-teal);
        }
        .exp-content {
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.06);
          border-radius: var(--radius);
          padding: 1.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .exp-head {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
        }
        .exp-role {
          font-size: 1.15rem;
          color: var(--color-text);
        }
        .exp-period {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          padding: 0.2rem 0.6rem;
          background: var(--color-surface);
          border-radius: 6px;
        }
        .exp-company {
          font-weight: 500;
          color: var(--color-accent);
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }
        .exp-location {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
        }
        .exp-points {
          list-style: none;
          padding: 0;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .exp-points li {
          margin-bottom: 0.3rem;
          padding-left: 1rem;
          position: relative;
        }
        .exp-points li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-accent);
        }
      `}</style>
    </SectionReveal>
  )
}

export default Experience
