class OnlineShop {
    //----------------- ELEMENTS -----------------//
    getOnlineShopLink() {
        return cy.getByDataCy('onlineshoplink');
    }

    getAddProduct() {
        return cy.getByDataCy('add-product');
    }

    getProductName() {
        return cy.getByDataCy('productName');
    }

    getProductPrice() {
        return cy.getByDataCy('productPrice');
    }

    getProductCard() {
        return cy.getByDataCy('productCard');
    }

    getProductId() {
        return cy.getByDataCy('productID');
    }

    getCreateProduct() {
        return cy.getByDataCy('createProduct');
    }

    getCloseModal() {
        return cy.getByDataCy('closeModal');
    }

    getSearchType() {
        return cy.getByDataCy('search-type');
    }

    getSearchBar() {
        return cy.getByDataCy('search-bar');
    }

    getDeleteIcon() {
        return cy.getByDataCy('delete-666');
    }

    getSaveDelete() {
        return cy.get('#saveEdit');
    }

    getSearchedId() {
        return cy.getByDataCy('name');
    }

    //----------------- ACTIONS -----------------//

    addProduct(productName, productPrice, productCard, productId)
    {
        this.getAddProduct().click();
        this.getProductName().type(productName)
        this.getProductPrice().type(productPrice);
        this.getProductCard().type(productCard);
        this.getProductId().type(productId);
        this.getCreateProduct().click();
    }

    searchProduct(productId) {
        this.getSearchType().select('id')
        this.getSearchBar().clear()
        this.getSearchBar().type(`${productId}{enter}`)
    }

    deleteProduct() {
        this.getDeleteIcon().click();
        this.getSaveDelete().click();
    }

}

export default OnlineShop;