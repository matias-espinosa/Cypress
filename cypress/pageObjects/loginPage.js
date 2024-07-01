class Login {
    //----------------- ELEMENTS -----------------//
    getRegisterToggle() {
        return cy.getByDataCy('registertoggle');
    }

    getUserNameInput() {
        return cy.getByDataCy('user');
    }

    getPasswordInput() {
        return cy.getByDataCy('pass');
    }

    getSubmitButton() {
        return cy.getByDataCy('submitForm');
    }

    //----------------- ACTIONS -----------------//
    loginSuccess(userName, password) {
        this.getRegisterToggle().dblclick();
        this.getUserNameInput().type(userName);
        this.getPasswordInput().type(password);
        this.getSubmitButton().click();
    }
}

export default Login;