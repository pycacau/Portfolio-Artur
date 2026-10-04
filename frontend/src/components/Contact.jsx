import React from 'react';
import { Mail, MessageSquare, Instagram, Linkedin } from 'lucide-react';
import './Contact.css';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/arturcacau', label: 'LinkedIn', detail: 'Conheça minha trajetória' },
  { icon: Instagram, href: 'https://instagram.com/arturmaciel.py', label: 'Instagram', detail: '@arturmaciel.py' },
];

export default function Contact() {
  return (
    <section id="contato" aria-labelledby="contact-title" className="portfolio-section portfolio-section--paper contact-section">
      <div className="contact-section__container">
        <div className="contact-section__eyebrow" data-gsap-reveal>
          <span>Vamos conversar</span>
          <span className="contact-section__availability">Disponível para novos projetos</span>
        </div>
        <div className="contact-section__layout">
          <div className="contact-section__intro">
            <h2 id="contact-title" className="display-title display-title--dark contact-section__title" data-gsap-title>
              SEU PRÓXIMO<br />PROJETO<br /><span>COMEÇA AQUI.</span>
            </h2>
            <p className="contact-section__description" data-gsap-reveal>
              Um novo site, uma loja online ou uma ideia que precisa sair do papel. Conte o que você tem em mente e vamos encontrar o melhor caminho.
            </p>
          </div>
          <div className="contact-panel" data-gsap-reveal>
            <div className="contact-panel__main">
              <span className="contact-panel__caption">Do seu jeito, no seu tempo.</span>
              <h3>Uma boa conversa.<br />Um novo começo.</h3>
              <p>Me conte sobre seu negócio, o que você precisa e o que espera do projeto.</p>
              <a href="https://wa.me/5588996828755" target="_blank" rel="noopener noreferrer" className="contact-panel__whatsapp">
                <MessageSquare size={20} aria-hidden="true" />Conversar no WhatsApp
              </a>
            </div>
            <div className="contact-panel__socials">
              {socialLinks.map(({ icon: Icon, href, label, detail }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="contact-social">
                  <span className="contact-social__icon"><Icon size={20} aria-hidden="true" /></span>
                  <span className="contact-social__identity"><span className="contact-social__name">{label}</span><span className="contact-social__detail">{detail}</span></span>
                  <span className="contact-social__action">Visitar</span>
                </a>
              ))}
            </div>
          </div>
          <a href="mailto:developer@arturmaciel.com.br" className="contact-email" data-gsap-reveal>
            <span className="contact-email__label"><Mail size={16} aria-hidden="true" />Prefere conversar por e-mail?</span>
            <span className="contact-email__address">developer@arturmaciel.com.br</span>
          </a>
        </div>
      </div>
    </section>
  );
}
