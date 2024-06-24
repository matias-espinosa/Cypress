class OnlineShop {

    selectors()
    {
        
    }

    addProduct(name, price, imgUrl, id)
    {
        cy.getByDataCy('onlineshoplink').click();
        cy.getByDataCy('add-product').click();
        cy.getByDataCy('productName').type(name);
        cy.getByDataCy('productPrice').type(price);
        cy.getByDataCy('productCard').type(imgUrl);
        cy.getByDataCy('productID').type(id);
        cy.getByDataCy('createProduct').click();
    }
}

export default OnlineShop;