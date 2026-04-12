import React, { Suspense, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const EtheralShadow = React.lazy(() =>
  import('./ui/etheral-shadow').then((mod) => ({ default: mod.EtheralShadow }))
);
import HeroText from './ui/hero-shutter-text';
import DecryptedText from './DecryptedText';
import WetPaintButton from './ui/wet-paint-button';
import { FlowButton } from './ui/flow-button';

const Hero = () => {
  const { lowMotion, reduceMotion } = useDevicePerformance();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const subtitle =
    'DESENVOLVEDOR FULL-STACK ESPECIALISTA ECOSSISTEMAS DIGITAIS DE ALTA PERFORMANCE E INTERFACES INTELIGENTES.';

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden bg-black flex-col px-4">
      {!reduceMotion && !lowMotion ? (
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
      ) : (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.12),transparent_45%)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.25, 0.38, 0.25],
                  scale: [1, 1.03, 1],
                }
          }
          transition={reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.div
        className="relative z-20 text-center w-full max-w-5xl mx-auto flex flex-col items-center"
        style={reduceMotion ? undefined : { opacity }}
      >
        <div className="mb-4 select-none scale-[0.8] md:scale-[0.6] lg:scale-[0.75] origin-center">
          <HeroText text="ARTUR" lightMode={lowMotion} />
        </div>

        <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center mb-10 md:mb-14">
          {reduceMotion ? (
            <p className="text-xs md:text-sm text-white font-mono tracking-[0.2em] max-w-xl md:max-w-2xl leading-relaxed uppercase opacity-60">
              {subtitle}
            </p>
          ) : lowMotion ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-xs md:text-sm text-white font-mono tracking-[0.2em] max-w-xl md:max-w-2xl leading-relaxed uppercase"
            >
              {subtitle}
            </motion.p>
          ) : (
            <DecryptedText
              text={subtitle}
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
          )}
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-5 md:gap-6 justify-center items-center w-full max-w-md"
          initial={reduceMotion ? false : lowMotion ? { opacity: 0, y: 8 } : { opacity: 0 }}
          animate={reduceMotion ? undefined : lowMotion ? { opacity: 1, y: 0 } : { opacity: 1 }}
          transition={reduceMotion ? undefined : lowMotion ? { duration: 0.45, delay: 0.1 } : { duration: 1.2, delay: 1 }}
        >
          <div className="w-full sm:w-auto scale-90 md:scale-100">
            <WetPaintButton
              disableDrips={reduceMotion}
              lightDrips={lowMotion}
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
        animate={reduceMotion ? undefined : lowMotion ? { y: [0, 2, 0] } : { y: [0, 5, 0] }}
        transition={reduceMotion ? undefined : lowMotion ? { duration: 5, repeat: Infinity } : { duration: 4, repeat: Infinity }}
      >
        <ArrowDown size={16} className="text-white/10" />
      </motion.div>
    </section>
  );
};

export default memo(Hero);
