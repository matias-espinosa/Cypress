Cypress.Commands.add('verifyShoppingCart', (line, product) => {
    let index = 0
    cy.get('li[class="css-0"]').eq(line).within(() => {
        Cypress._.forEach(product, (value, attr) => {
            if (attr == 'price' || attr == 'totalPrice') {
                cy.get('p').eq(index).invoke('text').then(text => {
                    expect(text).to.be.equal(`$${value}`, `expected ${attr} to be ${value} but found ${text}`)
                })
                index++
            } else {
                cy.get('p').eq(index).should('have.text', value);
                index++
            }
        });
    });
});