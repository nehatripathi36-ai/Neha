import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'featured', label: 'Featured Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setHidden(latest > 100 && latest > prev)
    setScrolled(latest > 50)
  })

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="navbar-inner">
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('hero') }}
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            NT
          </motion.span>
        </motion.a>

        <ul className="navbar-links">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <button
                type="button"
                className="navbar-link"
                onClick={() => scrollTo(link.id)}
              >
                <span className="navbar-link-text">{link.label}</span>
              </button>
            </motion.li>
          ))}
        </ul>

        <motion.button
          type="button"
          className="navbar-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.2 }} />
          <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} transition={{ duration: 0.15 }} />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.2 }} />
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="navbar-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.04, type: 'spring', damping: 12 }}
                >
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="navbar-mobile-link"
                  >
                    <span className="navbar-mobile-num">0{i + 1}</span>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(15, 20, 25, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(232, 236, 240, 0.04);
          transition: background 0.3s, border-color 0.3s;
        }
        .navbar-scrolled {
          background: rgba(15, 20, 25, 0.95);
          border-bottom-color: rgba(232, 236, 240, 0.08);
        }
        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.8rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar-logo {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--color-accent);
          letter-spacing: 0.02em;
          display: inline-block;
        }
        .navbar-links {
          display: none;
          list-style: none;
          gap: 0.25rem;
        }
        @media (min-width: 900px) {
          .navbar-links { display: flex; }
          .navbar-menu-btn { display: none !important; }
        }
        .navbar-link {
          background: none;
          border: none;
          color: var(--color-text-muted);
          font-size: 0.88rem;
          padding: 0.5rem 0.7rem;
          border-radius: var(--radius);
          transition: color 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .navbar-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 2px;
          background: var(--color-accent);
          border-radius: 1px;
          transition: transform 0.3s ease;
        }
        .navbar-link:hover {
          color: var(--color-accent);
        }
        .navbar-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
        .navbar-menu-btn {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 8px;
        }
        .navbar-menu-btn span {
          width: 24px;
          height: 2px;
          background: var(--color-text);
          border-radius: 1px;
          display: block;
        }
        .navbar-mobile {
          overflow: hidden;
          border-top: 1px solid rgba(232, 236, 240, 0.06);
          background: rgba(15, 20, 25, 0.98);
        }
        .navbar-mobile ul {
          list-style: none;
          padding: 1rem 1.5rem 1.5rem;
        }
        .navbar-mobile-link {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: var(--color-text);
          font-size: 1.1rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(232, 236, 240, 0.06);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: color 0.2s;
        }
        .navbar-mobile-link:hover { color: var(--color-accent); }
        .navbar-mobile-num {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          color: var(--color-accent);
          opacity: 0.5;
        }
      `}</style>
    </motion.header>
  )
}

export default Navbar
