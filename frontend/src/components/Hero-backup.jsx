import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { EtheralShadow } from './ui/etheral-shadow';
import HeroText from "./ui/hero-shutter-text";

const Hero = () => {
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <EtheralShadow
          color="rgba(128, 128, 128, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      <motion.div 
        className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        style={{ opacity, scale }}
      >
        {/* Container para o HeroText com as classes de tamanho corrigidas */}
        <div className="mb-6">
          <HeroText
            text="ARTUR"
            className="text-8xl md:text-9xl font-bold text-white tracking-tighter"
            tag="h1"
            delay={50}
            duration={1.25}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Desenvolvendo soluções digitais modernas, rápidas e seguras para alavancar negócios.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <Button
            size="lg"
            className="bg-white text-black hover:scale-105 transition-transform px-8 py-6 text-lg font-semibold"
            onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Projetos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-black transition-all px-8 py-6 text-lg font-semibold"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Entre em Contato
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
      >
        <ArrowDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  );
};

export default Hero;
