import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Award } from 'lucide-react';

const Certificates = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Certificados & Diplomas
          </motion.span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Certificados
          </h1>
          <p className="text-xl text-gray-400">
            Minhas certificações e conquistas acadêmicas
          </p>
        </motion.div>

        {/* Under Development Section */}
        <motion.div
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full blur-3xl opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Icon Container */}
            <motion.div
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Construction className="w-24 h-24 text-gray-400 mx-auto" />
              </motion.div>
            </motion.div>
          </div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Área em Desenvolvimento
          </motion.h2>
          
          <motion.p
            className="text-gray-400 text-lg text-center max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Em breve você poderá visualizar todos os meus certificados e diplomas aqui.
          </motion.p>

          {/* Progress indicator */}
          <motion.div
            className="mt-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/40 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">Trabalhando nisso...</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;
