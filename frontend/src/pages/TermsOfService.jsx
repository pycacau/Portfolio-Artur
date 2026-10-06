import React from 'react';
import LegalPage from '../components/LegalPage';

const sections = [
  {
    "id": "sobre-este-site",
    "title": "Sobre este site",
    "paragraphs": [
      "Este portfólio é mantido por Artur Maciel Cacau para apresentar serviços de desenvolvimento web, projetos e avaliações. Você pode navegar livremente, sem criar uma conta.",
      "Estes termos regulam o uso do site. Prazos, preços, entregas, manutenção e direitos sobre um projeto contratado são definidos na proposta ou no contrato específico, e não substituídos por esta página."
    ]
  },
  {
    "id": "uso-responsavel",
    "title": "Uso responsável",
    "paragraphs": [
      "Utilize o site de forma lícita e respeitosa. Não envie conteúdo enganoso, ofensivo, discriminatório, spam, arquivos maliciosos ou informações de terceiros sem autorização. Não tente acessar dados restritos nem comprometer a disponibilidade do serviço."
    ]
  },
  {
    "id": "avaliacoes",
    "title": "Envio de avaliações",
    "paragraphs": [
      "O formulário permite enviar nome, nota de 1 a 5 estrelas e comentário. Nome do projeto, link e foto são opcionais. Ao autorizar a publicação, esses campos podem aparecer publicamente no portfólio.",
      "Relate uma experiência verdadeira. Evite incluir senhas, documentos, dados financeiros, informações sensíveis ou dados de outras pessoas. Envie somente uma foto e um link que você tenha direito de compartilhar.",
      "O sistema limita envios abusivos e bloqueia nomes completos equivalentes, considerando espaços, maiúsculas e acentos. Nomes com sobrenomes diferentes podem ser aceitos. Esse controle não verifica a identidade da pessoa.",
      "Os cards identificados como “Espaço reservado” não são avaliações recebidas. Eles são substituídos gradualmente por avaliações enviadas. Conteúdo que viole estas regras poderá ser removido; opiniões críticas respeitosas também são permitidas."
    ]
  },
  {
    "id": "retirada",
    "title": "Correção ou retirada de uma avaliação",
    "paragraphs": [
      "Para solicitar correção ou retirada do comentário, nome, foto ou link, escreva para developer@arturmaciel.com.br e indique a avaliação. Poderemos pedir apenas informações necessárias para confirmar a autoria, evitando alterações indevidas."
    ]
  },
  {
    "id": "conteudo-projetos",
    "title": "Conteúdo e projetos apresentados",
    "paragraphs": [
      "Textos, identidade visual, código, imagens e projetos podem pertencer a Artur Maciel ou aos respectivos titulares. A apresentação no portfólio não transfere direitos nem autoriza reprodução comercial. É permitido compartilhar links públicos com os devidos créditos.",
      "As marcas e sites de clientes continuam sujeitos aos direitos e às regras de seus titulares. Resultados de pesquisas e estudos de caso exibidos no site têm contexto próprio e não são promessa de vendas, posicionamento no Google ou resultado financeiro."
    ]
  },
  {
    "id": "links-disponibilidade",
    "title": "Links externos e disponibilidade",
    "paragraphs": [
      "Links de projetos, redes sociais e WhatsApp levam a serviços externos. Ao acessá-los, passam a valer as políticas e condições desses serviços. O botão “Ver projeto” abre o endereço informado no formulário da avaliação.",
      "O site pode ficar temporariamente indisponível durante manutenção ou falhas técnicas. São adotadas medidas para seu funcionamento e segurança, sem garantia de disponibilidade ininterrupta. Nenhuma disposição destes termos afasta direitos previstos na legislação aplicável."
    ]
  },
  {
    "id": "atualizacoes-contato",
    "title": "Atualizações e contato",
    "paragraphs": [
      "Esta página pode ser atualizada quando houver mudanças no funcionamento do site. A data no início identifica a revisão do texto. A simples navegação não autoriza publicidade nem substitui consentimentos específicos.",
      "Dúvidas sobre o uso do portfólio podem ser enviadas para developer@arturmaciel.com.br."
    ]
  }
];

export default function TermsOfService() {
  return <LegalPage title="Termos de uso" intro="As regras para navegar pelo portfólio, conhecer os projetos e compartilhar sua experiência." sections={sections} />;
}
