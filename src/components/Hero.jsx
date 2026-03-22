import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data/content'
import MagneticButton from './MagneticButton'
import CountUp from './CountUp'
import nehaPhoto from '../assets/neha.jpeg'

const letterVariant = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.04,
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  }),
}

const roles = [
  'Full-Stack Developer',
  'Website Developer',
  'Hotel Tech Specialist',
  'Freelancer',
]

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pause = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    let timeout

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + (isDeleting ? -1 : 1)))
      }, isDeleting ? deletingSpeed : typingSpeed)
    }
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return text
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacityScroll = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleScroll = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const typed = useTypewriter(roles)
  const nameChars = profile.name.split('')

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero-bg">
        <motion.div
          className="hero-shape hero-shape-1"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-shape hero-shape-2"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-shape hero-shape-3"
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-shape hero-shape-4"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero-grid-overlay" />
        <div className="hero-gradient" />
      </div>

      <motion.div
        className="hero-content"
        style={{ y: yParallax, opacity: opacityScroll, scale: scaleScroll }}
      >
        <div className="hero-two-col">
          {/* Photo column */}
          <motion.div
            className="hero-photo-col"
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring', damping: 15 }}
          >
            <motion.div
              className="hero-photo-wrap"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="hero-photo-ring" />
              <div className="hero-photo-ring hero-photo-ring-2" />
              <img src={nehaPhoto} alt="Neha Tripathi" className="hero-photo" />
            </motion.div>
          </motion.div>

          {/* Text column */}
          <div className="hero-text-col">
            <motion.p
              className="hero-greeting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Hi, I'm
            </motion.p>

            <h1 className="hero-name" style={{ perspective: '600px' }}>
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariant}
                  initial="hidden"
                  animate="show"
                  className="hero-name-char"
                  whileHover={{ scale: 1.2, color: 'var(--color-accent)', transition: { duration: 0.15 } }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            <motion.div
              className="hero-typed-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="hero-typed">{typed}</span>
              <span className="hero-cursor">|</span>
            </motion.div>

            <motion.p
              className="hero-location"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              {profile.location}
            </motion.p>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <div className="hero-stat">
                <span className="hero-stat-number"><CountUp target={7} suffix="+" duration={1500} /></span>
                <span className="hero-stat-label">Hotel Projects</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number"><CountUp target={2} suffix="+" duration={1200} /></span>
                <span className="hero-stat-label">Years Exp</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number"><CountUp target={10} suffix="+" duration={1800} /></span>
                <span className="hero-stat-label">Projects</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.6 }}
            >
              <MagneticButton
                className="hero-btn hero-btn-primary"
                onClick={() => scrollTo('featured')}
              >
                <span className="hero-btn-text">View Featured Work</span>
                <span className="hero-btn-arrow">&#8594;</span>
              </MagneticButton>
              <MagneticButton
                className="hero-btn hero-btn-secondary"
                onClick={() => scrollTo('contact')}
              >
                Get in touch
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="hero-scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll down</span>
        </motion.div>
      </motion.div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-top: 80px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, var(--color-accent-soft) 0%, transparent 50%),
                      radial-gradient(ellipse 60% 40% at 80% 60%, var(--color-teal-soft) 0%, transparent 45%);
          pointer-events: none;
        }
        .hero-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(232, 236, 240, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232, 236, 240, 0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .hero-shape-1 { width: 500px; height: 500px; top: -150px; right: -100px; background: var(--color-accent); }
        .hero-shape-2 { width: 400px; height: 400px; bottom: 5%; left: -120px; background: var(--color-teal); }
        .hero-shape-3 { width: 250px; height: 250px; top: 40%; left: 20%; background: var(--color-accent); }
        .hero-shape-4 { width: 200px; height: 200px; top: 20%; right: 25%; background: var(--color-teal); }
        .hero-content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          padding: 0 1.5rem;
        }

        /* Two-column layout */
        .hero-two-col {
          display: flex;
          align-items: center;
          gap: 3rem;
          margin-bottom: 2rem;
        }
        @media (max-width: 767px) {
          .hero-two-col {
            flex-direction: column;
            text-align: center;
          }
        }
        @media (min-width: 768px) {
          .hero-text-col { text-align: left; }
          .hero-name { justify-content: flex-start; }
          .hero-typed-wrap { justify-content: flex-start; }
          .hero-stats { justify-content: flex-start; }
          .hero-cta { justify-content: flex-start; }
        }

        /* Photo */
        .hero-photo-col {
          flex-shrink: 0;
        }
        .hero-photo-wrap {
          position: relative;
          width: 220px;
          height: 220px;
        }
        @media (min-width: 768px) {
          .hero-photo-wrap { width: 280px; height: 280px; }
        }
        .hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          position: relative;
          z-index: 2;
          border: 3px solid rgba(201, 162, 39, 0.3);
        }
        .hero-photo-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 2px solid rgba(201, 162, 39, 0.15);
          animation: pulse-ring 3s ease-out infinite;
        }
        .hero-photo-ring-2 {
          inset: -16px;
          border-color: rgba(45, 212, 191, 0.1);
          animation-delay: 1.5s;
        }

        /* Text */
        .hero-text-col { flex: 1; min-width: 0; }
        .hero-greeting {
          font-size: 1.2rem;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 300;
        }
        .hero-name {
          font-size: clamp(2.4rem, 7vw, 4.5rem);
          color: var(--color-text);
          margin-bottom: 0.75rem;
          letter-spacing: 0.02em;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hero-name-char {
          display: inline-block;
          transition: color 0.2s;
        }
        .hero-typed-wrap {
          height: 2rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        .hero-typed {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--color-accent);
          font-weight: 500;
        }
        .hero-cursor {
          font-size: 1.4rem;
          color: var(--color-accent);
          animation: blink 0.8s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-location {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .hero-stat { text-align: center; }
        .hero-stat-number {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.6rem;
          color: var(--color-accent);
          animation: text-glow 3s ease-in-out infinite;
        }
        .hero-stat-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .hero-stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(232, 236, 240, 0.15);
        }
        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }
        .hero-btn {
          padding: 0.9rem 2rem;
          border-radius: var(--radius);
          font-size: 1rem;
          font-weight: 500;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .hero-btn-primary {
          background: linear-gradient(135deg, var(--color-accent), #d4a83a);
          color: var(--color-bg);
          box-shadow: 0 4px 20px rgba(201, 162, 39, 0.25);
        }
        .hero-btn-primary:hover {
          box-shadow: 0 8px 30px rgba(201, 162, 39, 0.4);
        }
        .hero-btn-arrow {
          transition: transform 0.3s;
        }
        .hero-btn-primary:hover .hero-btn-arrow {
          transform: translateX(4px);
        }
        .hero-btn-secondary {
          background: transparent;
          color: var(--color-text);
          border: 2px solid rgba(232, 236, 240, 0.2);
        }
        .hero-btn-secondary:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 2rem;
        }
        .scroll-mouse {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(232, 236, 240, 0.3);
          border-radius: 12px;
          position: relative;
        }
        .scroll-wheel {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 2px;
          animation: scroll-wheel-move 1.5s ease-in-out infinite;
        }
        @keyframes scroll-wheel-move {
          0% { opacity: 1; top: 6px; }
          100% { opacity: 0; top: 20px; }
        }
      `}</style>
    </section>
  )
}

export default Hero
