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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const desktopNavLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Depoimentos', href: '#depoimentos' },
  ];

  const mobileNavLinks = [
    ...desktopNavLinks,
    { name: 'Contato', href: '#contato', highlight: true },
  ];

  const scrollToSection = (href, isPage = false) => {
    setIsMobileMenuOpen(false);

    if (isPage) {
      navigate(href);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
            ${
              isScrolled
                ? 'w-full md:w-auto md:min-w-[620px] rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]'
                : 'w-full max-w-7xl rounded-none bg-transparent border-transparent'
            }
          `}
        >
          <nav className="hidden md:flex items-center gap-6">
            {desktopNavLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="relative px-2 py-1 text-base font-semibold text-gray-400 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </button>
            ))}

            <FlowButton text="Vamos Conversar" onClick={() => scrollToSection('#contato')} className="ml-2" />
          </nav>

          <div className="flex w-full items-center justify-end md:hidden">
            <button
              className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/25 md:hidden"
              aria-label="Fechar menu"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[86px] left-4 right-4 z-[60] md:hidden rounded-2xl border border-white/15 bg-black/95 backdrop-blur-xl p-2 shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
            >
              {mobileNavLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href, link.isPage)}
                  className={`w-full text-left text-sm font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-colors ${
                    link.highlight
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'text-white/90 hover:bg-white hover:text-black'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
