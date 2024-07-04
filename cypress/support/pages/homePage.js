export class HomePage {
    constructor() {
        this.onlineShopLink = 'onlineshoplink'
    }
    goToOnlineShop() {
        cy.getByDataCy(this.onlineShopLink).click();
    }
}