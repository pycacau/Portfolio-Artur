import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code2, Plus } from 'lucide-react';
import { EtheralShadow } from './ui/etheral-shadow';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    { title: 'FR Advocacia', description: 'Site institucional premium focado em autoridade jurídica.', image: '/fr.png?v=1', demo: 'https://www.roney.adv.br', tags: ['React', 'SEO'] },
    { title: 'Codexa Dev', description: 'Landing page de alta performance para agência tech.', image: '/codexa.png?v=1', demo: 'https://www.codexa.dev.br', tags: ['Next.js', 'Framer'] },
    { title: 'Urubu Ecoparque', description: 'Experiência digital imersiva para parque ecológico.', image: '/urubu.png?v=1', demo: 'https://urubuecoparque.pages.dev', tags: ['Full-Stack', 'API'] },
    { title: 'Spansiva Tecnologia', description: 'E-commerce institucional para hardware e acessórios.', image: '/spansiva.png?v=1', demo: 'https://spansiva.pages.dev', tags: ['E-commerce', 'React'] },
    { title: 'Security Lab', description: 'Análise de vulnerabilidades e segurança ofensiva.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', github: 'https://github.com/arturmaciel', tags: ['Cyber', 'Python'] },
    { title: 'Grilli Restaurant', description: 'Interface gastronômica moderna com foco em UX.', image: '/grilli.png?v=1', github: 'https://github.com/arturmaciel', tags: ['JS', 'UX/UI'] },
  ];

  // Filtra 3 projetos inicialmente no mobile para não ocupar a tela toda, ou 6 no desktop.
  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 3);

  return (
    <section id="projetos" className="py-20 md:py-32 bg-black relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <EtheralShadow color="rgba(255, 255, 255, 0.1)" animation={{ scale: 70, speed: 25 }} sizing="fill" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16 md:mb-24" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
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

        {/* Grid com Estilo Cartoon/Bordas Visíveis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                // ESTILO CARTOON: Borda branca grossa e sombra sólida
                className="group relative flex flex-col bg-black border-2 border-white rounded-none overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all duration-300"
              >
                <div className="relative aspect-video border-b-2 border-white overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-black uppercase tracking-tighter bg-white text-black px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase italic">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-tight font-medium">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Botão Ver Mais - Estilo botão de fliperama/cartoon */}
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