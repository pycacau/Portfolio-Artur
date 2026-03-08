"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HeroText({
  text = "ARTUR",
  className = "",
}) {
  const characters = text.split("");
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className={`relative flex flex-col items-center justify-center bg-transparent ${className}`}>
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center w-full">
          {characters.map((char, i) => (
            <div key={i} className="relative px-[0.2vw] overflow-hidden group">
              {/* Personagem Principal - Animação mantida em ambos */}
              <motion.span
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ 
                  delay: isMobile ? i * 0.03 + 0.2 : i * 0.08 + 0.5, 
                  duration: isMobile ? 0.5 : 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-[15vw] leading-none font-black text-white tracking-tighter will-change-transform will-change-opacity will-change-filter"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              {/* Camadas de Shutter - Versão simplificada no Mobile (apenas 1 camada) */}
              {isMobile ? (
                /* Mobile: Apenas uma camada de shutter leve */
                <motion.span
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ 
                    duration: 0.3, 
                    delay: i * 0.03, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0 text-[15vw] leading-none font-black text-gray-400/40 z-10 pointer-events-none"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
                >
                  {char}
                </motion.span>
              ) : (
                /* Desktop: 3 camadas completas */
                <>
                  {/* Camada Superior */}
                  <motion.span
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.08, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute inset-0 text-[15vw] leading-none font-black text-gray-400/60 z-10 pointer-events-none will-change-transform"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                  >
                    {char}
                  </motion.span>

                  {/* Camada do Meio */}
                  <motion.span
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.08 + 0.15, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute inset-0 text-[15vw] leading-none font-black text-white/80 z-10 pointer-events-none will-change-transform"
                    style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
                  >
                    {char}
                  </motion.span>

                  {/* Camada Inferior */}
                  <motion.span
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.08 + 0.3, 
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="absolute inset-0 text-[15vw] leading-none font-black text-gray-400/60 z-10 pointer-events-none will-change-transform"
                    style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
                  >
                    {char}
                  </motion.span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
