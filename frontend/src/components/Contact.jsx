import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Github, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleWhatsApp = () => {
    window.open('https://wa.me/5588996828755', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contato@arturmaciel.com.br';
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/pycacau', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/arturmaciell_', label: 'Instagram' },
  ];

  return (
    <section id="contato" className="py-24 md:py-40 bg-white relative overflow-hidden border-t-2 border-black" ref={ref}>
      {/* Background Decorativo - Ajustado para bolinhas pretas mais visíveis */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] md:[background-size:32px_32px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge Estilo Cartoon */}
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-white border-2 border-black text-black text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-none mb-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
          >
            <Sparkles size={14} className="animate-pulse text-black" strokeWidth={3} />
            Disponível para novos projetos
          </motion.div>
          
          {/* TÍTULO CARTOON: Destaque na palavra com leve rotação */}
          <h2 className="text-6xl md:text-8xl font-black text-black mb-10 tracking-tighter leading-[1.2] md:leading-[1.2] py-4 uppercase italic">
            VAMOS <br className="hidden md:block" />
            <span className="inline-block bg-black text-white px-6 py-2 mt-2 border-2 border-black transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              CONVERSAR?
            </span>
          </h2>

          <p className="text-lg md:text-2xl text-black font-medium mb-12 max-w-2xl mx-auto leading-relaxed border-b-2 border-black pb-8">
            Transformo ideias complexas em interfaces simples e funcionais. 
            Como posso ajudar o seu negócio hoje?
          </p>

          {/* Botões Brutalistas */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center mb-20">
            <Button
              size="lg"
              className="bg-black text-white border-2 border-black rounded-none px-8 py-7 md:px-10 md:py-8 text-lg md:text-xl font-black uppercase tracking-tighter group transition-all duration-300 hover:bg-black hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              onClick={handleWhatsApp}
            >
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 mr-3" strokeWidth={2.5} />
              WhatsApp
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={3} />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white text-black border-2 border-black rounded-none px-8 py-7 md:px-10 md:py-8 text-lg md:text-xl font-black uppercase tracking-tighter group transition-all duration-300 hover:bg-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              onClick={handleEmail}
            >
              <Mail className="w-5 h-5 md:w-6 md:h-6 mr-3" strokeWidth={2.5} />
              E-mail
            </Button>
          </div>

          {/* Redes Sociais */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] md:text-xs font-black text-black uppercase tracking-[0.3em] bg-white border-2 border-black px-4 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Redes Sociais
            </span>
            <div className="flex gap-4 md:gap-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 md:w-16 md:h-16 bg-white border-2 border-black rounded-none flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;