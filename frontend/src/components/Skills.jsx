import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen, Shield, Code2 } from 'lucide-react';
import { IconCloud } from './ui/interactive-icon-cloud';
import { FeatureCard } from './ui/grid-feature-cards';
import { DottedSurface } from './ui/dotted-surface';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Slugs das tecnologias do Artur (compatíveis com SimpleIcons)
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
    'bash',
    'visualstudiocode',
    'postman',
    'nginx',
    'docker',
    'github',
  ];

  const educationFeatures = [
    {
      title: 'Técnico em Informática',
      icon: GraduationCap,
      description: 'EEEP Deputado José Maria Melo - Ensino Médio Técnico',
    },
    {
      title: 'Superior em Análise e Desenvolvimento de Sistemas',
      icon: Code2,
      description: 'FIAP - Cursando Bacharelado',
    },
    {
      title: 'Cybersegurança - Hacking e Pentest',
      icon: Shield,
      description: 'FIAP - Curso',
    },
    {
      title: 'Ciências da Computação - Autodidata',
      icon: BookOpen,
      description: 'UFC - Github',
    },
  ];

  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden" ref={ref}>
      {/* Dotted Surface Background - Embaixo na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-96 z-0">
        <DottedSurface theme="dark" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Tecnologias & Formação</h2>
          <p className="text-xl text-gray-400">Stack moderna e educação contínua</p>
        </motion.div>

        {/* Grid com IconCloud e Formações lado a lado */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* IconCloud - Nuvem 3D de Ícones */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-black px-4 pb-8 pt-8">
              <IconCloud iconSlugs={iconSlugs} />
            </div>
          </motion.div>

          {/* Formações - Grid Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {educationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;