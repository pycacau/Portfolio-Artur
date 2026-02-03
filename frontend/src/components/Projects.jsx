import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
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
      tags: 'React · Tailwind · Responsive',
    },
    {
      title: 'Codexa Dev',
      description:
        'Site corporativo da agência Codexa, com gradientes modernos, formulário interativo de orçamento e foco em conversão.',
      image: 'https://www.arturmaciel.com.br/codexa.png',
      demo: 'https://codexa.com.br',
      tags: 'Next.js · Design Moderno · Forms',
    },
    {
      title: 'Urubu Ecoparque',
      description:
        'Website oficial do parque ecológico com design moderno, galeria de fotos, cardápio completo, com API.',
      image: 'https://www.arturmaciel.com.br/urubu-ecopark.jpg',
      demo: 'https://urubuecoparque.com.br',
      tags: 'Full-Stack · API · Gallery',
    },
    {
      title: 'Spansiva Tecnologia Aplicada',
      description:
        'Site institucional moderno para loja de tecnologia, com foco em PCs gamer, impressoras e acessórios premium. Design responsivo e otimizado para conversão.',
      image: 'https://www.arturmaciel.com.br/spansiva.png',
      demo: 'https://spansiva.com.br',
      tags: 'E-commerce · React · SEO',
    },
    {
      title: 'Pentest Project',
      description:
        'Projeto focado em técnicas de ethical hacking e análise de vulnerabilidades, com documentação de processos.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      github: 'https://github.com/arturmaciel',
      tags: 'Security · Python · Pentest',
    },
    {
      title: 'Grilli Restaurant',
      description:
        'Site moderno de restaurante totalmente responsivo, construído com HTML, CSS e JavaScript. Design elegante com foco em apresentar cardápio, ambiente e experiência gastronômica.',
      image: 'https://www.arturmaciel.com.br/grilli-restaurant.png',
      github: 'https://github.com/arturmaciel',
      tags: 'HTML · CSS · JavaScript',
    },
    {
      title: 'Projeto 7',
      description: 'Descrição do projeto 7. Espaço reservado para futuro projeto.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      tags: 'React · Node.js',
    },
    {
      title: 'Projeto 8',
      description: 'Descrição do projeto 8. Espaço reservado para futuro projeto.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      tags: 'TypeScript · API',
    },
  ];

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="projetos" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">Projetos</h2>
          <p className="text-xl text-gray-600">Soluções desenvolvidas com excelência</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-lg overflow-hidden border-2 border-black hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black p-3 rounded-full hover:scale-110 transform"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black p-3 rounded-full hover:scale-110 transform"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                <p className="text-sm text-gray-600">{project.tags}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && projects.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300 px-8 py-6 text-lg"
              onClick={() => setShowAll(true)}
            >
              Ver Todos os Projetos
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;