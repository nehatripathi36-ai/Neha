import { motion } from 'framer-motion'
import { education } from '../data/content'
import SectionReveal from './SectionReveal'

function Education() {
  return (
    <SectionReveal id="education" className="education">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Education <span>—</span>
      </motion.h2>

      <div className="education-grid">
        {education.map((edu, i) => (
          <motion.article
            key={edu.id}
            className="education-card"
            initial={{ opacity: 0, y: 30, rotateY: -5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: 'spring', damping: 15 }}
          >
            <motion.div
              className="education-card-inner"
              whileHover={{
                borderColor: 'rgba(201, 162, 39, 0.3)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                y: -4,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="education-icon">
                <motion.svg
                  width="32" height="32" viewBox="0 0 32 32" fill="none"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M16 4L2 12L16 20L30 12L16 4Z" stroke="var(--color-accent)" strokeWidth="1.5"/>
                  <path d="M6 15V24L16 28L26 24V15" stroke="var(--color-teal)" strokeWidth="1.5"/>
                </motion.svg>
              </div>
              <h3 className="education-degree">{edu.degree}</h3>
              <p className="education-school">{edu.school}</p>
              <div className="education-meta">
                <span className="education-period">{edu.period}</span>
                <span className="education-location">{edu.location}</span>
              </div>
              <motion.p
                className="education-detail"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                {edu.detail}
              </motion.p>
            </motion.div>
          </motion.article>
        ))}
      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 600px) {
          .education-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .education-card-inner {
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.08);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          height: 100%;
        }
        .education-icon { margin-bottom: 1rem; }
        .education-degree {
          font-size: 1.15rem;
          color: var(--color-text);
          margin-bottom: 0.35rem;
        }
        .education-school {
          font-weight: 500;
          color: var(--color-accent);
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }
        .education-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }
        .education-period, .education-location {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .education-detail {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-teal);
          margin-top: 0.5rem;
          padding: 0.35rem 0.7rem;
          background: var(--color-teal-soft);
          border-radius: 6px;
          display: inline-block;
        }
      `}</style>
    </SectionReveal>
  )
}

export default Education
