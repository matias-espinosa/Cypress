export class LoginPage {
    constructor() {
        this.registerToggle = 'registertoggle';
        this.userNameInput = 'user';
        this.passwordInput = 'pass';
        this.submitButton = 'submitForm';
    }

    //----------------- ACTIONS -----------------//
    loginSuccess(userName, password) {
        cy.getByDataCy(this.registerToggle).dblclick();
        cy.getByDataCy(this.userNameInput).type(userName);
        cy.getByDataCy(this.passwordInput).type(password);
        cy.getByDataCy(this.submitButton).click();
    }
}

