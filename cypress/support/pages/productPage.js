export class ProductPage {
    constructor() {
        this.productName = 'name';
        this.productPrice = 'price';
        this.addProduct = 'add-product';
        this.productCard = 'productCard';
        this.productId = 'productID';
        this.createProduct = 'createProduct';
        this.closeModal = 'closeModal';
        this.searchType = 'search-type';
        this.searchBar = 'search-bar';
        this.delete666 = 'delete-666';
        this.saveEdit = '#saveEdit';
    }

    searchProduct(productId) {
        cy.getByDataCy(this.searchType).select('id');
        cy.getByDataCy(this.searchBar).clear();
        cy.getByDataCy(this.searchBar).type(`${productId}{enter}`);
    }

}