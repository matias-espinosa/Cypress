const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();

describe(`${suiteName} - ${module}`, () => {

    it('Deberia permitir al usuario crear un producto', () => {
        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data => {
            data.user.name = `${data.product.name}-${suiteId}`
            data.employee.name = "fabrizio"
            cy.log(data.product.name)
            cy.log(data.employee.name)
        })
    });
    it.only('test', () => {
        cy.log(module)
    })

});