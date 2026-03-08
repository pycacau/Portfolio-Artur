import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Shield, Briefcase, User } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Code2, number: '50+', label: 'Projetos' },
    { icon: Briefcase, number: '4+', label: 'Anos Exp.' },
    { icon: Shield, number: '20+', label: 'Clientes' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="sobre" className="py-24 md:py-32 bg-white relative overflow-hidden border-b-2 border-black" ref={ref}>
      {/* Grid de fundo sutil */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Layout de Texto e Imagem */}
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center mb-24">
          
          {/* FOTO À ESQUERDA */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group w-full max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4" />
              <div className="relative border-2 border-black bg-white p-0 rounded-none overflow-hidden transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 duration-300">
                <img
                  src="/profile.jpeg"
                  alt="Artur Maciel Cacau"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute top-4 left-4 bg-black border-2 border-white text-white px-3 py-1 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  <div className="w-2 h-2 bg-green-500 rounded-none animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Ativo</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CONTEÚDO DE TEXTO À DIREITA */}
          <motion.div
            className="lg:col-span-7 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(200,200,200,1)]">
              <User size={12} strokeWidth={3} />
              <span>Sua trajetória</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-black text-black mb-10 tracking-tighter leading-[0.85] uppercase italic">
              ARTUR MACIEL
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6 text-black leading-tight text-xl font-medium max-w-2xl border-l-4 border-black pl-6">
              <p>
                <span className="bg-black text-white px-1">Desenvolvedor Full-Stack e Técnico em Informática</span>. Transformo problemas complexos em interfaces simples, rápidas e seguras.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg font-normal">
                Com especialização em arquitetura de sistemas escaláveis e interfaces modernas, atuo desde a concepção até a implementação final de projetos digitais.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg font-normal">
                Minha abordagem combina fundamentos técnicos sólidos com design estratégico, garantindo soluções que não apenas funcionam bem, mas também geram resultados reais para negócios.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* FAIXA DE ESTATÍSTICAS CENTRALIZADA EMBAIXO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative w-full"
        >
          {/* Sombra da faixa */}
          <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3" />
          
          {/* Faixa Principal */}
          <div className="relative bg-white border-2 border-black grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black overflow-hidden">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-8 md:p-10 hover:bg-black hover:text-white transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" strokeWidth={3} />
                    <span className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none">
                      {stat.number}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black opacity-60 group-hover:opacity-100">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;