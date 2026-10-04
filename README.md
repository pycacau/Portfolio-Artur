# Portfólio — Artur Maciel

Portfólio React com projetos, contato, certificados e avaliações de clientes.

## Avaliações

A página `/avaliar` aceita envios sem login, com nome, nota de 1 a 5 estrelas, comentário, nome/link do projeto e foto opcional. O envio depende da autorização de publicação. As avaliações ficam no banco D1; as fotos ficam no R2 e são preparadas como miniaturas de 256 px no navegador.

Os 20 espaços reservados usam o nome “Seu comentário aparece aqui” e nunca entram no cálculo da nota. Cada avaliação recebida substitui um espaço reservado. Com 20 avaliações recebidas, todos os cards são de envios; a partir daí a coleção continua crescendo. A área permanece com altura limitada e animação em três colunas.

Cada nome pode enviar apenas uma avaliação. A comparação desconsidera maiúsculas, acentos e espaços extras; um índice único garante o bloqueio também em envios simultâneos. Avaliações anteriores à regra são preservadas e seus nomes também bloqueiam novos envios. Repetir a mesma requisição após uma falha de conexão continua retornando a avaliação já salva.

## Dependências e desenvolvimento

Use Node.js 24 e npm 11. Instale as dependências na raiz e em `frontend`:

```bash
npm ci
npm --prefix frontend ci
```

O frontend mantém seu comando `npm --prefix frontend start`. Para testar o fluxo completo de avaliações localmente, execute `npm test`; os testes usam SQLite em arquivos temporários, incluindo reinício do banco e o formulário React. Dados de teste nunca são publicados.

## Publicação no Cloudflare Pages

Conecte este repositório ao Pages e configure:

| Configuração | Valor |
| --- | --- |
| Branch de produção | `main` |
| Framework preset | `None` |
| Diretório raiz | Raiz do repositório |
| Comando de build | `npm run build:pages` |
| Diretório de saída | `dist/pages` |

O arquivo `.node-version` seleciona Node.js 24. O build instala as dependências do frontend, gera o site e empacota a API em `_worker.js`, no formato avançado do Pages. O binding `ASSETS` é fornecido pelo Pages. A página `/avaliar` funciona também ao abrir seu endereço diretamente.

Se o projeto Pages já usa o preset React, com raiz `frontend`, comando `npm run build` e saída `build`, esse caminho também inclui a API: o `postbuild` gera `_worker.js` e `_routes.json` dentro de `frontend/build`. Não publique somente os arquivos estáticos nem desative o `postbuild`. As rotas `/api/*` devem retornar JSON; se `/api/reviews` mostrar o HTML da página inicial, a API não foi incluída no deploy. Os bindings abaixo são necessários nos dois formatos de build.

Antes de receber avaliações, crie um banco D1 e um bucket R2 na sua conta Cloudflare. Em **Settings → Bindings** do projeto Pages, conecte:

| Tipo | Nome do binding | Recurso |
| --- | --- | --- |
| D1 database | `DB` | Seu banco de avaliações |
| R2 bucket | `PROFILE_PHOTOS` | Seu bucket de fotos |

Para inicializar **um banco novo e vazio**, execute os dois arquivos SQL na ordem abaixo. Substitua `NOME_DO_BANCO` pelo nome do banco criado; o Wrangler pedirá acesso à sua conta se necessário.

```bash
npx wrangler d1 execute NOME_DO_BANCO --remote --file=drizzle/0000_curved_prowler.sql
npx wrangler d1 execute NOME_DO_BANCO --remote --file=drizzle/0001_dizzy_ricochet.sql
```

Não reaplique esses arquivos em um banco que já recebeu essas migrations. Após adicionar os bindings, faça um novo deploy no Pages. Configure os mesmos recursos em Preview se quiser testar avaliações nos deploys de preview.

Avaliações e fotos são dados externos ao Git. Um novo banco e bucket começam vazios; os dados da hospedagem anterior precisam ser migrados separadamente para aparecerem no novo domínio.

Para verificar e gerar a saída localmente:

```bash
npm ci
npm test
npm run build:pages
```

## Publicação na hospedagem de preview

```bash
npm test
npm run build
```

O build gera `dist/client` para o frontend e `dist/server/index.js` para o Worker. A hospedagem precisa dos bindings D1 `DB` e R2 `PROFILE_PHOTOS`, declarados em `.openai/hosting.json`, além do binding de assets `ASSETS`. Publique o conjunto completo; um export estático isolado não oferece o formulário persistente.

O schema fica em `db/schema.ts`. Mudanças futuras são geradas com `npm run db:generate`, inspecionadas e versionadas em `drizzle`; migrations já aplicadas são imutáveis.

Não inclua `node_modules`, caches, builds nem arquivos de configuração com segredos em ZIPs de código-fonte.
