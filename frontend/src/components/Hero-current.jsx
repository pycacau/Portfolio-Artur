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
        className="relative z-20 text-center px-6 w-full max-w-7xl mx-auto"
        style={{ opacity, scale }}
      >
        {/* O NOVO TÍTULO COM ANIMAÇÃO SHUTTER */}
        <div className="mb-4">
          <HeroText text="ARTUR" />
        </div>

        <motion.p
          className="text-xl md:text-3xl text-gray-400 mb-12 max-w-2xl mx-auto leading-tight font-medium tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Desenvolvendo soluções digitais modernas, rápidas e seguras.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-black hover:bg-gray-200 px-12 py-8 text-xl font-bold rounded-2xl shadow-2xl"
            onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Projetos
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white hover:text-black px-12 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contato
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
      >
        <ArrowDown className="w-10 h-10 text-white/20" />
      </motion.div>
    </section>
  );
};

export default Hero;
