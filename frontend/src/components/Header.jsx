import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FlowButton } from './ui/flow-button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projetos', href: '#projetos' },
  ];

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`
            pointer-events-auto transition-all duration-500 ease-in-out
            flex items-center justify-center px-8 py-4
            ${isScrolled 
              ? 'w-full md:w-auto md:min-w-[500px] rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]' 
              : 'w-full max-w-7xl rounded-none bg-transparent border-transparent'
            }
          `}
        >
          {/* Desktop Navigation - Centralizada */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="relative px-2 py-1 text-base font-semibold text-gray-400 hover:text-white transition-colors group"
              >
                {link.name}
                {/* Indicador visual mais forte no hover */}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ))}
            
            {/* Novo Botão Animado */}
            <FlowButton 
              text="Vamos Conversar" 
              onClick={() => scrollToSection('#contato')}
              className="ml-4"
            />
          </nav>

          {/* Mobile Toggle - Posicionado à direita no mobile */}
          <div className="flex w-full items-center justify-between md:hidden">
             {/* Espaçador para manter o botão na direita se não houver logo */}
             <div /> 
             <button 
                className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black md:hidden flex items-center justify-center"
          >
             {/* Botão fechar no menu full screen */}
             <button 
                className="absolute top-8 right-8 text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={40} />
              </button>

            <motion.nav 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="flex flex-col items-center gap-10"
            >
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-5xl font-black text-white/40 hover:text-white transition-all active:scale-90"
                >
                  {link.name}
                </button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;