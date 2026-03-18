const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();
describe(`Aserciones con custom commands`, () => {
    before(() => {
        cy.login(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as('data')
        cy.visit('');
        cy.getByDataCy('todolistlink').click()
    });

    it('Deberia permitir al usuario agregar tareas y  validarlas', function () {
        cy.getByDataCy('removeAll').click();
        cy.get('p').should('not.exist')

        cy.getByDataCy('task').type(this.data.tareas.tarea1)
        cy.getByDataCy('sendTask').click()
        cy.get('p').should('have.length', 1)
        cy.contains('p', this.data.tareas.tarea1).click()

        cy.getByDataCy('task').type(this.data.tareas.tarea2)
        cy.getByDataCy('sendTask').click()
        cy.get('p').should('have.length', 2)

        cy.getByDataCy('task').type(this.data.tareas.tarea3)
        cy.getByDataCy('sendTask').click()
        cy.get('p').should('have.length', 3)

        cy.getByDataCy('task').type(this.data.tareas.tarea4)
        cy.getByDataCy('sendTask').click()
        cy.get('p').should('have.length', 4)

        cy.verifyTask({
            name: this.data.tareas.tarea1,
            completed: true
        });

        cy.verifyTask({
            name: this.data.tareas.tarea2,
            completed: false
        });

        cy.verifyTask({
            name: this.data.tareas.tarea3,
            completed: false
        });

        cy.verifyTask({
            name: this.data.tareas.tarea4,
            completed: false
        });
    });
});