"use client";
import React, { useState, useEffect } from 'react';

export function MorphingTextReveal({
  texts = [],
  className = "",
  interval = 3000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState(texts[0] || "");

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
        setDisplayedText(texts[nextIndex]);
        setIsAnimating(false);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, texts, interval]);

  const splitText = displayedText.split("");

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap justify-center">
        {splitText.map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={`
              inline-block
              transition-all duration-300 ease-out
              ${isAnimating ? 'morph-char' : ''}
              ${char === ' ' ? 'w-2' : ''}
            `}
            style={{
              animationDelay: isAnimating ? `${index * 0.03}s` : '0s',
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(20px) scale(0.8)' : 'translateY(0) scale(1)',
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
