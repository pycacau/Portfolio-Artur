import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen, Shield, Code2, Award, ArrowRight } from 'lucide-react';
import { IconCloud } from './ui/interactive-icon-cloud';
import { FeatureCard } from './ui/grid-feature-cards';
import { DottedSurface } from './ui/dotted-surface';
import { Link } from 'react-router-dom';

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
    'gnubash',
    'vscodium',
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
    <section id="skills" className="py-24 bg-black relative overflow-hidden min-h-screen" ref={ref}>
      {/* Dotted Surface Background - APENAS EMBAIXO */}
      <div className="absolute bottom-0 left-0 right-0 h-80 z-0 opacity-40">
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
          {/* IconCloud - Nuvem 3D de Ícones SEM FUNDO */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={
              inView
                ? { opacity: 1, x: 0, y: [0, -8, 0] }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="relative flex w-full items-center justify-center overflow-visible px-4 pb-4 pt-0 -mt-6 md:-mt-10">
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
            
            {/* Link para Certificados */}
            <motion.div
              className="sm:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link to="/certificados" data-testid="certificates-link">
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Ver Certificados & Diplomas</h3>
                        <p className="text-sm text-gray-400">Confira minhas certificações</p>
                      </div>
                    </div>
                    <motion.div
                      className="text-white/60 group-hover:text-white transition-colors"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
