const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();
import { HomePage } from "../../../support/pages/homePage";
import { ToDoListPage } from "../../../support/pages/toDoList";

describe(`${scenarioName} - ${module} `, () => {
    const homepage = new HomePage;
    const todolistpage =new ToDoListPage

    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
        homepage.goToToDoList()
    });

    it('Deberia permitir al usuario agregar una tarea nueva', function () {
        todolistpage.removeAllTasks().should('be.visible').click()
        cy.wait('@deleteAlltasks').its('response.statusCode').should('be.equal', 202);

        todolistpage.addOneTask()
        cy.intercept('POST', 'api/save-task', (req) => {
            req.body.completed = true
        })

        cy.wait('@getAllTasks', {timeout: 180000}).its('response').then(response => {
            expect(response.statusCode).to.be.equal(200)
            expect(response.body.tasks[0].completed).to.be.equal(true)
        });

        cy.contains('p', 'Tarea').should('have.attr', 'style', "text-decoration: line-through;")

    });
});