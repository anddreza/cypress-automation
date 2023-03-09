/// <reference types="cypress" />
import{faker} from '@faker-js/faker' 
describe ('tarefas', () => {
	it('deve cadastrar uma nova tarefa', () => {
		cy.visit('http://localhost:8081')
		//cy.get('#newTask')
		cy.get('input[placeholder="Add a new Task"]')
			.type('faker.music.songName()')
		
		//cy.get('._listButtonNewTask_1y0mp_40') elemento do tipo button, porém ele pode ser alterado dessa forma não será encontrado na próxima refatoração 
		// button[type="submit"]
		// button[contains(text(), "Create")] isso abaixo é a mesma coisa que está aqui ao lado da frase
		cy.contains('button', 'Create').click()

		

	})

})