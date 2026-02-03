import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IconCloud } from './ui/interactive-icon-cloud';

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

  return (
    <section id="skills" className="py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Tecnologias</h2>
          <p className="text-xl text-gray-400">Stack moderna para soluções escaláveis</p>
        </motion.div>

        {/* IconCloud - Nuvem 3D de Ícones */}
        <motion.div
          className="flex justify-center items-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg bg-black px-8 pb-8 pt-8">
            <IconCloud iconSlugs={iconSlugs} />
          </div>
        </motion.div>

        {/* Legenda de Categorias */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-lg font-bold text-black mb-2">Frontend</h3>
            <p className="text-sm text-gray-700">React, Next.js, TypeScript, Tailwind CSS</p>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-lg font-bold text-black mb-2">Backend</h3>
            <p className="text-sm text-gray-700">Node.js, FastAPI, Laravel, Python, PHP</p>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-lg font-bold text-black mb-2">Database</h3>
            <p className="text-sm text-gray-700">MongoDB, PostgreSQL, MySQL</p>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-black">
            <h3 className="text-lg font-bold text-black mb-2">DevOps</h3>
            <p className="text-sm text-gray-700">Git, Docker, Linux, Nginx</p>
          </div>
        </motion.div>

        {/* Formação */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-4xl font-bold text-white mb-8 text-center">Formação</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-2 border-black">
              <h4 className="text-xl font-bold text-black mb-2">Técnico em Informática</h4>
              <p className="text-gray-700">EEEP Deputado José Maria Melo - Ensino Médio Técnico</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-black">
              <h4 className="text-xl font-bold text-black mb-2">
                Superior em Análise e Desenvolvimento de Sistemas
              </h4>
              <p className="text-gray-700">FIAP - Cursando Bacharelado</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-black">
              <h4 className="text-xl font-bold text-black mb-2">Cybersegurança - Hacking e Pentest</h4>
              <p className="text-gray-700">FIAP - Curso</p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-black">
              <h4 className="text-xl font-bold text-black mb-2">Ciências da Computação - Autodidata</h4>
              <p className="text-gray-700">UFC - Github</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;