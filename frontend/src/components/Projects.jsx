import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { EtheralShadow } from './ui/etheral-shadow';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      title: 'FR Advocacia Especializada',
      description:
        'Site institucional profissional para escritório de advocacia, com foco em credibilidade, conversão de clientes e responsividade.',
      image: '/fr.png',
      demo: 'https://www.roney.adv.br',
      tags: ['React', 'Tailwind', 'Responsive'],
    },
    {
      title: 'Codexa Dev',
      description:
        'Site corporativo da agência Codexa, com gradientes modernos, formulário interativo de orçamento e foco em conversão.',
      image: '/codexa.png',
      demo: 'https://www.codexa.dev.br',
      tags: ['Next.js', 'Design Moderno', 'Forms'],
    },
    {
      title: 'Urubu Ecoparque',
      description:
        'Website oficial do parque ecológico com design moderno, galeria de fotos, cardápio completo, com API.',
      image: '/urubu.png',
      demo: 'https://urubuecoparque.pages.dev',
      tags: ['Full-Stack', 'API', 'Gallery'],
    },
    {
      title: 'Spansiva Tecnologia Aplicada',
      description:
        'Site institucional moderno para loja de tecnologia, com foco em PCs gamer, impressoras e acessórios premium.',
      image: '/spansiva.png',
      demo: 'https://spansiva.pages.dev',
      tags: ['E-commerce', 'React', 'SEO'],
    },
    {
      title: 'Pentest Project',
      description:
        'Projeto focado em técnicas de ethical hacking e análise de vulnerabilidades, com documentação.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      github: 'https://github.com/arturmaciel',
      tags: ['Security', 'Python', 'Pentest'],
    },
    {
      title: 'Grilli Restaurant',
      description:
        'Site moderno de restaurante totalmente responsivo, construído com HTML, CSS e JavaScript.',
      image: '/grilli.png',
      github: 'https://github.com/arturmaciel',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projetos" className="py-32 bg-black relative overflow-hidden" ref={ref}>
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <EtheralShadow
          color="rgba(120, 120, 120, 0.9)"
          animation={{ scale: 50, speed: 35 }}
          noise={{ opacity: 0.45, scale: 1.1 }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Portfólio
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Projetos em<br />
            <span className="text-gray-300">Destaque</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Soluções desenvolvidas com excelência e foco em resultados
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`project-card-${index}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transform hover:scale-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visitar
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transform hover:scale-105 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      Código
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-3 py-1 bg-white/10 text-white/80 rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && projects.length > 6 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-lg rounded-full group"
              onClick={() => setShowAll(true)}
              data-testid="show-all-projects-btn"
            >
              Ver Todos os Projetos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
