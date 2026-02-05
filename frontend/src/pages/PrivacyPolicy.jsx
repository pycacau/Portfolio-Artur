import React from 'react';
import { motion } from 'framer-motion';
import { EtheralShadow } from '../components/ui/etheral-shadow';
import { Lock, Eye, Database, Share2, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-32 pb-24">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <EtheralShadow
          color="rgba(100, 100, 100, 0.5)"
          animation={{ scale: 40, speed: 60 }}
          noise={{ opacity: 0.3, scale: 1.2 }}
          sizing="fill"
          className="w-full h-full"
        />
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Política de Privacidade</h1>
          <p className="text-xl text-gray-400">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">1. Coleta de Informações</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Coletamos informações que você nos fornece diretamente quando utiliza nosso formulário de contato ou interage conosco através de links de redes sociais. Isso pode incluir seu nome, endereço de e-mail e o conteúdo de sua mensagem.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg mt-1">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">2. Uso das Informações</h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  As informações que coletamos são utilizadas para:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>Responder às suas consultas e solicitações;</li>
                  <li>Melhorar nossos serviços e a experiência do usuário;</li>
                  <li>Enviar atualizações sobre nossos serviços (apenas se solicitado);</li>
                  <li>Garantir a segurança do nosso site.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-500/10 rounded-lg mt-1">
                <Share2 className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">3. Compartilhamento de Dados</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Não vendemos, comercializamos ou transferimos suas informações pessoais para terceiros. Isso não inclui parceiros de hospedagem de sites e outras partes que nos auxiliam na operação do site, desde que essas partes concordem em manter essas informações confidenciais.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg mt-1">
                <Cookie className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">4. Cookies</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Nosso site pode utilizar "cookies" para melhorar a experiência do usuário. O navegador do usuário coloca cookies no disco rígido para fins de manutenção de registros e, às vezes, para rastrear informações sobre eles. Você pode optar por configurar seu navegador para recusar cookies ou para alertá-lo quando os cookies estiverem sendo enviados.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.div variants={itemVariants} className="mt-16 text-center text-gray-500 text-sm">
          <p>Seus dados estão seguros. Valorizamos sua privacidade e confiança.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
