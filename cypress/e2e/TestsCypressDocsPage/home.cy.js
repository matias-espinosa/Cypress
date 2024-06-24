describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    })
context('hero section', () => {
    it('home page', () => {
      cy.get('[data-test="hero-heading"] > .block')
        .should("exist")
        .should("be.visible")
        .contains("Testing Next.js Applications with Cypress")
    })
    it('the features on the homepage are correct', () => {
      cy.get('dt').should("be.visible").eq(0).contains("4 Courses")
      cy.get('dt').should("be.visible").eq(1).contains("25+ Lessons")
      cy.get('dt').should("be.visible").eq(2).contains("Free and Open Source")
    })
  });
context('Course section', () => {
  it("Course: Testing Your First.js Application", ()=> {
    cy.getByData("course-0")
    .should("be.visible")
    .find("a").eq(3)
    .click()
    cy.location("pathname").should("eq", "/testing-your-first-application")
  })
  it("Course: Testing Foundation", ()=> {
    cy.getByData("course-1")
    .should("be.visible")
    .find("a").eq(3)
    .click()
    cy.location("pathname").should("eq", "/testing-foundations")
  })
  it("Course: Cypress Fundamentals.", ()=> {
    cy.getByData("course-2")
    .should("be.visible")
    .find("a").eq(3)
    .click()
    cy.location("pathname").should("eq", "/cypress-fundamentals")
  })
});
})