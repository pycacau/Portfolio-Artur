"use client";
import React, { useState, useEffect } from 'react';

export function MorphingTextReveal({
  texts = [],
  className = "",
  interval = 12000, // Aumentado para leitura mais tranquila
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState(texts[0] || "");
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
        setDisplayedText(texts[nextIndex]);
        setIsAnimating(false);
      }, isMobile ? 150 : 200); // Transição mais suave
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, texts, interval, isMobile]);

  const splitText = displayedText.split("");

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap justify-center">
        {splitText.map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={`
              inline-block
              transition-transform transition-opacity
              duration-300 ease-out
              will-change-transform will-change-opacity
              ${isAnimating ? 'morph-char' : ''}
              ${char === ' ' ? 'w-2' : ''}
            `}
            style={{
              animationDelay: isAnimating ? `${index * (isMobile ? 0.02 : 0.03)}s` : '0s', // Mais lento
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(10px) scale(0.95)' : 'translateY(0) scale(1)', // Movimento reduzido
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MorphingTextReveal;
