import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Shield, Briefcase } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Code2, number: '50+', label: 'Projetos Desenvolvidos' },
    { icon: Briefcase, number: '3+', label: 'Anos de Experiência' },
    { icon: Shield, number: '20+', label: 'Clientes Satisfeitos' },
  ];

  return (
    <section id="sobre" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Foto */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-black transform rotate-3 rounded-lg"></div>
              <img
                src="https://customer-assets.emergentagent.com/job_portfolio-redesign-10/artifacts/dc7hl80b_Homem%20de%20neg%C3%B3cios%20com%20MacBook.png"
                alt="Artur Maciel Cacau"
                className="relative rounded-lg w-full shadow-2xl transform hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-black mb-4">
              Artur Maciel Cacau
            </h2>
            <p className="text-2xl text-gray-600 mb-6">Desenvolvedor Full-Stack</p>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Sou <strong>Desenvolvedor Full-Stack</strong> e <strong>Técnico em Informática</strong>,
                apaixonado por criar sistemas modernos, performáticos e seguros. Fundador da{' '}
                <strong>Codexa</strong>, ajudo empresas a transformar ideias em soluções digitais que
                geram resultados reais.
              </p>

              <p>
                Trabalho com foco em <strong>boa arquitetura</strong>, <strong>escalabilidade</strong> e{' '}
                <strong>segurança da informação</strong>, unindo boas práticas de desenvolvimento com uma
                visão estratégica de negócio.
              </p>

              <p>
                Estou constantemente me aperfeiçoando em <strong>Segurança da Informação & Pentest</strong>,{' '}
                <strong>Desenvolvimento Full-Stack</strong> e <strong>automação com scripts inteligentes</strong>,
                sempre buscando entregar soluções de alta qualidade.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-black" />
                    <p className="text-3xl font-bold text-black">{stat.number}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;