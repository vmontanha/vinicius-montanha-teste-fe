# Gerenciador de Produtos

Aplicação desenvolvida como parte de um desafio técnico para desenvolvedor front-end sênior. O sistema consiste em um CRUD completo de produtos, com foco em desempenho, estrutura escalável, responsividade e boas práticas de desenvolvimento.

## Objetivo

Construir uma aplicação em Next.js com TypeScript e Tailwind CSS que permita:
- Listagem de produtos com nome, descrição, categoria, preço e imagem
- Cadastro de novos produtos via formulário
- Filtragem por nome e faixa de preço
- Ordenação por nome e preço
- Paginação dos resultados
- Testes automatizados (unitários e e2e)
- Integração contínua com execução dos testes a cada push

---

## Tecnologias utilizadas

### Base
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios

### Testes
- Jest
- React Testing Library
- Cypress

### DevOps
- GitHub Actions



## Funcionalidades implementadas

- Listagem de produtos com dados reais de uma API pública (FakeStore API)

- Formulário de cadastro de novos produtos com validação

- Filtro por nome e faixa de preço

- Ordenação A-Z, Z-A, preço crescente e decrescente

- Paginação client-side

- Layout responsivo com Tailwind CSS




# Testes automatizados

## Testes Unitários

Executados com Jest e React Testing Library.

```bash
  npm test
```

Cobertura:

- HomePage: snapshot e mock da API

- ProductForm: validações e envio de produto

- Pagination: navegação de página

- ProductSorter: ordenação por nome e preço

## Testes end-to-end

Executados com Cypress.

```bash
  npm test
```

## Testes e2e simulam:

- Cadastro de produto

- Uso de filtros

- Ordenação e paginação

# Integração Contínua (CI)
Configuração com GitHub Actions.

Arquivo:
```bash
  .github/workflows/ci.yml
```

```bash
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Instalar dependências
        run: npm install
      - name: Executar testes
        run: npm test
```




