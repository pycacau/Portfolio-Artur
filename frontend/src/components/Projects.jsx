import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code2, Plus } from 'lucide-react';
import { EtheralShadow } from './ui/etheral-shadow';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const Projects = () => {
  const { isMobile, lowMotion, reduceMotion } = useDevicePerformance();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    {
      title: 'FR Advocacia',
      description: 'Site institucional premium focado em autoridade juridica.',
      image: '/fr.png?v=1',
      demo: 'https://www.roney.adv.br',
      tags: ['React', 'SEO'],
    },
    {
      title: 'Diamond Iphones',
      description: 'Loja digital com foco em iPhones, acessorios e conversao.',
      image: '/diamondiphones.png?v=1',
      demo: 'https://diamondiphones.pages.dev',
      tags: ['E-commerce', 'React'],
    },
    {
      title: 'Urubu Ecoparque',
      description: 'Experiencia digital imersiva para parque ecologico.',
      image: '/urubu.png?v=1',
      demo: 'https://urubuecoparque.pages.dev',
      tags: ['Full-Stack', 'API'],
    },
    {
      title: 'Spansiva Tecnologia',
      description: 'E-commerce institucional para hardware e acessorios.',
      image: '/spansiva.png?v=1',
      demo: 'https://spansiva.pages.dev',
      tags: ['E-commerce', 'React'],
    },
    {
      title: 'Codexa Dev',
      description: 'Landing page de alta performance para agencia tech.',
      image: '/codexa.png?v=1',
      demo: 'https://www.codexa.dev.br',
      tags: ['Next.js', 'Framer'],
    },
    {
      title: 'New Collection Store',
      description: 'Loja virtual de moda com foco em experiencia e conversao.',
      image: '/newcollection.png?v=1',
      demo: 'https://newcollection.pages.dev/',
      tags: ['E-commerce', 'React'],
    },
  ];

  const initialVisibleProjects = isMobile ? 4 : 3;
  const displayedProjects = showAll ? allProjects : allProjects.slice(0, initialVisibleProjects);

  return (
    <section id="projetos" className="py-20 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      {!reduceMotion && !lowMotion && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <EtheralShadow
            color="rgba(255, 255, 255, 0.1)"
            animation={{ scale: 70, speed: 25 }}
            sizing="fill"
          />
        </div>
      )}
      {!reduceMotion && lowMotion && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.08),transparent_42%)]"
          animate={{ opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={reduceMotion ? false : { opacity: 0, y: lowMotion ? 10 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={reduceMotion ? undefined : { duration: lowMotion ? 0.3 : 0.5 }}
        >
          <div className="flex justify-center items-center gap-2 text-white/40 mb-4 font-mono text-[10px] uppercase tracking-[0.4em]">
            <Code2 size={12} />
            <span>Showcase Profissional</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none">
            PROJETOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              REALIZADOS
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-10">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout={!reduceMotion && !lowMotion}
                initial={reduceMotion ? false : lowMotion ? { opacity: 0, y: 12 } : { opacity: 0, scale: 0.9 }}
                animate={reduceMotion ? { opacity: 1 } : lowMotion ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : lowMotion ? { opacity: 0, y: 8 } : { opacity: 0, scale: 0.9 }}
                transition={reduceMotion ? { duration: 0.2 } : lowMotion ? { duration: 0.25, delay: index * 0.04 } : { duration: 0.4, delay: index * 0.1 }}
                className="group relative flex flex-col bg-black border-2 border-white rounded-none overflow-hidden hover:translate-x-[-2px] hover:translate-y-[-2px] sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-300"
              >
                <div className="relative aspect-video border-b-2 border-white overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 sm:p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition"
                      >
                        <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 sm:p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition"
                      >
                        <Github size={16} className="sm:w-5 sm:h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-3 sm:p-6">
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[8px] sm:text-[10px] font-black uppercase tracking-tighter bg-white text-black px-1.5 sm:px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm sm:text-2xl font-black text-white mb-1 sm:mb-2 uppercase italic leading-tight">{project.title}</h3>
                  <p className="text-[11px] sm:text-sm leading-tight font-medium text-gray-400">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && (
          <div className="text-center mt-20">
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-tighter border-2 border-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              Carregar Mais Projetos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
