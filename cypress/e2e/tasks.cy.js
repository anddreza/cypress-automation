/// <reference types="cypress" />
//import{faker} from '@faker-js/faker' 
describe('tarefas', () => {
	it('deve cadastrar uma nova tarefa', () => {

		cy.request({
			url: 'http://localhost:3333/helper/tasks',
			method: 'DELETE',
			body: { name: 'Ler um livro de Node.js' }
		}).then(response => {
			expect(response.status).to.eq(204)
		})


		cy.visit('http://localhost:8081')
		//cy.get('#newTask')
		cy.get('input[placeholder="Add a new Task"]')
			//	.type('faker.music.songName()')- Em commit foi relatado o breve conhecimento sobre a biblioteca.
			.type('Ler um livro de Node.js')
		//cy.get('._listButtonNewTask_1y0mp_40') elemento do tipo button, porém ele pode ser alterado dessa forma não será encontrado na próxima refatoração 
		// button[type="submit"]
		// button[contains(text(), "Create")] isso abaixo é a mesma coisa que está aqui ao lado da frase
		cy.contains('button', 'Create').click()

		//cy.get('main div p')
		//	.should('be.visible') //verificar se o elemento está visivel 
		//	.should('have.text', 'Ler  um livro de Node.js')

		cy.contains('main div p', 'Ler um livro de Node.js')
			.should('be.visible')
	})

	// subfunção it.only 
	it('não deve permitir tarefa duplicada', ()=> {

		cy.request({
			url: 'http://localhost:3333/helper/tasks',
			method: 'DELETE',
			body: { name: 'Estudar Javascript' }
		}).then(response => {
			expect(response.status).to.eq(204)
		})

		// Dado que tenho uma tarefa duplicada
		cy.request({
			url: 'http://localhost:3333/tasks',
			method: 'POST', 
			body: { name: 'Estudar Javascript', is_done: false}
		}).then(response => {
			expect(response.status).to.eq(201)
		})

		// Quando faço o cadastro dessa tarefa
		cy.visit('http://localhost:8081')
		
		cy.get('input[placeholder="Add a new Task"]')
		.type('Estudar Javascript')

		cy.contains('button', 'Create').click()

		// Então vejo a mensagem de duplicidade
		cy.get('.swal2-html-container')
			.should('be.visible') //verificar se o elemento está visivel 
			.should('have.text', 'Task already exists!')
	})
})