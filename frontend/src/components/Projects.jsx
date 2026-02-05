import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

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
      image: 'https://www.arturmaciel.com.br/fr.png',
      demo: 'https://fradv.com.br',
      tags: ['React', 'Tailwind', 'Responsive'],
    },
    {
      title: 'Codexa Dev',
      description:
        'Site corporativo da agência Codexa, com gradientes modernos, formulário interativo de orçamento e foco em conversão.',
      image: 'https://www.arturmaciel.com.br/codexa.png',
      demo: 'https://codexa.com.br',
      tags: ['Next.js', 'Design Moderno', 'Forms'],
    },
    {
      title: 'Urubu Ecoparque',
      description:
        'Website oficial do parque ecológico com design moderno, galeria de fotos, cardápio completo, com API.',
      image: 'https://www.arturmaciel.com.br/urubu-ecopark.jpg',
      demo: 'https://urubuecoparque.com.br',
      tags: ['Full-Stack', 'API', 'Gallery'],
    },
    {
      title: 'Spansiva Tecnologia Aplicada',
      description:
        'Site institucional moderno para loja de tecnologia, com foco em PCs gamer, impressoras e acessórios premium.',
      image: 'https://www.arturmaciel.com.br/spansiva.png',
      demo: 'https://spansiva.com.br',
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
      image: 'https://www.arturmaciel.com.br/grilli-restaurant.png',
      github: 'https://github.com/arturmaciel',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projetos" className="py-32 bg-gray-50 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Portfólio
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Projetos em<br />
            <span className="text-gray-400">Destaque</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Soluções desenvolvidas com excelência e foco em resultados
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
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
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
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
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300 px-8 py-6 text-lg rounded-full group"
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