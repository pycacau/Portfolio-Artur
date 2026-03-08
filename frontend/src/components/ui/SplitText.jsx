'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  duration = 0.8,
  textAlign = "center",
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const letters = text.split("");

  return (
    <h1 ref={ref} className={`inline-block ${className}`} style={{ textAlign }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: duration,
            delay: i * (delay / 1000),
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}