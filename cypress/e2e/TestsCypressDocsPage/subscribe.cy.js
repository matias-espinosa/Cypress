describe('template spec', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      })
    ctx('subscribe', () => {
        it('allows users to subscribe to the email list', () => {
            cy.getByData("email-input")
            .should("be.visible")
            .type("tom@aoa.com")
            cy.getByData("submit-button").click()
            cy.getByData("success-message").should("exist").contains("tom@aoa.com")
        })

        it('does NOT allow a invalid email address', () => {
            cy.getByData("email-input")
            .should("be.visible")
            .type("tom")
            cy.getByData("submit-button").click()
            cy.getByData("success-message").should("not.exist")
        })

        it('already exists', () => {
            cy.getByData("email-input")
            .should("be.visible")
            .type("john@example.com")
            cy.getByData("submit-button").click()
            cy.getByData("server-error-message").should("exist").contains("Error: john@example.com already exists. Please use a different email address.")
        })
    });
  })