# Página de Certificados

Esta pasta contém a página de certificados do portfólio.

## Certificados Adicionados

✅ **Linguagem de Programação Python - Básico** - Fundação Bradesco (Novembro 2023 - 18 horas)
✅ **Crie um Site Simples Usando HTML, CSS e JavaScript** - Fundação Bradesco (Agosto 2024 - 2 horas)
✅ **Fundamentos de TI: Hardware e Software** - Fundação Bradesco (Agosto 2024 - 7 horas)
✅ **Microsoft Excel 2016 - Básico** - Fundação Bradesco (Maio 2023 - 15 horas)
✅ **Microsoft Excel 2016 - Intermediário** - Fundação Bradesco (Maio 2023 - 20 horas)
✅ **Microsoft Excel 2016 - Avançado** - Fundação Bradesco (Maio 2023 - 30 horas)
✅ **Segurança em Tecnologia da Informação** - Fundação Bradesco (Agosto 2024 - 12 horas)

## Como adicionar as imagens dos certificados

1. **Converter PDFs para imagens**: 
   - Você pode usar ferramentas online como [PDF2PNG](https://pdf2png.com/) ou [ILovePDF](https://www.ilovepdf.com/pt/pdf_para_jpg)
   - Ou usar ferramentas do sistema como Print Screen e salvar como JPG/PNG

2. **Salvar as imagens**:
   - Crie a pasta `certificados/imagens/` se ainda não existir
   - Salve as imagens com os nomes (convertendo os PDFs para JPG/PNG):
     - `python-basico.jpg` (ou .png)
     - `html-css-javascript.jpg` (ou .png)
     - `fundamentos-ti-hardware-software.jpg` (ou .png)
     - `excel-2016-basico.jpg` (ou .png)
     - `excel-2016-intermediario.jpg` (ou .png)
     - `excel-2016-avancado.jpg` (ou .png)
     - `seguranca-tecnologia-informacao.jpg` (ou .png)

3. **Verificar os caminhos** no arquivo `certificados.js` (já estão configurados)

## Como adicionar mais certificados

1. Coloque as imagens dos certificados na pasta `certificados/imagens/`

2. Edite o arquivo `certificados.js` e adicione os certificados no array `certificados`:

```javascript
const certificados = [
  {
    id: 1,
    titulo: "Nome do Certificado",
    empresa: "Nome da Empresa Emissora",
    data: "Janeiro 2024", // Opcional
    imagem: "imagens/certificado1.jpg" // Caminho relativo à pasta certificados
  },
  {
    id: 2,
    titulo: "Outro Certificado",
    empresa: "Outra Empresa",
    data: "Fevereiro 2024",
    imagem: "imagens/certificado2.png"
  }
  // Adicione mais certificados aqui...
];
```

## Estrutura de um certificado

- **id**: Número único para cada certificado
- **titulo**: Nome/título do certificado
- **empresa**: Nome da empresa ou instituição que emitiu o certificado
- **data**: Data de emissão (opcional, pode ser string como "2024" ou "Janeiro 2024")
- **imagem**: Caminho para a imagem do certificado (relativo à pasta `certificados/`)

## Funcionalidades

- ✅ Filtro por empresa
- ✅ Visualização em grid responsivo
- ✅ Modal para visualizar certificado em tamanho maior
- ✅ Design consistente com o portfólio principal

## Notas

- As imagens serão automaticamente ajustadas para caber nos cards
- O filtro será preenchido automaticamente com todas as empresas únicas dos certificados
- Clique em um certificado para visualizá-lo em tamanho maior no modal

