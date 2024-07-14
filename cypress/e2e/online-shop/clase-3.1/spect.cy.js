
const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');

        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as('data');

        cy.then(function () {
            cy.getProductByName(this.data.product1.name).as('product1');
            cy.getProductByName(this.data.product2.name).as('product2');
            cy.getProductByName(this.data.product3.name).as('product3');
        });
    });

    it('Deberia permitir al usuario agregar mas de un producto al carrito y validar el mismo', function () {
        this.data.product1.price = this.product1.body.products.docs[0].price;
        this.data.product2.price = this.product2.body.products.docs[0].price;
        this.data.product3.price = this.product3.body.products.docs[0].price;

        cy.get('[data-cy="onlineshoplink"]').click();
        cy.get(`[name='${this.data.product1.name}']`).click();
        cy.getByDataCy("closeModal").click();

        cy.get(`[name='${this.data.product2.name}']`).click();
        cy.getByDataCy("closeModal").click();

        cy.get(`[name='${this.data.product3.name}']`).click();
        cy.getByDataCy("closeModal").click();
        cy.get('[data-cy="goShoppingCart"]').click();

        cy.get('[data-cy="productName"]').eq(0).should('have.text', this.data.product1.name);
        cy.get('[data-cy="unitPrice"]').eq(0).should('have.text', `$${this.data.product1.price}`);

        cy.get('[data-cy="productName"]').eq(1).should('have.text', this.data.product2.name);
        cy.get('[data-cy="unitPrice"]').eq(1).should('have.text', `$${this.data.product2.price}`);

        cy.get('[data-cy="productName"]').eq(2).should('have.text', this.data.product3.name);
        cy.get('[data-cy="unitPrice"]').eq(2).should('have.text', `$${this.data.product3.price}`);
    })
})
