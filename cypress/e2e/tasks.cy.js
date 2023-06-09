/// <reference types="cypress" />
//import{faker} from '@faker-js/faker' 
describe('tarefas', () => {

	context('cadastro', () => {
		it('deve cadastrar uma nova tarefa', () => {

			const taskName = 'Ler um livro de Node.js'

			cy.removeTaskByName(taskName)

			//		cy.request({
			//			url: 'http://localhost:3333/helper/tasks',
			//			method: 'DELETE',
			//			body: { name: taskName }
			//		}).then(response => {
			//			expect(response.status).to.eq(204)
			//		})

			//
			cy.createTask(taskName)
			//cy.visit('http://localhost:8081')
			//cy.get('#newTask')
			//cy.get('input[placeholder="Add a new Task"]')
			//	.type('faker.music.songName()')- Em commit foi relatado o breve conhecimento sobre a biblioteca.
			//	.type(taskName)
			//cy.get('._listButtonNewTask_1y0mp_40') elemento do tipo button, porém ele pode ser alterado dessa forma não será encontrado na próxima refatoração 
			// button[type="submit"]
			// button[contains(text(), "Create")] isso abaixo é a mesma coisa que está aqui ao lado da frase
			//cy.contains('button', 'Create').click()

			//cy.get('main div p')
			//	.should('be.visible') //verificar se o elemento está visivel 
			//	.should('have.text', 'Ler  um livro de Node.js')

			cy.contains('main div p', taskName)
				.should('be.visible')
		})
		it('não deve permitir tarefa duplicada', () => {

			const task = {
				name: 'Estudar Javascript',
				is_done: false

			}

			cy.removeTaskByName(task.name)
			cy.postTask(task)
			//	cy.request({
			//		url: 'http://localhost:3333/tasks',
			//		method: 'POST',
			//		body: task
			//	}).then(response => {
			//		expect(response.status).to.eq(201)
			//	})
			cy.createTask(task.name)
			//cy.visit('http://localhost:8081')

			//cy.get('input[placeholder="Add a new Task"]')
			//.type(task.name)

			//cy.contains('button', 'Create').click()

			cy.get('.swal2-html-container')
				.should('be.visible') //verificar se o elemento está visivel 
				.should('have.text', 'Task already exists!')
		})
		it('campo obrigatório', () => {
			cy.createTask()
			cy.isRequired('This is a required field')
		})
	})

	context('atualização', () => {
		it('deve concluir uma tarefa', () => {
			//const taskName = 'Pagar contas de consumo'
			const task = {
				name: 'Pagar contas de consumo',
				is_done: false
			}
			cy.removeTaskByName(task.name)
			cy.postTask(task)

			cy.visit('http://localhost:8081')

			// Xpath: (//p[contains(text(), "Pagar contas de consumo")]/..//button)[1]
			cy.contains('p', task.name)
				.parent() // elemento pai da tarefa, quanto os botoes daquela tarefa
				.find('button[class*=ItemToggle]') // button[class*=ItemToggle] -> o '*' é contém
				// é a mesma ideia de Xpath, porém com cypress
				.click()

			cy.contains('p', task.name)
				.should('have.css', 'text-decoration-line', 'line-through')

		})
	})
})
