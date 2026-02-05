import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Contato', href: '#contato' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              data-testid="header-logo"
            >
              <img 
                src="/logo.png" 
                alt="Artur Maciel Logo" 
                className="h-9 w-auto"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="relative text-white/80 hover:text-white transition-colors duration-300 font-medium px-4 py-2 rounded-full hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* CTA Button */}
              <motion.button
                className="ml-4 px-6 py-2.5 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contato')}
                data-testid="header-cta"
              >
                Fale Comigo
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.nav
              className="absolute top-24 left-0 right-0 flex flex-col items-center gap-2 px-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="w-full text-center text-2xl font-medium text-white py-4 rounded-2xl hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.button
                className="mt-4 w-full py-4 bg-white text-black font-semibold text-lg rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => scrollToSection('#contato')}
              >
                Fale Comigo
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
