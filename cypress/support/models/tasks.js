Cypress.Commands.add('verifyTask', (task) => {
    cy.contains('p', task.name);
    if (task.completed) {
        cy.contains('p', task.name).should('have.attr', 'style', 'text-decoration: line-through;');
    } else {
        cy.contains('p', task.name).should('have.attr', 'style', 'text-decoration: none;');
    }
});