import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Shield, Briefcase, Sparkles } from 'lucide-react';

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
    <section id="sobre" className="py-32 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-100 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-20 items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Foto */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background shapes */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="absolute -inset-4 bg-gradient-to-tr from-black via-gray-900 to-gray-800 rounded-3xl transform -rotate-2 opacity-10"></div>
              
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img
                  src="https://customer-assets.emergentagent.com/job_etheral-portfolio/artifacts/7gt14k62_WhatsApp%20Image%202026-02-04%20at%2021.38.21.jpeg"
                  alt="Artur Maciel Cacau"
                  className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-black" />
                    <span className="text-sm font-semibold text-black">Disponível para projetos</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Conteúdo */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.span 
              className="inline-block px-4 py-1.5 bg-black text-white text-sm font-medium rounded-full mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Sobre mim
            </motion.span>
            
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-4 leading-tight">
              Artur Maciel<br />
              <span className="text-gray-500">Cacau</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-light">Desenvolvedor Full-Stack & Fundador da Codexa</p>

            <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
              <p>
                Sou <span className="text-black font-medium">Desenvolvedor Full-Stack</span> e{' '}
                <span className="text-black font-medium">Técnico em Informática</span>,
                apaixonado por criar sistemas modernos, performáticos e seguros.
              </p>

              <p>
                Trabalho com foco em <span className="text-black font-medium">boa arquitetura</span>,{' '}
                <span className="text-black font-medium">escalabilidade</span> e{' '}
                <span className="text-black font-medium">segurança da informação</span>, unindo boas práticas 
                de desenvolvimento com uma visão estratégica de negócio.
              </p>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <Icon className="w-5 h-5 text-gray-400" />
                      <p className="text-3xl font-bold text-black">{stat.number}</p>
                    </div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
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