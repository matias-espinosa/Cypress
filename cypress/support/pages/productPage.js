export class ProductPage {
    constructor() {
        this.productName = 'productName';
        this.productPrice = 'productPrice';
        this.searchedProductPrice = 'price';
        this.addProductSelector = 'add-product';
        this.productCard = 'productCard';
        this.productId = 'productID';
        this.createProduct = 'createProduct';
        this.closeModalSelector = 'closeModal';
        this.searchType = 'search-type';
        this.searchBar = 'search-bar';
        this.delete = 'delete-666';
        this.saveEdit = '#saveEdit';
        this.searchedId = 'name';
        this.shoppingCart = 'goShoppingCart';
        this.cartProductPrice = 'unitPrice';
    }

    closeModal() {
        cy.getByDataCy(this.closeModalSelector).click()
    }

    searchProduct(productId) {
        cy.getByDataCy(this.searchType).select('id');
        cy.getByDataCy(this.searchBar).clear();
        cy.getByDataCy(this.searchBar).type(`${productId}{enter}`);
    }

    addProduct(productName, productPrice, productCard, productId) {
        cy.getByDataCy(this.addProductSelector).click();
        cy.getByDataCy(this.productName).type(productName);
        cy.getByDataCy(this.productPrice).type(productPrice);
        cy.getByDataCy(this.productCard).type(productCard);
        cy.getByDataCy(this.productId).type(productId);
        cy.getByDataCy(this.createProduct).click();
    }

    deleteProduct() {
        cy.getByDataCy(this.delete).click();
        cy.get('#saveEdit').click();
    }

     getSearchedId() {
        return cy.getByDataCy(this.searchedId);
    }
    goToShoppingCart() {
        cy.getByDataCy(this.shoppingCart).click()
    }
}