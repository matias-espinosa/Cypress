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
    goToOnlineShop() {
        this.getOnlineShopLink().click();
    }

    openAddProduct() {
        this.getAddProduct().click();
    }

    setProductName(productName) {
        this.getProductName().type(productName);
    }

    setProductPrice(productPrice) {
        this.getProductPrice().type(productPrice);
    }

    setProductCard(productCard) {
        this.getProductCard().type(productCard);
    }

    setProductId(productId) {
        this.getProductId().type(productId);
    }

    submitAddProduct() {
        this.getCreateProduct().click();
    }

    closeModal() {
        this.getCloseModal().click()
    }


    searchByID() {
        this.getSearchType().select('id')
    }

    enterID(productId) {
        this.getSearchBar().clear()
        this.getSearchBar().type(`${productId}{enter}`)
    }

    selectDeleteProduct() {
        this.getDeleteIcon().click();
    }

    submitDeleteProduct() {
        this.getSaveDelete().click();
    }

    //----------------- COMBINED ACTIONS -----------------//
    addProductXXXX(name, price, imgUrl, id)
    {
        cy.getByDataCy('onlineshoplink').click();
        cy.getByDataCy('add-product').click();
        cy.getByDataCy('productName').type(name);
        cy.getByDataCy('productPrice').type(price);
        cy.getByDataCy('productCard').type(imgUrl);
        cy.getByDataCy('productID').type(id);
        cy.getByDataCy('createProduct').click();
    }

    addProduct(productName, productPrice, productCard, productId)
    {
        this.goToOnlineShop()
        this.openAddProduct()
        this.setProductName(productName)
        this.setProductPrice(productPrice)
        this.setProductCard(productCard)
        this.setProductId(productId)
        this.submitAddProduct()
    }

    searchProduct(productId) {
        this.searchByID()
        this.enterID(productId)
    }

    deleteProduct() {
        this.selectDeleteProduct()
        this.submitDeleteProduct()
    }

}

export default OnlineShop;