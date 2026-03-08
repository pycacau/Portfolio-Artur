import React, { Suspense, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const EtheralShadow = React.lazy(() => import('./ui/etheral-shadow').then(mod => ({ default: mod.EtheralShadow })));
import HeroText from './ui/hero-shutter-text';
import DecryptedText from './DecryptedText'; 
import WetPaintButton from './ui/wet-paint-button';
import { FlowButton } from './ui/flow-button';

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-black flex-col px-4">
      {/* Background sutil */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <Suspense fallback={null}>
          <EtheralShadow
            color="rgba(255, 255, 255, 0.3)"
            animation={{ scale: 25, speed: 30 }}
            noise={{ opacity: 0.1, scale: 1.0 }}
            sizing="fill"
          />
        </Suspense>
      </div>

      <motion.div 
        className="relative z-20 text-center w-full max-w-5xl mx-auto flex flex-col items-center"
        style={{ opacity }}
      >
        {/* TÍTULO: Mobile maior para foco, Desktop menor */}
        <div className="mb-4 select-none scale-[0.8] md:scale-[0.6] lg:scale-[0.75] origin-center">
          <HeroText text="ARTUR" />
        </div>

        {/* SUBTÍTULO: Mobile menor para equilíbrio */}
        <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center mb-10 md:mb-14">
          <DecryptedText
            text="DESENVOLVEDOR FULL-STACK ESPECIALISTA ECOSSISTEMAS DIGITAIS DE ALTA PERFORMANCE E INTERFACES INTELIGENTES."
            animateOn="view"
            revealDirection="start"
            sequential={true}
            speed={50}
            maxIterations={25}
            characters="010101ABCDEFGHJKLMNOPQRSTUVWXYZ#$@&*"
            className="text-xs md:text-sm text-white font-mono tracking-[0.2em] max-w-xl md:max-w-2xl leading-relaxed uppercase"
            parentClassName="opacity-60"
            encryptedClassName="text-white/40 font-bold"
          />
        </div>

        {/* BOTÕES */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center items-center w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <div className="w-full sm:w-auto scale-90 md:scale-100">
            <WetPaintButton
              onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full text-xs md:text-sm font-bold py-3 px-8 tracking-widest uppercase"
            >
              Ver Projetos
            </WetPaintButton>
          </div>

          <div className="w-full sm:w-auto scale-90 md:scale-100">
            <FlowButton 
              text="Vamos Conversar?" 
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 md:py-4 px-8 text-xs md:text-sm font-bold border-white/10"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <ArrowDown size={16} className="text-white/10" />
      </motion.div>
    </section>
  );
};

export default memo(Hero);