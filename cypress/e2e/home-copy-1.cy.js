/// <reference types="cypress" />

describe('home', () => {
  
	it('aplicação web deve estar online', () => {
    cy.visit('http://localhost:8081')
	cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
 
	})



})