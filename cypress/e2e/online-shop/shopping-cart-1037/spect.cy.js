const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();
import { ProductPage } from "../../../support/pages/productPage";

describe(`${scenarioName} - ${module} `, () => {

    const productpage = new ProductPage();
    before(() => {
        cy.login(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
    })
    it('Deberia permitir al validar cantidad, nombre, precioUnitario, precioTotal en shoppingCart', () => {
        cy.get('[data-cy="onlineshoplink"]').click();

        cy.getByDataCy(productpage.productName).eq(0).should('be.visible').invoke('text').as('firstProductName');
        cy.getByDataCy(productpage.productPrice).eq(0).invoke('text').as('firstProductUnitPrice');

        cy.get('[data-cy^="add-to-cart-"]').eq(0).click();
        cy.getByDataCy("closeModal").click();
        cy.get('[data-cy^="add-to-cart-"]').eq(0).click();
        cy.get('[data-cy="closeModal"]').click();

        cy.getByDataCy('name').eq(1).invoke('text').as('secondProductName');
        cy.getByDataCy('price').eq(1).invoke('text').as('secondProductUnitPrice');

        cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
        cy.get('[data-cy="closeModal"]').click();

        cy.get('[data-cy="goShoppingCart"]').click();

        cy.get('[data-cy="productAmount"]').eq(0).should('have.text', 2)
        cy.get('[data-cy="productName"]').eq(0).invoke('text').then(function (productName) {
            expect(productName).to.be.equal(this.firstProductName)
        });
        cy.get('[data-cy="unitPrice"]').eq(0).invoke('text').then(function (unitPrice) {
            expect(unitPrice).to.be.equal(`$${this.firstProductUnitPrice}`)
        });

        cy.get('[data-cy="totalPrice"]').eq(0).invoke('text').then(function (totalPrice) {
            expect(totalPrice).to.be.equal(`$${this.firstProductUnitPrice * 2}`)
        })

        cy.get('[data-cy="productAmount"]').eq(1).should('have.text', 1)
        cy.get('[data-cy="productName"]').eq(1).invoke('text').then(function (productName) {
            expect(productName).to.be.equal(this.secondProductName)
        });
        cy.get('[data-cy="unitPrice"]').eq(1).invoke('text').then(function (unitPrice) {
            expect(unitPrice).to.be.equal(`$${this.secondProductUnitPrice}`)
        });
        cy.get('[data-cy="totalPrice"]').eq(1).invoke('text').then(function (totalPrice) {
            expect(totalPrice).to.be.equal(`$${this.secondProductUnitPrice}`)
        });
    });
});