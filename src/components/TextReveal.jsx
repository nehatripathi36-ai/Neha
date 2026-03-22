import { motion } from 'framer-motion'

function TextReveal({ children, className, delay = 0, as = 'div' }) {
  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')
  const Tag = motion[as] || motion.div

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  }

  const wordVariant = {
    hidden: { opacity: 0, y: 20, rotateX: -60 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  }

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em', perspective: '600px' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          style={{ display: 'inline-block', transformOrigin: 'top' }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

export default TextReveal
