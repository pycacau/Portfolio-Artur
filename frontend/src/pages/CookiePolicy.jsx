import React from 'react';
import LegalPage from '../components/LegalPage';

const sections = [
  {
    "id": "o-que-sao",
    "title": "O que são cookies",
    "paragraphs": [
      "Cookies são pequenos registros armazenados no navegador que podem manter sessões, lembrar preferências ou acompanhar a navegação. Outros mecanismos de armazenamento também devem ser avaliados conforme sua finalidade."
    ]
  },
  {
    "id": "neste-site",
    "title": "Como são usados neste site",
    "paragraphs": [
      "O portfólio e o formulário de avaliações não exigem login nem dependem de cookies de publicidade. O código da aplicação não instala Pixel da Meta ou rastreadores de anúncios.",
      "A infraestrutura Cloudflare pode definir cookies de segurança, por exemplo ao apresentar um desafio contra acessos automatizados. A presença desses cookies depende dos recursos de proteção habilitados e das requisições realizadas."
    ],
    "link": {
      "href": "https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/",
      "label": "Cookies da infraestrutura Cloudflare"
    }
  },
  {
    "id": "estatisticas",
    "title": "Estatísticas sem cookies",
    "paragraphs": [
      "O Cloudflare Web Analytics mede acessos e desempenho sem utilizar cookies ou armazenamento local para rastrear visitantes. Isso permite acompanhar o funcionamento do site sem adicionar cookies de publicidade."
    ],
    "link": {
      "href": "https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/",
      "label": "Como o Cloudflare Web Analytics funciona"
    }
  },
  {
    "id": "escolhas",
    "title": "Suas escolhas",
    "paragraphs": [
      "Você pode consultar e apagar cookies nas configurações do seu navegador. Bloquear mecanismos estritamente necessários de segurança pode impedir o funcionamento de verificações de acesso.",
      "Se forem adicionados cookies opcionais que dependam de consentimento, eles deverão permanecer desativados até sua escolha, com opções claras para aceitar, rejeitar ou alterar a autorização. Um banner de consentimento não é exibido apenas para anunciar cookies que não são utilizados."
    ]
  },
  {
    "id": "duvidas",
    "title": "Dúvidas e mudanças",
    "paragraphs": [
      "Esta página será revisada quando houver mudanças relevantes nas ferramentas usadas pelo site. Para informações sobre avaliações, fotos e outros dados fornecidos, consulte a Política de Privacidade.",
      "Em caso de dúvidas, fale com developer@arturmaciel.com.br."
    ]
  }
];

export default function CookiePolicy() {
  return <LegalPage title="Cookies e navegação" intro="Uma explicação direta sobre o armazenamento no navegador e as ferramentas usadas pelo portfólio." sections={sections} />;
}
