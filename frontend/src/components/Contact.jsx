import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Github, Instagram, ArrowUpRight } from 'lucide-react';
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
    <section id="contato" className="py-32 bg-black relative overflow-hidden" ref={ref}>
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gray-800/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-800/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 bg-white/10 text-white/80 text-sm font-medium rounded-full mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Vamos conversar?
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Entre em<br />
            <span className="text-gray-500">Contato</span>
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
            Tem um projeto em mente? Vamos transformar sua ideia em uma solução digital de sucesso.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-8 py-6 text-lg font-medium rounded-full group"
              onClick={handleWhatsApp}
              data-testid="whatsapp-btn"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-6 text-lg font-medium rounded-full group"
              onClick={handleEmail}
              data-testid="email-btn"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Footer */}
          <motion.div
            className="pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Artur Maciel Cacau. Todos os direitos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;