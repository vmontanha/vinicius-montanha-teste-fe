# Gerenciador de Produtos

Aplicação desenvolvida como desafio técnico de front-end sênior. O sistema implementa um CRUD completo de produtos com listagem, filtro, ordenação, paginação, testes automatizados e CI/CD.

## Tecnologias

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **Jest + Testing Library**
- **Cypress**
- **GitHub Actions**

## Funcionalidades

- Listagem de produtos de API pública (FakeStore API)
- Cadastro de produtos via formulário validado
- Filtros por nome e faixa de preço
- Ordenação por nome (A-Z/Z-A) e preço (crescente/decrescente)
- Paginação client-side
- Layout moderno e responsivo com Tailwind CSS
- Testes unitários e E2E
- Integração contínua com execução de testes automatizados

## Instalação

```bash
npm install
npm run dev
# Acesse em http://localhost:3000
```

## Testes

### Unitários (Jest)

```bash
npm test
```

Cobertura:
- HomePage
- ProductForm
- Pagination
- ProductSorter

### E2E (Cypress)

```bash
npx cypress open
```

Fluxo testado: adicionar produto, filtrar e ordenar

## CI - GitHub Actions

Workflow: `.github/workflows/ci.yml`

```yaml
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
      - run: npm install
      - run: npm test
```