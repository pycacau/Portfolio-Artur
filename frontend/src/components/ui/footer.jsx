import React from "react"
import { Link } from "react-router-dom"
import { Github, Instagram, Linkedin, Mail, MessageSquare } from "lucide-react"
import { cn } from "../../lib/utils"

export function Footer({ className }) {
  const socialLinks = [
    { icon: <Github size={22} strokeWidth={2.5} />, href: "https://github.com/pycacau", label: "GitHub" },
    { icon: <Instagram size={22} strokeWidth={2.5} />, href: "https://instagram.com/arturmaciell_", label: "Instagram" },
    { icon: <Linkedin size={22} strokeWidth={2.5} />, href: "https://www.linkedin.com/in/arturcacau", label: "LinkedIn" },
  ];

  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "#sobre" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer className={cn("bg-black text-white pt-20 pb-10 border-t-2 border-black", className)}>
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Coluna 1: Branding */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <span className="text-3xl font-black tracking-tighter uppercase italic">
              ARTUR MACIEL
            </span>
            <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs border-l-4 border-white pl-4">
              Especialista em interfaces de alta performance e ecossistemas digitais escaláveis.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black bg-white inline-block px-3 py-1 border-2 border-white self-start shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]">
              Navegação
            </h4>
            <ul className="flex flex-col gap-3 mt-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:text-white hover:translate-x-2 transition-all flex items-center gap-2">
                    <span className="w-2 h-2 bg-white inline-block rounded-none"></span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato Rápido */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black bg-white inline-block px-3 py-1 border-2 border-white self-start shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]">
              Contato
            </h4>
            <div className="flex flex-col gap-4 text-sm font-bold mt-2">
              <a href="mailto:arturmacieldev@gmail.com" className="flex items-center gap-3 bg-black text-white px-4 py-3 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <Mail size={16} strokeWidth={3} /> arturmacieldev@gmail.com
              </a>
              <p className="flex items-center gap-2 italic text-gray-500 text-[10px] uppercase tracking-widest">
                <MessageSquare size={14} /> Disponível para Freelas
              </p>
            </div>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="flex flex-col gap-4 md:items-end">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black bg-white inline-block px-3 py-1 border-2 border-white self-start md:self-end shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]">
              Social
            </h4>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black border-2 border-white text-white rounded-none hover:bg-white hover:text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Linha Final de Copyright */}
        <div className="pt-8 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-[0.3em] font-black uppercase">
          <p className="bg-white text-black px-4 py-2 border-2 border-white shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]">
            © {new Date().getFullYear()} — ARTUR MACIEL CACAU
          </p>
          <p className="text-gray-500 italic">Coded with Precision & Passion</p>
        </div>
      </div>
    </footer>
  )
}