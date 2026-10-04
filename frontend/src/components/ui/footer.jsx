import React from 'react';
import { Instagram, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import './footer.css';

const navigation = [
  { label: 'Início', href: '/' },
  { label: 'Sobre mim', href: '/#sobre' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Contato', href: '/#contato' },
];
const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arturcacau', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/arturmaciel.py', label: 'Instagram' },
  { icon: MessageSquare, href: 'https://wa.me/5588996828755', label: 'WhatsApp' },
];

export function Footer({ className }) {
  return (
    <footer className={cn('portfolio-footer', className)}>
      <div className="portfolio-footer__container">
        <div className="portfolio-footer__panel" data-gsap-reveal>
          <div className="portfolio-footer__header">
            <a href="/" className="portfolio-footer__brand">
              <span className="portfolio-footer__mark"><img src="/logo.png" alt="" width="80" height="80" loading="lazy" decoding="async" /></span>
              <span className="portfolio-footer__identity"><span>ARTUR MACIEL</span><span>Desenvolvedor web</span></span>
            </a>
            <p className="portfolio-footer__description">Sites, lojas online e soluções web.<br />Da ideia ao projeto no ar.</p>
          </div>
          <div className="portfolio-footer__main">
            <nav className="portfolio-footer__navigation" aria-label="Navegação do rodapé">
              <h2>Explore o portfólio</h2>
              <ul>{navigation.map(({label,href}) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
            </nav>
            <div className="portfolio-footer__contact">
              <h2>Vamos conversar</h2>
              <a className="portfolio-footer__email" href="mailto:developer@arturmaciel.com.br"><Mail size={20} aria-hidden="true" /><span>developer@arturmaciel.com.br</span></a>
              <nav className="portfolio-footer__socials" aria-label="Redes e contato">
                {socialLinks.map(({icon: Icon,href,label}) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={16} aria-hidden="true" /><span>{label}</span></a>)}
              </nav>
            </div>
          </div>
        </div>
        <div className="portfolio-footer__bottom">
          <p>© {new Date().getFullYear()} Artur Maciel Cacau.</p>
          <nav aria-label="Informações legais"><a href="/privacy">Privacidade</a><a href="/terms">Termos de uso</a></nav>
        </div>
      </div>
    </footer>
  );
}
