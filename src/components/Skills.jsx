import { motion } from 'framer-motion'
import { skills } from '../data/content'
import SectionReveal from './SectionReveal'

const allSkills = [
  ...skills.languages,
  ...skills.technologies,
  ...skills.tools,
  ...skills.other,
  ...skills.coursework,
]

function MarqueeRow({ items, direction = 'left', speed = 30 }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-track">
      <motion.div
        className="marquee-inner"
        animate={{ x: direction === 'left' ? [0, '-50%'] : ['-50%', 0] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((name, i) => (
          <motion.span
            key={`${name}-${i}`}
            className="marquee-tag"
            whileHover={{
              scale: 1.15,
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
              transition: { duration: 0.15 },
            }}
          >
            {name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
}

function SkillGroup({ title, items, index }) {
  return (
    <motion.div
      className="skills-group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h4 className="skills-group-title">{title}</h4>
      <motion.ul
        className="skills-tags"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {items.map((name) => (
          <motion.li
            key={name}
            variants={item}
            className="skills-tag"
            whileHover={{
              scale: 1.1,
              y: -3,
              boxShadow: '0 6px 20px rgba(201, 162, 39, 0.2)',
              borderColor: 'var(--color-accent)',
            }}
          >
            {name}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

function Skills() {
  const groups = [
    { title: 'Languages', items: skills.languages },
    { title: 'Technologies', items: skills.technologies },
    { title: 'Tools', items: skills.tools },
    { title: 'Other', items: skills.other },
    { title: 'Coursework', items: skills.coursework },
  ]

  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2))
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 2))

  return (
    <SectionReveal id="skills" className="skills">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Technical <span>skills</span>
      </motion.h2>

      <div className="skills-marquee-section">
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={40} />
      </div>

      <div className="skills-grid">
        {groups.map((group, i) => (
          <SkillGroup key={group.title} title={group.title} items={group.items} index={i} />
        ))}
      </div>

      <style>{`
        .skills-marquee-section {
          margin-bottom: 2.5rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .marquee-track {
          overflow: hidden;
        }
        .marquee-inner {
          display: flex;
          gap: 0.75rem;
          width: max-content;
        }
        .marquee-tag {
          padding: 0.5rem 1rem;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.08);
          border-radius: var(--radius);
          font-size: 0.9rem;
          color: var(--color-text);
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
        }
        .skills-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .skills-group-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .skills-group-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(232, 236, 240, 0.08);
        }
        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
        }
        .skills-tag {
          padding: 0.5rem 1rem;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.08);
          border-radius: var(--radius);
          font-size: 0.9rem;
          color: var(--color-text);
          transition: box-shadow 0.2s, border-color 0.2s;
        }
      `}</style>
    </SectionReveal>
  )
}

export default Skills
