import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const testimonials = [
    { name: "Dr. Francisco Roney", role: "roney.adv.br", content: "O Artur captou a seriedade que precisávamos. O site virou nossa ferramenta de autoridade.", initials: "FR", color: "bg-slate-700" },
    { name: "Rafaela Melo", role: "Agrônoma", content: "Design e performance excelentes. O site é rápido e condiz com minha atuação no campo.", initials: "RM", color: "bg-emerald-700" },
    { name: "Lidiane Rodrigues", role: "Empreendedora", content: "Superou expectativas. Layout limpo e focado em conversão. Profissional nota 10.", initials: "LR", color: "bg-pink-600" },
    { name: "Equipe Codexa", role: "Agência Tech", content: "Tranquilidade total. Ele entende o negócio e transforma em código de alta performance.", initials: "EC", color: "bg-indigo-600" }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-white relative border-y-2 border-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none italic">
            Feedback <span className="text-gray-400 font-light">Real</span>
          </h2>
        </motion.div>

        <div className="
          flex overflow-x-auto pb-10 gap-6 snap-x snap-mandatory scrollbar-hide
          md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0
        ">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              // ESTILO CARTOON: Borda preta, sem arredondamento, sombra sólida preta
              className="
                min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center
                bg-white p-8 border-2 border-black rounded-none
                flex flex-col justify-between 
                hover:translate-x-[-4px] hover:translate-y-[-4px] 
                hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                transition-all duration-300 group
              "
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar Cartoon */}
                  <div className={`w-12 h-12 ${item.color} border-2 border-black flex items-center justify-center text-white font-black text-sm shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    {item.initials}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-black font-black text-sm uppercase tracking-tight truncate italic">{item.name}</h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest truncate">{item.role}</p>
                  </div>
                </div>
                <p className="text-black font-medium text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>
              
              <div className="mt-6 flex justify-end text-black opacity-20 group-hover:opacity-100 transition-opacity">
                <Quote size={20} fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Testimonials;