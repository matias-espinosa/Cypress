// - Requisitos opcionales
// Crear un metodo que permita encontrar los selectores utilizando el atributo data-cy
// Crear una pagina para products y agregar unicamente los selectore

// - Paso a paso del test
// Ingresar en Pushing IT
// Dirigirse a Online Shop
// Agregar un producto nuevo
// Buscar el producto por su ID en el search
// Eliminar el producto
// Volver a buscar el producto
// Verificar que el producto no exista

/// <reference types="Cypress" />
const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();
import { ProductPage } from "../../../support/pages/productPage";
import { HomePage } from "../../../support/pages/homePage";
import { LoginPage } from "../../../support/pages/loginPage";

describe(`${module}`, () => {
    //DESAFIO 1
    it.only(`${suiteName}-${suiteId}`, () => {
        const loginpage=new LoginPage();
        const productpage = new ProductPage();
        const homepage = new HomePage();


        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data => {
        cy.visit('/')

        loginpage.loginSuccess(data.user.name,data.user.password)

        cy.url().should('include', '/home')

        homepage.goToOnlineShop();
        productpage.addProduct(data.producto.name, data.producto.price, data.producto.imgUrl, data.producto.id);

        cy.get('#chakra-modal--body-\\:r58\\:')
          .should('have.text', `${data.producto.name} has been added`)

        productpage.closeModal()
        productpage.searchProduct(data.producto.id)
        productpage.deleteProduct()

        cy.intercept('GET', 'https://pushing-it.onrender.com/api/products?page=1&limit=8').as('productsRequest');
        cy.wait('@productsRequest');

        cy.get('#chakra-modal--body-\\:r58\\:')
          .should('have.text', `${data.producto.name} has been deleted`)

        productpage.closeModal()
        productpage.searchProduct(data.producto.id)
        productpage.getSearchedId()
          .should('not.exist')

        })
    });
});


