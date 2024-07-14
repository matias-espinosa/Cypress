export class HomePage {
    constructor() {
        this.onlineShopLink = 'onlineshoplink'
        this.toDoListLink = 'todolistlink'
    }
    goToOnlineShop() {
        cy.getByDataCy(this.onlineShopLink).click();
    }
    goToToDoList() {
        cy.getByDataCy(this.toDoListLink).click();
    }
}