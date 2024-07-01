/// <reference types="Cypress" />
import Login from "../../../pageObjects/loginPage"
import OnlineShop from "../../../pageObjects/onlineShopPage";
const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();


describe(`${module}`, () => {
    //DESAFIO 1
    it.only(`${suiteName}-${suiteId}`, () => {
        const login=new Login();
        const shop=new OnlineShop()

        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data => {
        cy.visit('/')
        login.loginSuccess(data.user.name,data.user.password)
        cy.url().should('include', '/home')
        shop.getOnlineShopLink().click();
        shop.addProduct(data.producto.name, data.producto.price, data.producto.imgUrl, data.producto.id)
        cy.intercept('GET', 'https://pushing-it.onrender.com/api/products?page=1&limit=8').as('productsRequest');
        cy.wait('@productsRequest');
        cy.get('#chakra-modal--body-\\:r58\\:')
          .should('have.text', `${data.producto.name} has been added`)
        shop.getCloseModal().click()
        shop.searchProduct(data.producto.id)
        shop.deleteProduct()
        cy.intercept('GET', 'https://pushing-it.onrender.com/api/products?page=1&limit=8').as('productsRequest');
        cy.wait('@productsRequest');
        cy.get('#chakra-modal--body-\\:r58\\:')
          .should('have.text', `${data.producto.name} has been deleted`)
        shop.getCloseModal().click()
        shop.searchProduct(data.producto.id)
        shop.getSearchedId()
            .should('not.exist')
        })
    });

});


