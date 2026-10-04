import React from 'react';
import { motion } from 'framer-motion';
import SectionAtmosphere from '../components/SectionAtmosphere';
import { Shield, FileText, AlertCircle, Scale, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
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
      transition: { duration: 0.35 }
    }
  };

  return (
    <div className="portfolio-section portfolio-section--dark min-h-screen text-white relative overflow-x-clip pt-32 pb-24" data-page-shell data-gsap-reveal>
      <SectionAtmosphere theme="dark" intensity="soft" />

      <motion.div 
        className="container mx-auto px-6 relative z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="display-title display-title--light text-[clamp(2.8rem,10vw,5rem)] mb-6">Termos de Uso</h1>
          <p className="text-xl text-gray-400">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-none p-6 sm:p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/[0.06] rounded-lg mt-1">
                <CheckCircle className="w-6 h-6 text-white/70" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">1. Aceitação dos Termos</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Ao acessar e utilizar este site, você concorda expressamente em cumprir estes termos e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-none p-6 sm:p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/[0.06] rounded-lg mt-1">
                <FileText className="w-6 h-6 text-white/70" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">2. Uso de Licença</h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site de Artur Maciel para visualização transitória pessoal e não comercial apenas. Esta é a concessão de uma licença, não uma transferência de título, e sob esta licença você não pode:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                  <li>Modificar ou copiar os materiais;</li>
                  <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
                  <li>Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site;</li>
                  <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-none p-6 sm:p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/[0.06] rounded-lg mt-1">
                <AlertCircle className="w-6 h-6 text-white/70" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">3. Isenção de Responsabilidade</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Os materiais no site são fornecidos "como estão". Não ofereço garantias, expressas ou implícitas, e, por este meio, isento e nego todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
                </p>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="bg-white/5 backdrop-blur-md rounded-none p-6 sm:p-8 md:p-10 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/[0.06] rounded-lg mt-1">
                <Shield className="w-6 h-6 text-white/70" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4 text-white">4. Limitações</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Em nenhum caso eu ou meus fornecedores seremos responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em meu site, mesmo que eu ou um representante autorizado tenhamos sido notificados oralmente ou por escrito da possibilidade de tais danos.
                </p>
              </div>
            </div>
          </motion.section>
        </div>

        <motion.div variants={itemVariants} className="mt-16 text-center text-gray-500 text-sm">
          <p>Para dúvidas sobre estes termos, entre em contato através dos canais oficiais disponíveis no site.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
