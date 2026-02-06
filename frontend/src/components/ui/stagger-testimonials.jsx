import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const defaultTestimonials = [
  {
    tempId: 0,
    testimonial: "O Artur desenvolveu nosso site institucional com uma qualidade excepcional. Superou todas as nossas expectativas!",
    by: "Dr. Roney Oliveira, Sócio at Roney Advogados",
    imgSrc: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    tempId: 1,
    testimonial: "Profissionalismo e competência definem o trabalho do Artur. Nossa nova identidade visual ficou incrível!",
    by: "Lucas Ferreira, Diretor at Codexa Dev",
    imgSrc: "https://randomuser.me/api/portraits/men/33.jpg"
  },
  {
    tempId: 2,
    testimonial: "O sistema de delivery do Urubu Ecoparque revolucionou nosso atendimento. Excelente trabalho!",
    by: "Marcos Pereira, Gerente at Urubu Ecoparque",
    imgSrc: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    tempId: 3,
    testimonial: "Nossa loja online nunca vendeu tanto. O Artur entendeu perfeitamente nossas necessidades.",
    by: "Ana Costa, Proprietária at Spansiva Tecnologia",
    imgSrc: "https://randomuser.me/api/portraits/women/35.jpg"
  },
  {
    tempId: 4,
    testimonial: "O desenvolvimento foi rápido e a qualidade do código é impecável. Parceria certeira!",
    by: "Carlos Santos, CTO at Agência Digital",
    imgSrc: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    tempId: 5,
    testimonial: "Atendimento excepcional e soluções inovadoras. Recomendo sem qualquer reserva!",
    by: "Roberto Lima, CEO at Startup Brasileira",
    imgSrc: "https://randomuser.me/api/portraits/men/37.jpg"
  },
];

function TestimonialCard({ position, testimonial, handleMove, cardSize }) {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-black text-white border-black" 
          : "z-0 bg-white text-black border-black hover:border-gray-600"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px #000" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-black"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-12 bg-gray-200 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px #fff"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium leading-relaxed",
        isCenter ? "text-white" : "text-black"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-gray-300" : "text-gray-600"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
}

export function StaggerTestimonials({ testimonials: customTestimonials }) {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(
    (customTestimonials || defaultTestimonials).map((t, i) => ({ ...t, tempId: i }))
  );

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-black hover:bg-black hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          )}
          aria-label="Depoimento anterior"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-black hover:bg-black hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          )}
          aria-label="Próximo depoimento"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
