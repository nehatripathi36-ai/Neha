import { motion } from 'framer-motion'
import { profile } from '../../data/content'
import MagneticButton from '../MagneticButton'

function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-inner">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="footer-name">{profile.name}</span>
          <span className="footer-tagline">{profile.tagline}</span>
        </motion.div>
        <motion.div
          className="footer-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a href={`mailto:${profile.email}`} rel="noopener noreferrer">Email</a>
          <a href={`tel:${profile.phone}`}>Phone</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </motion.div>
        <MagneticButton className="footer-back" onClick={() => scrollTo('hero')}>
          &#8593; Back to top
        </MagneticButton>
      </div>
      <motion.p
        className="footer-copy"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        &copy; {new Date().getFullYear()} Neha Tripathi. Built with React &amp; Framer Motion.
      </motion.p>
      <style>{`
        .footer {
          background: var(--color-bg-elevated);
          border-top: 1px solid rgba(232, 236, 240, 0.06);
          padding: 3rem 1.5rem 2rem;
          margin-top: 4rem;
          position: relative;
          z-index: 1;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
          justify-content: space-between;
        }
        .footer-brand { display: flex; flex-direction: column; gap: 0.25rem; }
        .footer-name {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--color-text);
        }
        .footer-tagline { font-size: 0.9rem; color: var(--color-text-muted); }
        .footer-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .footer-links a {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          position: relative;
        }
        .footer-links a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-accent);
          transition: width 0.3s;
        }
        .footer-links a:hover::after { width: 100%; }
        .footer-links a:hover { color: var(--color-accent); }
        .footer-back {
          background: var(--color-accent-soft);
          color: var(--color-accent);
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius);
          font-size: 0.9rem;
          transition: background 0.2s, color 0.2s;
        }
        .footer-back:hover {
          background: var(--color-accent);
          color: var(--color-bg);
        }
        .footer-copy {
          max-width: 1200px;
          margin: 2rem auto 0;
          text-align: center;
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </motion.footer>
  )
}

export default Footer
