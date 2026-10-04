import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProfileCard from './ProfileCard';
import HeroGridWaterfall from './HeroGridWaterfall';

const About = () => {
  const handleContactClick = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="sobre"
      className="relative overflow-hidden py-20 md:py-24 lg:py-28"
      style={{ background: '#ebebea', color: '#111' }}
    >
      <HeroGridWaterfall />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 min-w-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-black/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-black/40">
              Sobre mim
            </span>
          </div>
          <h2
            className="font-black leading-[0.95] tracking-tight text-black mb-4"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontFamily: '"Archivo Black","Arial Black",Helvetica,Arial,sans-serif',
            }}
          >
            ARTUR MACIEL
          </h2>
          <p className="text-base md:text-lg text-black/[0.55] max-w-xl font-medium leading-relaxed">
            Desenvolvedor Full-Stack transformando ideias em produtos digitais
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:gap-12 xl:gap-16 items-center">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[360px] mx-auto lg:mx-0 min-w-0"
          >
            <ProfileCard
              name="Artur Maciel"
              title="Desenvolvedor Full-Stack"
              handle="@arturmaciel.py"
              verified={true}
              status="Disponível"
              contactText="Vamos Conversar"
              avatarUrl="/profile.jpeg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={true}
              onContactClick={handleContactClick}
              iconUrl="/profile-iconpattern.png"
              grainUrl="/profile-grain.webp"
              behindGlowEnabled={false}
              innerGradient="linear-gradient(145deg, #353535 0%, #141414 58%, #090909 100%)"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mx-auto lg:mx-0 min-w-0 space-y-6 md:space-y-7"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  Desenvolvedor Full-Stack
                </span>
                <span className="text-xs font-medium text-black/60">Técnico em Informática</span>
              </div>
              <p className="text-xl lg:text-2xl leading-[1.45] text-black/[0.85] font-medium max-w-[36ch]">
                Transformo problemas complexos em produtos digitais{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">claros, rápidos e seguros</span>
                  <span className="absolute bottom-1 left-0 right-0 h-2 bg-black/[0.06] -z-0" />
                </span>
                .
              </p>
            </div>

            {/* Description blocks */}
            <div className="space-y-5 md:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative pl-7 md:pl-8"
              >
                <div aria-hidden="true" className="absolute left-[3px] top-2 -bottom-7 md:-bottom-8 w-px bg-black/20" />
                <div aria-hidden="true" className="absolute left-0 top-1 z-10 w-2 h-2 rounded-full bg-black ring-4 ring-[#ebebea] transition-transform duration-300 group-hover:scale-125" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                  O que eu desenvolvo
                </h3>
                <p className="text-[15px] md:text-base leading-[1.65] text-black/[0.65] group-hover:text-black/80 transition-colors">
                  Crio sites institucionais, lojas virtuais e sistemas web. Cuido da interface, das funcionalidades e da integração com o banco de dados para entregar uma solução completa.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group relative pl-7 md:pl-8"
              >
                <div aria-hidden="true" className="absolute left-0 top-1 z-10 w-2 h-2 rounded-full bg-black ring-4 ring-[#ebebea] transition-transform duration-300 group-hover:scale-125" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-black/70 mb-2">
                  Como eu trabalho
                </h3>
                <p className="text-[15px] md:text-base leading-[1.65] text-black/[0.65] group-hover:text-black/80 transition-colors">
                  Começo entendendo o que seu negócio precisa. Planejo a estrutura, desenvolvo e testo cada etapa, com atenção à experiência no celular, à velocidade e à facilidade de manutenção.
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-1"
            >
              <motion.button
                onClick={handleContactClick}
                className="group inline-flex items-center gap-2.5 px-6 py-3 min-h-11 bg-black text-white rounded-full border-2 border-black font-semibold text-xs uppercase tracking-wider shadow-[4px_4px_0_#777773] transition-[transform,box-shadow] duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-[#ebebea]"
              >
                Iniciar Projeto
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
