Cypress.Commands.add('getProductById', (productID) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?id=${productID}`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    });
});
Cypress.Commands.add('deleteProductById', (productID) => {
    cy.getProductById(productID).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        });
    });
});


Cypress.Commands.add('createProduct', (product) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/create-product`,
        body: product,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        }
    }).then((response) => {
        return response.body.product._id;
    });
});


Cypress.Commands.add('editProduct', (productID, updatedProduct) => {
    cy.request({
        method: "PUT",
        url: `${Cypress.env().baseUrlAPI}/product/${productID}`,
        body: updatedProduct,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        }
    });
});

Cypress.Commands.add('getProductByName', (productName) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?name=${productName}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    });
});


Cypress.Commands.add('getProducts', () => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    });
});