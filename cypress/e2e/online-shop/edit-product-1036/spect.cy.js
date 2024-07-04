const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

    before(() => {
        cy.login(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
    });

    it('Deberia permitir al usuario editar un producto', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            data.product.id = testCaseId;
            cy.deleteProductById(data.product.id);
            cy.createProduct(data.product);
            cy.log('edit product');
        });
    });
});