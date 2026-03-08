'use client';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FlowButton({ text = "Vamos Conversar", className, ...props }) {
  return (
    <button 
      className={cn(
        "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-white/20 bg-transparent px-8 py-3 text-sm font-semibold text-white cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-black hover:rounded-[12px] active:scale-[0.95] pointer-events-auto",
        className
      )}
      {...props}
    >
      {/* Seta que entra pela esquerda */}
      <ArrowRight 
        className="absolute w-4 h-4 left-[-25%] group-hover:left-4 stroke-black fill-none z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />

      {/* Texto com deslocamento */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Círculo que expande (Background) */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-[50%] opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

      {/* Seta que sai pela direita */}
      <ArrowRight 
        className="absolute w-4 h-4 right-4 group-hover:right-[-25%] stroke-white group-hover:stroke-black fill-none z-[9] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />
    </button>
  );
}

export default FlowButton;
