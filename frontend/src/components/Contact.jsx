import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleWhatsApp = () => {
    window.open('https://wa.me/5585999999999', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contato@arturmaciel.com.br';
  };

  return (
    <section id="contato" className="py-24 bg-black" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Entre em Contato</h2>
          <p className="text-xl text-gray-400 mb-12">
            Vamos transformar sua ideia em realidade digital
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 px-8 py-6 text-lg flex items-center gap-3"
              onClick={handleWhatsApp}
            >
              <MessageSquare className="w-6 h-6" />
              Enviar pelo WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-6 text-lg flex items-center gap-3"
              onClick={handleEmail}
            >
              <Mail className="w-6 h-6" />
              Enviar por Email
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 pt-8 border-t border-gray-800"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-500">
              © 2025 Artur Maciel Cacau. Todos os direitos reservados.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;