import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-accent), var(--color-teal));
          transform-origin: 0%;
          z-index: 200;
        }
      `}</style>
    </>
  )
}

export default ScrollProgress
