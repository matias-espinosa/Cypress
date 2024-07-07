// - Requisitos opcionales
// Crear un metodo que permita encontrar los selectores utilizando el atributo data-cy
// Crear una pagina para products y agregar unicamente los selectore

// - Paso a paso del test de API
// 1.Ingresar en pushing IT
// 2.Buscar el producto
// 3.Eliminar el producto si existe
// 4.Crear el producto
// 5.Editar el producto (nombre precio e imagen unicamente)

// - FE
// 1.Visitar la pagina
// 2.Dirigirse al online Shop
// Buscar el producto por su ID en el search
// Verificar que los datos del producto corresponden a los enviados en la edicion

/// <reference types="Cypress" />
const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();
import { ProductPage } from "../../../support/pages/productPage";
import { HomePage } from "../../../support/pages/homePage";

describe(`${module} `, () => {
    const productpage = new ProductPage();
    const homepage = new HomePage();

    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
    })

    it.only(`${suiteName}-${suiteId}`, () => {
        cy.fixture(`${module}/${suiteName}-${suiteId}/data`).then(data => {
            data.product.id = suiteId;
            cy.deleteProductById(data.product.id);
            cy.createProduct(data.product).then(productID  => {
                cy.editProduct(productID, data.updatedProduct);
                homepage.goToOnlineShop()
                productpage.searchProduct(data.product.id);

                cy.intercept('GET', '**/api/products?id=2').as('getProduct');
                cy.wait('@getProduct').its('response.statusCode').should('eq', 200);

                cy.getByDataCy(productpage.searchedId).eq(0).should('be.visible').invoke('text').then(function(updatedProductName) {
                    expect(updatedProductName).to.be.equal(data.updatedProduct.name)
                });
                cy.getByDataCy(productpage.searchedProductPrice).eq(0).should('be.visible').invoke('text').then(function(updatedProductPrice) {
                    expect(updatedProductPrice).to.be.equal(`${data.updatedProduct.price}`)
                });
                cy.get('img[alt="Dan Abramov"]').should('be.visible').invoke('attr', 'src').then(function(updatedProductImg) {
                    expect(updatedProductImg).to.be.equal(data.updatedProduct.img)
                });
            });
        });
    });
})
