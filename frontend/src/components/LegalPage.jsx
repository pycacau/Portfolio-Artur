import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './LegalPage.css';

export default function LegalPage({ title, intro, sections, updated = '05 de outubro de 2026' }) {
  return <main className="portfolio-section portfolio-section--dark legal-page" data-page-shell>
    <div className="legal-page__grid" aria-hidden="true" />
    <div className="legal-page__container">
      <Link className="legal-page__back" to="/"><ArrowLeft size={16} /> Voltar ao início</Link>
      <header className="legal-page__header">
        <p className="legal-page__eyebrow">Artur Maciel / Informações legais</p>
        <h1>{title}</h1>
        <p className="legal-page__intro">{intro}</p>
        <p className="legal-page__date">Última atualização: <time dateTime="2026-10-05">{updated}</time></p>
      </header>
      <nav className="legal-page__tabs" aria-label="Documentos do site">
        <NavLink to="/terms">Termos de uso</NavLink>
        <NavLink to="/privacy">Privacidade</NavLink>
        <NavLink to="/cookies">Cookies</NavLink>
      </nav>
      <div className="legal-page__layout">
        <aside className="legal-page__index"><nav aria-label="Nesta página">
          <p>Nesta página</p>
          {sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>)}
        </nav></aside>
        <div className="legal-page__content">
          {sections.map((section, index) => <section id={section.id} key={section.id} className="legal-page__section">
            <p className="legal-page__number">{String(index + 1).padStart(2, '0')}</p>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
            {section.link && <a className="legal-page__source" href={section.link.href} target="_blank" rel="noopener noreferrer">{section.link.label}<ArrowUpRight size={14} /></a>}
          </section>)}
          <div className="legal-page__contact"><p>Precisa falar sobre seus dados ou uma avaliação?</p><a href="mailto:developer@arturmaciel.com.br">developer@arturmaciel.com.br<ArrowUpRight size={16} /></a></div>
        </div>
      </div>
    </div>
  </main>;
}
