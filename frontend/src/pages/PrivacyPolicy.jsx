import React from 'react';
import LegalPage from '../components/LegalPage';

const sections = [
  {
    "id": "responsavel",
    "title": "Quem é responsável",
    "paragraphs": [
      "Artur Maciel Cacau é responsável pelas decisões sobre os dados tratados neste portfólio. O canal de atendimento sobre privacidade é developer@arturmaciel.com.br."
    ]
  },
  {
    "id": "dados",
    "title": "Dados que você fornece",
    "paragraphs": [
      "Ao enviar uma avaliação, são registrados nome, nota, comentário, data de envio e, se preenchidos, nome do projeto, link e foto. Não é exigido login. O sistema também mantém um identificador do envio e uma versão normalizada do nome para evitar duplicidades.",
      "Ao entrar em contato por e-mail, WhatsApp ou redes sociais, são recebidas as informações que você escolher enviar nesses canais. Não envie dados sensíveis ou documentos que não sejam necessários para o atendimento."
    ]
  },
  {
    "id": "finalidades",
    "title": "Finalidades e bases do tratamento",
    "paragraphs": [
      "A publicação da avaliação, do nome e dos campos opcionais é realizada com sua autorização específica no formulário. Essa autorização pode ser revogada pelo canal de privacidade.",
      "Informações de contato são usadas para responder solicitações e, quando aplicável, preparar propostas ou executar contratos. Dados estritamente necessários à segurança são tratados para prevenir abuso e proteger o serviço, observando a necessidade, os direitos do titular e a base legal aplicável."
    ]
  },
  {
    "id": "dados-publicos",
    "title": "O que fica público",
    "paragraphs": [
      "Nome, nota, comentário, data, nome do projeto, link e foto enviados na avaliação podem ser vistos por qualquer visitante. Conteúdo público também pode ser acessado por mecanismos de busca ou copiado por terceiros.",
      "IP e identificadores técnicos de controle não são exibidos nos cards. A foto é opcional e pode ser retirada mediante solicitação, assim como os demais campos da avaliação."
    ]
  },
  {
    "id": "seguranca",
    "title": "Segurança e registros técnicos",
    "paragraphs": [
      "A infraestrutura recebe informações técnicas das requisições, como endereço IP, para entregar e proteger o site. No envio de avaliações, a aplicação transforma o IP em um identificador por hora para limitar tentativas abusivas; esse identificador não é publicado.",
      "Registros de limitação têm expiração e são limpos em envios posteriores. Um identificador derivado de IP não deve ser entendido como garantia de anonimato. A aplicação valida os campos e arquivos enviados e utiliza conexão HTTPS, mas nenhum sistema elimina todos os riscos."
    ]
  },
  {
    "id": "fornecedores",
    "title": "Hospedagem e serviços externos",
    "paragraphs": [
      "A Cloudflare fornece hospedagem, proteção, banco de dados D1 e armazenamento R2 das fotos. Esses serviços podem processar informações em infraestrutura fora do Brasil, sujeita aos mecanismos e requisitos legais aplicáveis às transferências internacionais.",
      "Fontes e bibliotecas podem ser carregadas de provedores externos, como Google Fonts e CDN de arquivos. Esses provedores recebem as informações técnicas necessárias às requisições. Links para WhatsApp, Instagram, LinkedIn e projetos externos são regidos pelas políticas dos respectivos serviços.",
      "Os dados das avaliações não são vendidos. O acesso por prestadores é limitado às finalidades operacionais pertinentes. Informações poderão ser fornecidas quando exigidas por obrigação legal ou ordem válida."
    ]
  },
  {
    "id": "retencao",
    "title": "Por quanto tempo os dados permanecem",
    "paragraphs": [
      "Avaliações permanecem enquanto forem utilizadas no portfólio e a autorização de publicação estiver vigente. A retirada pode ser solicitada a qualquer momento. Dados de atendimento são mantidos pelo período necessário à solicitação, à relação contratual e às obrigações legais pertinentes.",
      "Após uma solicitação aplicável, dados deixam de ser publicados ou são eliminados, ressalvadas hipóteses legais de conservação. Cópias técnicas de segurança podem seguir o ciclo de retenção do provedor; a retirada não garante apagar cópias já feitas por terceiros."
    ]
  },
  {
    "id": "direitos",
    "title": "Seus direitos e como exercê-los",
    "paragraphs": [
      "Você pode solicitar confirmação do tratamento, acesso, correção, informações sobre compartilhamento, revogação do consentimento e eliminação quando cabível, além dos demais direitos previstos na LGPD.",
      "Envie a solicitação para developer@arturmaciel.com.br, descrevendo o pedido e a avaliação ou atendimento relacionado. A confirmação de autoria será proporcional ao necessário. O exercício desses direitos é gratuito e observará os prazos legais aplicáveis."
    ],
    "link": {
      "href": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
      "label": "Consultar a LGPD"
    }
  },
  {
    "id": "cookies",
    "title": "Cookies e estatísticas",
    "paragraphs": [
      "A aplicação não instala cookies de publicidade para suas funcionalidades. A infraestrutura de segurança pode usar cookies estritamente necessários, conforme os recursos habilitados. O Cloudflare Web Analytics coleta métricas de acesso e desempenho sem cookies de rastreamento.",
      "A página de cookies detalha essas diferenças. Novas ferramentas de publicidade ou medição que alterem esse tratamento deverão ser avaliadas antes da ativação, com informação e consentimento quando necessário."
    ]
  }
];

export default function PrivacyPolicy() {
  return <LegalPage title="Política de privacidade" intro="Saiba quais informações são tratadas, por que são usadas e como solicitar acesso, correção ou retirada." sections={sections} />;
}
