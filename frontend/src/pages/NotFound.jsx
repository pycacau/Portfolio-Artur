import React from 'react';
import { Link } from 'react-router-dom';
import '../components/LegalPage.css';
export default function NotFound() {
  return <main className="portfolio-section portfolio-section--dark legal-page" data-page-shell>
    <div className="legal-page__grid" aria-hidden="true" />
    <div className="legal-page__container"><header className="legal-page__header">
      <p className="legal-page__eyebrow">Erro 404 / Artur Maciel</p>
      <h1>Página não encontrada.</h1>
      <p className="legal-page__intro">O endereço pode ter mudado ou não existir. Você pode voltar ao portfólio ou deixar sua avaliação.</p>
      <nav className="legal-page__tabs" aria-label="Continuar navegando"><Link to="/">Voltar ao início</Link><Link to="/avaliar">Deixar uma avaliação</Link></nav>
    </header></div>
  </main>;
}
