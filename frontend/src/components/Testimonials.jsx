import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const Testimonials = () => {
  const { lowMotion, reduceMotion } = useDevicePerformance();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    {
      name: 'Dr. Francisco Roney',
      role: 'roney.adv.br',
      content: 'O Artur captou a seriedade que precisavamos. O site virou nossa ferramenta de autoridade.',
      initials: 'FR',
      color: 'bg-slate-700',
    },
    {
      name: 'Rafaela Melo',
      role: 'Agronoma',
      content: 'Design e performance excelentes. O site e rapido e condiz com minha atuacao no campo.',
      initials: 'RM',
      color: 'bg-emerald-700',
    },
    {
      name: 'Lidiane Rodrigues',
      role: 'Empreendedora',
      content: 'Superou expectativas. Layout limpo e focado em conversao. Profissional nota 10.',
      initials: 'LR',
      color: 'bg-pink-600',
    },
    {
      name: 'Equipe Codexa',
      role: 'Agencia Tech',
      content: 'Tranquilidade total. Ele entende o negocio e transforma em codigo de alta performance.',
      initials: 'EC',
      color: 'bg-indigo-600',
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-white relative border-y-2 border-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="mb-12"
          initial={reduceMotion ? false : { opacity: 0, y: lowMotion ? 10 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={reduceMotion ? undefined : { duration: lowMotion ? 0.3 : 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none italic">
            Feedback <span className="text-gray-400 font-light">Real</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-2 md:pb-0">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: lowMotion ? 10 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={reduceMotion ? undefined : { delay: lowMotion ? index * 0.04 : index * 0.1, duration: lowMotion ? 0.22 : 0.4 }}
              className="
                bg-white p-3 sm:p-8 border-2 border-black rounded-none
                flex flex-col justify-between
                hover:translate-x-[-2px] hover:translate-y-[-2px]
                sm:hover:translate-x-[-4px] sm:hover:translate-y-[-4px]
                hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                transition-all duration-300 group
              "
            >
              <div>
                <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                  <div
                    className={`w-9 h-9 sm:w-12 sm:h-12 ${item.color} border-2 border-black flex items-center justify-center text-white font-black text-[10px] sm:text-sm shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                  >
                    {item.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-black font-black text-[11px] sm:text-sm uppercase tracking-tight truncate italic">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
                <p className="text-black font-medium text-[11px] sm:text-sm leading-snug sm:leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="mt-3 sm:mt-6 flex justify-end text-black opacity-20 group-hover:opacity-100 transition-opacity">
                <Quote size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
