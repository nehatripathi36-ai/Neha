import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { featuredWork } from '../data/content'
import SectionReveal from './SectionReveal'
import CountUp from './CountUp'

import holyAwadhImg from '../assets/holy5.jpeg'
import balramImg from '../assets/hotel-the-balram.jpeg'
import dhanrajImg from '../assets/dhanraj-logo.png'

const imageMap = {
  'holy-awadh': holyAwadhImg,
  'balram': balramImg,
  'dhanraj-inn': dhanrajImg,
}

function TiltCard({ children, className, href }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [glare, setGlare] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -12
    const rotateY = (x - 0.5) * 12
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlare({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlare({ x: 50, y: 50 })
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out', display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <div
        className="featured-card-glare"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
        }}
      />
      {children}
    </a>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
}

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 15, stiffness: 80 },
  },
}

function FeaturedWork() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <SectionReveal id="featured" className="featured">
      <div className="featured-bg" ref={ref}>
        <motion.div className="featured-bg-shape" style={{ y: bgY }} />
      </div>

      <motion.div
        className="featured-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured work <span>— Freelancing</span></h2>
        <p className="featured-intro">
          Bespoke hotel management systems, booking engines, and digital solutions crafted for Ayodhya's hospitality industry
        </p>
      </motion.div>

      <motion.div
        className="featured-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="featured-stat">
          <span className="featured-stat-num"><CountUp target={7} suffix="+" duration={1500} /></span>
          <span className="featured-stat-label">Hotels Delivered</span>
        </div>
        <div className="featured-stat">
          <span className="featured-stat-num"><CountUp target={5000} suffix="+" duration={2000} /></span>
          <span className="featured-stat-label">Lines of Code</span>
        </div>
        <div className="featured-stat">
          <span className="featured-stat-num"><CountUp target={100} suffix="%" duration={1800} /></span>
          <span className="featured-stat-label">Client Satisfaction</span>
        </div>
      </motion.div>

      <motion.div
        className="featured-grid"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
      >
        {featuredWork.map((project, idx) => (
          <motion.div key={project.id} variants={card}>
            <TiltCard className="featured-card" href={project.link}>
              <div className="featured-card-glow" />
              <div className="featured-card-number">0{idx + 1}</div>

              <div className="featured-card-img-wrap">
                <img
                  src={imageMap[project.id]}
                  alt={project.title}
                  className="featured-card-img"
                  loading="lazy"
                />
              </div>

              <span className="featured-card-tagline">{project.tagline}</span>
              <h3 className="featured-card-title">{project.title}</h3>
              <p className="featured-card-subtitle">{project.subtitle}</p>
              <p className="featured-card-desc">{project.description}</p>
              <ul className="featured-card-tech">
                {project.tech.map((t) => (
                  <motion.li
                    key={t}
                    whileHover={{ scale: 1.1, backgroundColor: 'var(--color-accent-soft)' }}
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
              <div className="featured-card-cta">
                Visit website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.35rem' }}>
                  <path d="M7 17L17 7" /><path d="M7 7H17V17" />
                </svg>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .featured { position: relative; overflow: hidden; }
        .featured-bg {
          position: absolute;
          inset: -100px;
          pointer-events: none;
        }
        .featured-bg-shape {
          position: absolute;
          width: 600px;
          height: 600px;
          top: -200px;
          right: -200px;
          border-radius: 50%;
          background: var(--color-accent);
          filter: blur(150px);
          opacity: 0.04;
        }
        .featured-header { margin-bottom: 2rem; }
        .featured-intro {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          max-width: 600px;
          line-height: 1.7;
        }
        .featured-stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
          padding: 1.25rem 1.5rem;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.06);
          border-radius: var(--radius);
        }
        .featured-stat { text-align: center; flex: 1; min-width: 100px; }
        .featured-stat-num {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--color-accent);
          display: block;
        }
        .featured-stat-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .featured-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .featured-card {
          position: relative;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.08);
          border-radius: var(--radius-lg);
          padding: 0;
          overflow: hidden;
          will-change: transform;
        }
        .featured-card-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: var(--radius-lg);
          z-index: 3;
        }
        .featured-card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-accent), var(--color-teal), var(--color-accent));
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          z-index: 4;
        }
        .featured-card-number {
          font-family: var(--font-heading);
          font-size: 3rem;
          color: rgba(232, 236, 240, 0.04);
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          line-height: 1;
          z-index: 2;
        }

        /* Hotel image */
        .featured-card-img-wrap {
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--color-surface);
        }
        .featured-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .featured-card:hover .featured-card-img {
          transform: scale(1.08);
        }

        /* Card content below image */
        .featured-card-tagline {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          margin: 1.25rem 1.5rem 0.5rem;
        }
        .featured-card-title {
          font-size: 1.4rem;
          color: var(--color-text);
          margin: 0 1.5rem 0.25rem;
          animation: text-glow 4s ease-in-out infinite;
        }
        .featured-card-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin: 0 1.5rem 0.75rem;
        }
        .featured-card-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin: 0 1.5rem 1rem;
        }
        .featured-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          margin: 0 1.5rem 1rem;
        }
        .featured-card-tech li {
          font-size: 0.78rem;
          padding: 0.35rem 0.7rem;
          background: var(--color-surface);
          border-radius: 6px;
          color: var(--color-text-muted);
          transition: background 0.2s, scale 0.2s;
        }
        .featured-card-cta {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: var(--color-accent);
          font-weight: 500;
          margin: 0 1.5rem 1.5rem;
          transition: color 0.2s;
        }
        .featured-card:hover .featured-card-cta {
          color: var(--color-teal);
        }
      `}</style>
    </SectionReveal>
  )
}

export default FeaturedWork
