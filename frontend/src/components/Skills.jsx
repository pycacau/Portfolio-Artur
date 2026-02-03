import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Terminal, Shield, Cpu } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend',
      skills: 'React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS',
    },
    {
      icon: Database,
      title: 'Backend',
      skills: 'Node.js, Express, FastAPI, Laravel, Python, PHP',
    },
    {
      icon: Globe,
      title: 'Database',
      skills: 'MongoDB, PostgreSQL, MySQL',
    },
    {
      icon: Terminal,
      title: 'DevOps & Tools',
      skills: 'Git, Linux, Ubuntu, Bash, VSCode, Postman',
    },
    {
      icon: Shield,
      title: 'Segurança',
      skills: 'Cybersecurity, Pentesting, Ethical Hacking',
    },
    {
      icon: Cpu,
      title: 'Outras Linguagens',
      skills: 'C++, Python, TypeScript',
    },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg border-2 border-black hover:border-gray-400 transition-all duration-300 hover:shadow-2xl group"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

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