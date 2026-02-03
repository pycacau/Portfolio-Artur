# Portfolio Artur Maciel Cacau - Redesign

## 🎨 Visão Geral

Portfolio profissional redesenhado com foco em design monocromático (preto e branco), animações sutis e organização moderna. O projeto mantém todo o conteúdo original enquanto melhora significativamente a experiência visual e interativa.

## ✨ Características Principais

### Design
- **Paleta Monocromática**: Preto, branco e tons de cinza para um visual profissional e elegante
- **Tipografia Moderna**: Inter para textos e JetBrains Mono para código
- **Animações Suaves**: Transições elegantes e efeitos parallax
- **Responsivo**: Adaptado para todos os tamanhos de tela

### Animações Especiais
- **Hero Section**: Sistema de partículas 3D com Canvas/WebGL
  - 100 partículas animadas
  - Conexões dinâmicas entre partículas próximas
  - Efeito de profundidade 3D
  - Animação parallax no scroll
  
- **Efeitos Hover**: Cards de projetos com elevação suave
- **Fade-in Animations**: Elementos aparecem gradualmente ao scroll

### Seções

1. **Hero**
   - Animação de partículas 3D em Canvas
   - Título grande e impactante
   - CTAs claros (Ver Projetos / Entre em Contato)
   - Ícone de scroll animado

2. **Sobre Mim**
   - Foto profissional com efeito de camadas
   - Biografia completa
   - Estatísticas (50+ Projetos, 3+ Anos, 20+ Clientes)
   - Layout grid responsivo

3. **Skills/Tecnologias**
   - Organização por categorias (Frontend, Backend, Database, DevOps, Segurança)
   - Cards com ícones do Lucide React
   - Hover effects interativos
   - Seção de formação educacional

4. **Projetos**
   - Grid de 8 projetos (6 iniciais + botão "Ver Todos")
   - Imagens dos projetos reais
   - Links para demo e GitHub
   - Tags de tecnologias
   - Hover effects com overlay escuro e ícones de ação

5. **Contato**
   - Botões para WhatsApp e Email
   - Design minimalista
   - Footer com copyright

### Header
- Fixo no topo com transparência inicial
- Fundo sólido após scroll
- Navegação suave entre seções
- Menu mobile responsivo

## 🛠 Tecnologias Utilizadas

### Frontend
- **React** 19.0.0
- **Framer Motion** 12.30.0 - Animações avançadas
- **Tailwind CSS** 3.4.17 - Estilização
- **Shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones
- **React Intersection Observer** - Detecção de scroll

### Animações
- Canvas API para partículas 3D
- Framer Motion para transições
- CSS transforms e transitions
- Parallax scroll effects

## 📁 Estrutura de Arquivos

```
/app/frontend/src/
├── components/
│   ├── Header.jsx       # Navegação fixa
│   ├── Hero.jsx         # Hero com animação 3D
│   ├── About.jsx        # Seção sobre mim
│   ├── Skills.jsx       # Tecnologias e formação
│   ├── Projects.jsx     # Portfolio de projetos
│   └── Contact.jsx      # Seção de contato
├── App.js               # Componente principal
├── App.css              # Estilos globais
└── index.css            # Estilos base + fontes
```

## 🎯 Recursos Implementados

### Animações Canvas (Hero)
- Sistema de partículas com física 3D
- Conexões dinâmicas entre partículas
- Efeito de profundidade com perspectiva
- Loop de animação otimizado
- Responsive e performático

### Framer Motion
- Fade-in ao scroll
- Parallax effects
- Hover animations
- Stagger animations (cards aparecem em sequência)
- Scale e opacity transforms

### Interatividade
- Navegação suave entre seções
- Hover states nos projetos
- Botões com feedback visual
- Mobile menu funcional

## 🚀 Como Usar

O site está rodando em: `http://localhost:3000`

### Navegação
- Use o menu superior para navegar entre seções
- Scroll suave automático
- Botões CTAs direcionam para seções específicas

### Adicionar Projetos
Edite `/app/frontend/src/components/Projects.jsx`:

```javascript
const projects = [
  {
    title: 'Nome do Projeto',
    description: 'Descrição detalhada...',
    image: 'URL_DA_IMAGEM',
    demo: 'URL_DEMO', // opcional
    github: 'URL_GITHUB', // opcional
    tags: 'Tech1 · Tech2 · Tech3',
  },
  // ... mais projetos
];
```

### Personalizar Informações
- **Contato**: Edite WhatsApp e Email em `/app/frontend/src/components/Contact.jsx`
- **Sobre**: Atualize texto e estatísticas em `/app/frontend/src/components/About.jsx`
- **Skills**: Modifique tecnologias em `/app/frontend/src/components/Skills.jsx`

## 🎨 Paleta de Cores

```css
Preto Principal: #000000
Branco: #FFFFFF
Cinza Escuro: #111111, #222222, #333333
Cinza Claro: #F5F5F5
Cinza Médio: #666666
```

## ⚡ Performance

- Animações otimizadas com requestAnimationFrame
- Lazy loading de imagens
- Bundle size otimizado
- Canvas rendering eficiente
- CSS transforms para melhor performance

## 📱 Responsividade

- Breakpoints: Mobile (< 768px), Tablet (768px-1024px), Desktop (> 1024px)
- Menu mobile com hamburger
- Grid adaptativo
- Imagens responsive
- Tipografia escalável

## 🔄 Melhorias Futuras Sugeridas

1. Adicionar mais projetos conforme necessário
2. Implementar filtros por tecnologia nos projetos
3. Adicionar blog/artigos
4. Integrar com CMS para gerenciar projetos
5. Adicionar dark/light mode toggle (opcional)
6. Animações mais complexas com Three.js

## 📝 Notas

- Todas as imagens dos projetos são do site original (www.arturmaciel.com.br)
- Foto profissional atualizada conforme fornecida
- Design mantém identidade visual monocromática
- Animações são sutis para não distrair do conteúdo
- Portfolio pronto para expansão com mais projetos

## 🌟 Destaques do Design

1. **Minimalismo Elegante**: Foco no conteúdo sem elementos desnecessários
2. **Animações Profissionais**: Efeitos sutis que agregam valor
3. **Organização Clara**: Hierarquia visual bem definida
4. **Performance**: Otimizado para carregamento rápido
5. **Modernidade**: Usa tecnologias e padrões atuais de 2025

---

**Desenvolvido com ❤️ usando React + Framer Motion + Tailwind CSS**
