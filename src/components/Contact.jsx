import { motion } from 'framer-motion'
import { profile } from '../data/content'
import SectionReveal from './SectionReveal'
import MagneticButton from './MagneticButton'

const links = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7L12 13L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    href: `tel:${profile.phone}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: profile.github,
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
]

function Contact() {
  return (
    <SectionReveal id="contact" className="contact">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Get in <span>touch</span>
      </motion.h2>

      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="contact-heading">Let's work together</p>
        <p className="contact-intro">{profile.address}</p>
      </motion.div>

      <motion.div
        className="contact-links"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="contact-link"
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, type: 'spring', damping: 12 }}
            whileHover={{
              y: -6,
              borderColor: 'var(--color-accent)',
              boxShadow: '0 12px 30px rgba(201, 162, 39, 0.15)',
            }}
          >
            <span className="contact-link-icon">{link.icon}</span>
            <span className="contact-link-label">{link.label}</span>
            <span className="contact-link-value">
              {link.label === 'Email' ? profile.email :
               link.label === 'Phone' ? profile.phone :
               link.label}
            </span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="contact-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <MagneticButton className="contact-cta-btn" onClick={() => window.location.href = `mailto:${profile.email}`}>
          Send me a message &#8594;
        </MagneticButton>
      </motion.div>

      <style>{`
        .contact-content { margin-bottom: 2rem; }
        .contact-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        .contact-intro {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          max-width: 500px;
        }
        .contact-links {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 600px) {
          .contact-links { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .contact-links { grid-template-columns: repeat(4, 1fr); }
        }
        .contact-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
          background: var(--color-bg-elevated);
          border: 1px solid rgba(232, 236, 240, 0.08);
          border-radius: var(--radius-lg);
          color: var(--color-text);
          text-align: center;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-link-icon {
          color: var(--color-accent);
          transition: transform 0.3s;
        }
        .contact-link:hover .contact-link-icon {
          transform: scale(1.15) translateY(-2px);
        }
        .contact-link-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
        }
        .contact-link-value {
          font-size: 0.85rem;
          color: var(--color-text);
          word-break: break-all;
        }
        .contact-cta { text-align: center; }
        .contact-cta-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, var(--color-accent), #d4a83a);
          color: var(--color-bg);
          border: none;
          border-radius: var(--radius);
          font-size: 1rem;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(201, 162, 39, 0.25);
          transition: box-shadow 0.3s;
        }
        .contact-cta-btn:hover {
          box-shadow: 0 8px 30px rgba(201, 162, 39, 0.4);
        }
      `}</style>
    </SectionReveal>
  )
}

export default Contact
