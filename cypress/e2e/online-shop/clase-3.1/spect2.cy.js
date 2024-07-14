/// <reference types= "cypress" />

const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();
import { HomePage } from "../../../support/pages/homePage";
import { ProductPage } from "../../../support/pages/productPage";

describe(`${scenarioName} - ${module} `, () => {
    const homepage = new HomePage()
    const productpage = new ProductPage ()

    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');

        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as('data');

        cy.then(function () {
            cy.getProducts().as('products');
        });
    });

    it('Deberia permitir al usuario agregar mas de un producto al carrito y validar el mismo', function () {
        this.data.product1 = Cypress._.find(this.products.body.products.docs, {name: this.data.product1.name})
        this.data.product2 = Cypress._.find(this.products.body.products.docs, {name: this.data.product2.name})
        this.data.product3 = Cypress._.find(this.products.body.products.docs, {name: this.data.product3.name})

        homepage.goToOnlineShop()

        cy.get(`[name='${this.data.product1.name}']`).click();
        productpage.closeModal()

        cy.get(`[name='${this.data.product2.name}']`).click();
        productpage.closeModal()

        cy.get(`[name='${this.data.product3.name}']`).click();
        productpage.closeModal()

        productpage.goToShoppingCart()

        cy.getByDataCy(productpage.productName).eq(0).should('have.text', this.data.product1.name);
        cy.getByDataCy(productpage.cartProductPrice).eq(0).should('have.text', `$${this.data.product1.price}`);

        cy.getByDataCy(productpage.productName).eq(1).should('have.text', this.data.product2.name);
        cy.getByDataCy(productpage.cartProductPrice).eq(1).should('have.text', `$${this.data.product2.price}`);

        cy.getByDataCy(productpage.productName).eq(2).should('have.text', this.data.product3.name);
        cy.getByDataCy(productpage.cartProductPrice).eq(2).should('have.text', `$${this.data.product3.price}`);
    })
})