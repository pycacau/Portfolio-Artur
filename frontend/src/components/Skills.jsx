import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen, Shield, Code2, Cpu } from 'lucide-react';
import { IconCloud } from './ui/interactive-icon-cloud';
import { DottedSurface } from './ui/dotted-surface';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const iconSlugs = [
    'python',
    'javascript',
    'typescript',
    'php',
    'cplusplus',
    'react',
    'nextdotjs',
    'html5',
    'css3',
    'tailwindcss',
    'nodedotjs',
    'express',
    'fastapi',
    'laravel',
    'mysql',
    'postgresql',
    'mongodb',
    'git',
    'linux',
    'ubuntu',
    'gnubash',
    'vscodium',
    'postman',
    'nginx',
    'docker',
    'github',
  ];

  const educationFeatures = [
    {
      title: 'Tecnico em Informatica',
      icon: GraduationCap,
      description: 'EEEP Deputado Jose Maria Melo - foco em fundamentos de redes e hardware.',
    },
    {
      title: 'ADS',
      icon: Code2,
      description: 'FIAP - bacharelado com foco em arquitetura de sistemas e escalabilidade.',
    },
    {
      title: 'Cyberseguranca',
      icon: Shield,
      description: 'FIAP - especializacao em ethical hacking e defesa de infraestrutura.',
    },
    {
      title: 'Ciencias da Computacao',
      icon: BookOpen,
      description: 'Estudos autodidatas baseados no curriculo da UFC e open source.',
    },
  ];

  return (
    <section id="skills" className="py-24 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-0 right-0 h-[500px] z-0 opacity-20 pointer-events-none">
        <DottedSurface theme="dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <div className="flex justify-center items-center gap-2 text-white/40 mb-6 font-mono text-[10px] uppercase tracking-[0.4em]">
            <Cpu size={12} />
            <span>Expertise Tecnica</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none italic uppercase">
            STACK & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">FORMACAO</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
          <motion.div
            className="lg:col-span-5 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-[400px] md:max-w-[450px]">
              <IconCloud iconSlugs={iconSlugs} />
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {educationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group relative bg-black border-2 border-white p-3 sm:p-6 rounded-none transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white text-black border-2 border-white flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                    <feature.icon size={16} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-xs sm:text-xl font-black text-white mb-1 sm:mb-2 tracking-tight sm:tracking-tighter uppercase italic leading-tight">
                    {feature.title}
                  </h3>

                  <p className="text-[11px] sm:text-sm text-gray-400 font-medium leading-tight">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 p-5 border-2 border-white bg-white text-black flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="h-3 w-3 rounded-none bg-black animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest">
                Status: focado em arquitetura de microservicos e IA.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
