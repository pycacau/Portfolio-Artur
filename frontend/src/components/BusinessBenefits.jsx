import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './BusinessBenefits.css';

const evidence = [
  {
    value: '73', suffix: '%', label: 'A escolha passa pela busca',
    description: 'dos usuários brasileiros de redes sociais pesquisados usam o Google para avaliar produtos que descobriram nas redes.',
    takeaway: 'Seu Instagram pode despertar o interesse. Seu site ajuda a aprofundar a decisão.',
    source: 'Google/Ipsos · Brasil, 2023',
    url: 'https://business.google.com/br/think/search-and-video/inovacoes-busca-do-google/',
    methodology: 'Passive Shopping, março–abril de 2023: compradores com mais de 13 anos, com compra online no último mês e uso semanal de redes sociais; amostra de 1.000 compras online no Brasil. Artigo publicado em novembro de 2024.',
  },
  {
    value: '68', suffix: '%', label: 'Há espaço para novas marcas',
    description: 'dos consumidores brasileiros pesquisados se dizem abertos a comprar de marcas de que ainda não ouviram falar.',
    takeaway: 'Uma apresentação clara dá ao cliente motivos para considerar a sua empresa.',
    source: 'Google/Ipsos · Brasil, 2024',
    url: 'https://business.google.com/br/think/future-of-marketing/transformacao-comportamento-cultura-negocios/',
    methodology: 'The Relevance Factor, março de 2024: 1.000 compradores online com mais de 18 anos no Brasil. Artigo publicado em junho de 2025.',
  },
  {
    prefix: '+', value: '8', suffix: '%', label: 'Velocidade também vende',
    description: 'em vendas no teste A/B da Vodafone, ao comparar uma página otimizada com a versão anterior.',
    takeaway: 'Carregar rápido e facilitar a navegação são parte do trabalho, não apenas detalhes visuais.',
    source: 'Google/web.dev · Vodafone, 2021',
    url: 'https://web.dev/case-studies/vodafone?hl=pt-br',
    methodology: 'Caso Vodafone publicado em março de 2021: teste A/B com páginas visual e funcionalmente iguais; a versão otimizada melhorou em 31% a métrica de carregamento LCP. O aumento de vendas foi observado nesse teste e não é uma previsão para outros negócios.',
  },
];

const benefits = [
  { number: '01', stage: 'Descoberta', title: 'Apareça além das redes.', description: 'Um endereço próprio e páginas organizadas para os buscadores, prontas para divulgar no Google, nas redes sociais e em anúncios.' },
  { number: '02', stage: 'Confiança', title: 'Mostre por que escolher você.', description: 'Seus serviços, diferenciais e trabalhos apresentados com clareza, em um site com a identidade da sua empresa.' },
  { number: '03', stage: 'Contato', title: 'Facilite o próximo passo.', description: 'WhatsApp, formulários ou catálogo, conforme o projeto. Tudo pensado para o cliente encontrar o que precisa e falar com você pelo celular.' },
];

export default function BusinessBenefits() {
  return (
    <section id="servicos" aria-labelledby="business-benefits-title" className="portfolio-section portfolio-section--dark business-benefits">
      <div className="business-benefits__container">
        <header className="business-benefits__header">
          <div>
            <div className="section-eyebrow section-eyebrow--light mb-5" data-gsap-reveal>
              <span>Sites para negócios</span>
            </div>
            <h2 id="business-benefits-title" className="display-title display-title--light business-benefits__title" data-gsap-title>
              UM SITE A FAVOR<br />DO SEU NEGÓCIO.
            </h2>
          </div>
          <p className="business-benefits__intro" data-gsap-reveal>
            Seu cliente precisa entender o que você oferece, confiar na sua empresa e saber como falar com você.
            Eu crio sites que facilitam esse caminho.
          </p>
        </header>

        <div className="business-evidence" data-anime-stagger>
          {evidence.map((item) => (
            <article className="business-evidence__item" key={item.value} data-anime-stagger-item>
              <p className="business-evidence__label">{item.label}</p>
              <p className="business-evidence__number">
                {item.prefix && <span className="business-evidence__unit">{item.prefix}</span>}
                {item.value}<span className="business-evidence__unit">{item.suffix}</span>
              </p>
              <p className="business-evidence__description">{item.description}</p>
              <p className="business-evidence__takeaway">{item.takeaway}</p>
              <a className="business-evidence__source" href={item.url} target="_blank" rel="noopener noreferrer"
                aria-label={`Consultar a fonte: ${item.source} (abre em nova aba)`}>
                {item.source}<ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        <details className="business-benefits__research">
          <summary>Sobre as pesquisas e o estudo de caso</summary>
          <div className="business-benefits__research-content">
            {evidence.map((item) => <p key={item.value}><strong>{item.prefix}{item.value}{item.suffix} — </strong>{item.methodology}</p>)}
          </div>
        </details>

        <div className="business-benefits__delivery">
          <h3 data-gsap-reveal>O que eu construo para o seu negócio</h3>
          <div className="business-benefits__steps">
            {benefits.map((item) => (
              <article key={item.number} data-gsap-reveal>
                <p className="business-benefits__step-label"><span>{item.number}</span>{item.stage}</p>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="business-benefits__closing" data-gsap-reveal>
          <p>Sites institucionais, catálogos e lojas virtuais.<br /><span>O formato certo para o que você precisa vender.</span></p>
          <a href="#contato" className="business-benefits__cta">
            Quero um site para minha empresa<ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
