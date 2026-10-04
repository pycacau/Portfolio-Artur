import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const StaggeredMenu = ({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = '#000000',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  colors = ['#B497CF', '#5227FF'],
  accentColor = '#000000',
  onMenuOpen,
  onMenuClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const scene = document.querySelector('.portfolio-night');
    const clouds = scene?.querySelector('.cloud-transition');
    const lightClouds = scene?.querySelector('.cloud-transition--light');
    const footerClouds = scene?.querySelector('.cloud-transition--footer');
    let frame = 0;

    const updateContrast = () => {
      frame = 0;
      const button = buttonRef.current;
      if (!button || !scene || !clouds) {
        setIsOverDark(false);
        return;
      }
      const buttonBounds = button.getBoundingClientRect();
      const cloudBounds = clouds.getBoundingClientRect();
      const buttonCenter = buttonBounds.top + buttonBounds.height / 2;
      // The opaque cloud bank ends around 80% of the transition height.
      const darkStart = cloudBounds.top + cloudBounds.height * 0.8;
      const lightBounds = lightClouds?.getBoundingClientRect();
      const darkEnd = lightBounds ? lightBounds.top + lightBounds.height * 0.5 : scene.getBoundingClientRect().bottom;
      const footerBounds = footerClouds?.getBoundingClientRect();
      const footerStart = footerBounds ? footerBounds.top + footerBounds.height * 0.5 : Infinity;
      setIsOverDark((darkStart <= buttonCenter && darkEnd > buttonCenter) || (footerStart <= buttonCenter && scene.getBoundingClientRect().bottom > buttonCenter));
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateContrast);
    };

    updateContrast();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    const observer = new ResizeObserver(scheduleUpdate);
    [document.body, scene, clouds, lightClouds, footerClouds].filter(Boolean).forEach(element => observer.observe(element));
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location.pathname]);

  const handleItemClick = (link) => {
    setIsOpen(false);
    if (link.startsWith('/#')) {
      const sectionId = link.replace('/#', '');
      if (location.pathname === '/') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (link.startsWith('/')) {
      navigate(link);
    } else {
      window.open(link, '_blank', 'noopener noreferrer');
    }
  };

  const closedButtonColor = isOverDark ? '#111111' : menuButtonColor;
  const buttonColor = isOpen && changeMenuColorOnOpen ? openMenuButtonColor : closedButtonColor;

  return (
    <>
      <motion.button
        ref={buttonRef}
        className="fixed top-6 right-6 z-[60] p-3 rounded-full backdrop-blur-md transition-[background-color,color,box-shadow] duration-200"
        style={{
          backgroundColor: isOpen ? 'rgba(255,255,255,0.1)' : isOverDark ? 'rgba(255,255,255,0.94)' : 'rgba(0,0,0,0.3)',
          color: buttonColor,
          boxShadow: !isOpen && isOverDark ? '0 3px 18px rgba(0,0,0,0.18)' : 'none',
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) onMenuOpen?.();
          else onMenuClose?.();
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
              onClick={() => {
                setIsOpen(false);
                onMenuClose?.();
              }}
            />

            <motion.nav
              initial={{
                x: position === 'right' ? '100%' : '-100%',
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1
              }}
              exit={{
                x: position === 'right' ? '100%' : '-100%',
                opacity: 0
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
                duration: 0.4
              }}
              className={`fixed top-0 ${position === 'right' ? 'right-0' : 'left-0'} h-full w-full max-w-md z-[58] overflow-y-auto`}
              style={{
                background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
              }}
            >
              <div className="flex flex-col justify-between h-full p-8 pt-24">
                <div className="flex flex-col gap-2">
                  {items.map((item, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: position === 'right' ? 50 : -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.08,
                        type: 'spring',
                        damping: 20,
                        stiffness: 200
                      }}
                      onClick={() => handleItemClick(item.link)}
                      className="group relative text-left py-3 px-4 rounded-lg transition-all hover:bg-white/10"
                      aria-label={item.ariaLabel}
                    >
                      <div className="flex items-center gap-4">
                        {displayItemNumbering && (
                          <span
                            className="text-sm font-bold opacity-60"
                            style={{ color: accentColor }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        )}
                        <span
                          className="text-3xl md:text-4xl font-bold tracking-tight transition-transform group-hover:translate-x-2"
                          style={{ color: accentColor }}
                        >
                          {item.label}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {displaySocials && socialItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="flex flex-col gap-3 pt-8 border-t border-white/20"
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2"
                      style={{ color: accentColor }}
                    >
                      Conecte-se
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {socialItems.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap min-h-11 px-4 py-2 rounded-full text-sm font-bold transition-colors hover:bg-white/20"
                          style={{
                            color: accentColor,
                            border: `2px solid ${accentColor}40`
                          }}
                        >
                          {social.label}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;
