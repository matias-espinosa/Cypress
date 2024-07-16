const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();


describe('Sql', () => {
    before(() => {
        cy.loginSession(Cypress.env().admin.username, Cypress.env().admin.password);
    })

    it('Login with session', function () {
        cy.wait(2000)
        cy.loginSession(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('')
        cy.get('[data-cy="todolistlink"]').click();

    });

    it('Login with session', function () {
        cy.wait(2000)
        cy.loginSession(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('')
        cy.get('[data-cy="todolistlink"]').click();

    });
});