describe('Fluxo de gerenciamento de produtos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('deve adicionar um produto, filtrar e ordenar', () => {
  
    cy.contains('Novo Produto').click()

    cy.get('input[placeholder="Nome"]').type('Produto Cypress')
    cy.get('input[placeholder="Categoria"]').type('Categoria Teste')
    cy.get('input[placeholder="Preço"]').type('123.45')
    cy.get('textarea[placeholder="Descrição"]').type('Descrição de teste Cypress')
    cy.get('input[placeholder="URL da Imagem"]').type('https://via.placeholder.com/150')

    cy.contains('Salvar').click()
   
    cy.contains('Produto Cypress').should('exist')
    cy.contains('Descrição de teste Cypress').should('exist')

    cy.get('input[placeholder*="Buscar"]').type('Produto Cypress')
    cy.contains('Produto Cypress').should('be.visible')

    cy.get('select').select('price-desc')
  })
})
