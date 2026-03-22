import { motion } from 'framer-motion'
import { projects } from '../data/content'
import SectionReveal from './SectionReveal'

const cardVariant = {
  hidden: { opacity: 0, y: 30, rotateX: -8 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      damping: 15,
      stiffness: 80,
    },
  }),
}

function Projects() {
  return (
    <SectionReveal id="projects" className="projects">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Other <span>projects</span>
      </motion.h2>

      <div className="projects-grid">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            className="projects-item"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20px' }}
          >
            <motion.div
              className="projects-card"
              whileHover={{
                y: -6,
                borderColor: 'rgba(201, 162, 39, 0.3)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="projects-card-accent" />
              <div className="projects-head">
                <h3 className="projects-name">{proj.name}</h3>
                {proj.period && <span className="projects-period">{proj.period}</span>}
              </div>
              {proj.tech && <p className="projects-tech">{proj.tech}</p>}
              <ul className="projects-points">
                {proj.points.map((point, pi) => (
                  <motion.li
                    key={pi}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + pi * 0.06 }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .projects-card {
          position: relative;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.08);
          border-radius: var(--radius);
          padding: 1.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          overflow: hidden;
          height: 100%;
        }
        .projects-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, var(--color-accent), var(--color-teal));
          opacity: 0.6;
          border-radius: 2px;
        }
        .projects-head {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .projects-name {
          font-size: 1.1rem;
          color: var(--color-text);
        }
        .projects-period {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          padding: 0.15rem 0.5rem;
          background: var(--color-surface);
          border-radius: 4px;
        }
        .projects-tech {
          font-size: 0.88rem;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }
        .projects-points {
          list-style: none;
          padding: 0;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }
        .projects-points li {
          margin-bottom: 0.25rem;
          padding-left: 1rem;
          position: relative;
        }
        .projects-points li::before {
          content: '\\2192';
          position: absolute;
          left: 0;
          color: var(--color-teal);
          font-size: 0.85rem;
        }
      `}</style>
    </SectionReveal>
  )
}

export default Projects
