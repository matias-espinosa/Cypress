// API
// 1.Ingresar en pushing IT
// 2. Crear 2 productos (primero verificar si existen y eliminarlos)

// FE
// 1.Visitar la pagina
// 2.Dirigirse al online Shop
// 3.Agregar ambos productos al carrito de compra con al menos 2 cantidades cada uno
// 4.Dirigirse al carrito de compras
// 5.Dirigirse al checkout
// 6.Realizar la compra

// SQL
// Verificar la orden de compra que se registro en la basde de datos SQL (Realizar un join
// para verificar ambas tablas ‘purchaseProduct’ y ‘sells’ / el id que comparten ambas
// tablas es el de sells)

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
            data.products.forEach(product  => {
                cy.deleteProductById(product.id);
                cy.createProduct(product)
            });

            homepage.goToOnlineShop()

            data.products.forEach(product => {
                productpage.searchProduct(product.id)
                productpage.clickAddToCartButton(product.id)
                productpage.closeModal()
                productpage.clickAddToCartButton(product.id)
                productpage.closeModal()
            })

            productpage.goToShoppingCart()

            cy.getByDataCy(productpage.billingSummary).click()
            cy.getByDataCy(productpage.checkOut).click()

            productpage.fillCheckOutData(data.checkout.firstName,data.checkout.lastName,data.checkout.cardNumber)

            cy.getByDataCy(productpage.purchase).click()

            cy.getByDataCy(productpage.sellId).invoke('text').as('sellId');

            cy.get('@sellId').then(sellId => {
                const getSellIdQuery = `SELECT pp.product, pp.quantity, pp.price, s.id, s."firstName", s."lastName", s."cardNumber" FROM public."purchaseProducts" AS pp INNER JOIN public."sells" AS s ON s.id = pp.sell_id WHERE s."id" = ${sellId}`;
                cy.task("connectDB", getSellIdQuery).then(result => {
                    const fixturePrice1 = Number(data.products[0].price).toFixed(2);
                    const fixturePrice2 = Number(data.products[1].price).toFixed(2);
                    expect(result[0].product).to.be.equal(data.products[0].name)
                    expect(result[0].quantity).to.be.equal(2)
                    expect(result[0].cardNumber).to.be.equal(data.checkout.cardNumber)
                    expect(result[0].price).to.be.equal(fixturePrice1)
                    expect(result[1].product).to.be.equal(data.products[1].name)
                    expect(result[1].quantity).to.be.equal(2)
                    expect(result[1].cardNumber).to.be.equal(data.checkout.cardNumber)
                    expect(result[1].price).to.be.equal(fixturePrice2)
                });
            });
        });
    });
})

