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
    goToLogin() {
        this.getRegisterToggle().dblclick();
    }

    setUserName(userName) {
        this.getUserNameInput().type(userName);
    }

    setPassword(password) {
        this.getPasswordInput().type(password);
    }

    submit() {
        this.getSubmitButton().click();
    }

    //----------------- COMBINED ACTIONS -----------------//
    loginSuccess(userName, password) {
        this.goToLogin()
        this.setUserName(userName);
        this.setPassword(password);
        this.submit();
    }
}

export default Login;