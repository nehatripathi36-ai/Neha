import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 20, stiffness: 300 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)

    const handleHoverStart = () => setHovered(true)
    const handleHoverEnd = () => setHovered(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)

    const interval = setInterval(() => {
      const hoverables = document.querySelectorAll('a, button, .featured-card, .projects-card, .skills-tag, .contact-link')
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart)
        el.addEventListener('mouseleave', handleHoverEnd)
      })
    }, 2000)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      clearInterval(interval)
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x,
          y,
          opacity: visible ? 1 : 0,
          scale: hovered ? 2.5 : 1,
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x,
          y,
          opacity: visible ? 1 : 0,
          scale: hovered ? 1.8 : 1,
        }}
      />
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
        .cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }
        .cursor-ring {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border: 1.5px solid rgba(201, 162, 39, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: difference;
        }
        @media (pointer: coarse) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
    </>
  )
}

export default CustomCursor
