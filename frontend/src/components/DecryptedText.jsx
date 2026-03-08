import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isDeciphering, setIsDeciphering] = useState(false)
  const [revealIndex, setRevealIndex] = useState(sequential ? 0 : -1)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    let interval
    if (isDeciphering) {
      let iteration = 0
      const timeout = sequential ? 0 : maxIterations

      interval = setInterval(() => {
        setDisplayText((prevText) =>
          text
            .split('')
            .map((char, index) => {
              if (sequential) {
                if (revealDirection === 'start' && index < revealIndex) return text[index]
                if (revealDirection === 'end' && index > text.length - 1 - revealIndex) return text[index]
                if (revealDirection === 'center') {
                  const middle = Math.floor(text.length / 2)
                  const offset = Math.floor(revealIndex / 2)
                  if (index >= middle - offset && index <= middle + offset) return text[index]
                }
              } else {
                if (iteration >= maxIterations) return text[index]
              }

              if (char === ' ') return ' '
              if (useOriginalCharsOnly) {
                const availableChars = text.replace(/\s/g, '').split('')
                return availableChars[Math.floor(Math.random() * availableChars.length)]
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
        )

        iteration++
        if (sequential) {
          setRevealIndex((prev) => prev + 1)
          if (revealIndex > text.length) {
            clearInterval(interval)
            setIsDeciphering(false)
          }
        } else {
          if (iteration >= maxIterations) {
            clearInterval(interval)
            setIsDeciphering(false)
          }
        }
      }, speed)
    } else {
      setDisplayText(text)
    }

    return () => clearInterval(interval)
  }, [isDeciphering, revealIndex, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly])

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsDeciphering(true)
            setHasAnimated(true)
          }
        },
        { threshold: 0.1 }
      )
      if (containerRef.current) observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [animateOn, hasAnimated])

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovering(true)
      setIsDeciphering(true)
      setRevealIndex(0)
    }
  }

  const handleMouseLeave = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovering(false)
      setIsDeciphering(false)
      setRevealIndex(sequential ? 0 : -1)
    }
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...props}
    >
      {displayText.split('').map((char, index) => {
        const isRevealed =
          sequential &&
          ((revealDirection === 'start' && index < revealIndex) ||
            (revealDirection === 'end' && index > text.length - 1 - revealIndex) ||
            (revealDirection === 'center' &&
              index >= Math.floor(text.length / 2) - Math.floor(revealIndex / 2) &&
              index <= Math.floor(text.length / 2) + Math.floor(revealIndex / 2)))

        return (
          <span key={index} className={isRevealed || !isDeciphering ? className : encryptedClassName}>
            {char}
          </span>
        )
      })}
    </span>
  )
}
