"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HeroText({
  text = "ARTUR",
  className = "",
}) {
  const characters = text.split("");

  return (
    <div className={`relative flex flex-col items-center justify-center bg-transparent ${className}`}>
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="flex flex-wrap justify-center items-center w-full">
          {characters.map((char, i) => (
            <div key={i} className="relative px-[0.2vw] overflow-hidden group">
              {/* Personagem Principal */}
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                className="text-[15vw] leading-none font-black text-white tracking-tighter"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              {/* Camada Superior (Shutter) */}
              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: "easeInOut" }}
                className="absolute inset-0 text-[15vw] leading-none font-black text-gray-400 z-10 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
              >
                {char}
              </motion.span>

              {/* Camada do Meio (Shutter) */}
              <motion.span
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "-100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, delay: i * 0.04 + 0.1, ease: "easeInOut" }}
                className="absolute inset-0 text-[15vw] leading-none font-black text-white z-10 pointer-events-none"
                style={{ clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)" }}
              >
                {char}
              </motion.span>

              {/* Camada Inferior (Shutter) */}
              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 0.7, delay: i * 0.04 + 0.2, ease: "easeInOut" }}
                className="absolute inset-0 text-[15vw] leading-none font-black text-gray-400 z-10 pointer-events-none"
                style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)" }}
              >
                {char}
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
