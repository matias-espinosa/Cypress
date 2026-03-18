const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    const date = new Date();

    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as('data')
        cy.visit('');
        cy.get('[data-cy="onlineshoplink"]').click();
        cy.get('[aria-label="Add to cart"]').should('be.visible')
    });

    it.only('Deberia permitir al usuario validar productos', function () {
        cy.verifyProduct(0, {
            name: this.data.products.product1.name,
            price: this.data.products.product1.price
        });

        cy.verifyProductsFix(this.data.products);
    });

    it('Deberia permitir al usuario validar shoppingCart', function () {
        this.data.products.product1.totalPrice = this.data.products.product1.quantity * this.data.products.product1.price
        this.data.products.product2.totalPrice = this.data.products.product2.quantity * this.data.products.product2.price

        cy.get('[id="add-to-cart-1000"]').click();
        cy.getByDataCy('closeModal').click();

        cy.get('[id="add-to-cart-1000"]').click();
        cy.getByDataCy('closeModal').click();

        cy.get('[id="add-to-cart-1001"]').click();
        cy.getByDataCy('closeModal').click();

        cy.getByDataCy('goShoppingCart').click()

        cy.verifyShoppingCart(0, this.data.products.product1)
        cy.verifyShoppingCart(1, this.data.products.product2)

    });

    it('Deberia permitir al usuario validar shoppingCart', function () {
        cy.get('[id="add-to-cart-1000"]').click();
        cy.getByDataCy('closeModal').click();

        cy.getByDataCy('goShoppingCart').click()
        cy.formatCurrency(23.756).then(totalPrice => {
            cy.get('[data-cy="totalPrice"]').should('have.text', totalPrice)
        });

        cy.get('[data-cy="totalPrice"]').invoke('text').then(text => {
            const actualResult = parseFloat(text.replace(/[$,]/g, ''));
            expect(actualResult).to.be.closeTo(23.754, 0.02)
        });
    });

    it('fechas', () => {
        let fecha = date.toLocaleDateString('en-UK')
        let fecha2 = date.toLocaleDateString('es-es')
        let fecha3 = date.toLocaleDateString('en-US')

        cy.log(fecha)
        cy.log(fecha2)
        cy.log(fecha3)
    })
});