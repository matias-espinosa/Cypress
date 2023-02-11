# CYPRESS 

> Cypress es un framework de automatización basado en JS que ejecuta las pruebas haciendo uso del DOM (Document Object Model), interfaz de programación que nos permite crear, cambiar, o remover elementos así como agregar eventos a esos elementos para hacer más dinámico el Web Site

## Instalar Node:

>  Node es un Framework que nos permite ejecutar código en JS

https://nodejs.org/en/download/

> Creamos un directorio en el que vayamos a trabajar, por ejemplo: <br><br>
`C:\Users\TuUser\Desktop\Repos\qa-automation-training` <br><br>
> Abrimos desde visual studio code ese directorio y corremos el comando **npm init** para iniciar el proyecto (damos ok en todas las opciones de seteo del proyecto)

**Install Cypress via npm:**

`cd /your/project/path`

> On the terminal/console

`npm install cypress --save-dev`

> This will install Cypress locally as a dev dependency for your project.
> <br>
> <br>
> Make sure that you have already run **npm init** or have a **node_modules** folder or **package.json** file in the root of your project to ensure cypress is installed in the correct directory.

## Adding npm Scripts
> Add Cypress command to the **scripts** field in your **package.json** file.

    {
      "scripts": {
        "cypress:open": "cypress open"
      }
    }

> Now you can invoke the command from your project root like so:

`npm run cypress:open`

## Folder structure

### /fixtures 

> To stores data (test data. stub data, API request/response data)

### /e2e

> AL the tests files (with .cy.js)

### /plugins

> To run node process (e.g.: DB query) - cy.task()

### /support

> Reusable custom commands

### cypress.config.js

> Cypress configuration file, to change values to a suite or test

### package.json

> Enter our customized command in the scripts field. Make the complicated command easy with an alias command fixated to it.

## Reference type declarations via jsconfig

> Instead of adding triple slash directives to each JavaScript spec file, some IDEs (like VS Code) understand a common jsconfig.json (or package.json) file in the root of the project. In that file, you can include the Cypress module and your test folders.

    {
    "include": ["./node_modules/cypress", "cypress/**/*.js"]
    }

>  The Intelligent Code Completion should now show help for cy commands inside regular JavaScript spec files.

## Mocha

>  Is a JavaScript test framework running on Node.js and in the browser that Cypress uses

**Suite level command examples**

- describe
- before()
- after ()

**Test level command examples**

- beforeEach()
- afterEach()
- it()
- specify()

## Assertions

>  Chai is a **BDD** (Behaviour-driven) / **TDD** (Test-driven) **assertion library** for node and the browser that can be delightfully paired with any **javascript testing framewors**

- Cypress bundles **Chai**, also **extensions** for **Sinon** and **jQuery**, used for dozens of assertions.
- **BDD** and **TDD** chainers: https://docs.cypress.io/guides/references/assertions

## Jquery

>  It’s a JavaScript library that makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simplerwith an easy-to-use API that works across a multitude of browsers

## CSS 

>  Cascading Style Sheets is a simple mechanism for adding style (e.g., fonts, colors, spacing) to Web documents

## How to get elements

>  Jquery queries DOM element to apply CSS (styles) Cypress uses the same mechanism to Action on the element

## Most used patterns

|  Pattern 1  | Selecting using an *ID*                                   |
| ----------- | --------------------------------------------------------- |
| Syntax      | #id                                                       |
| Description | Selects element with the given id attribute               |
| Example     | `cy.get('div[type=username]').type('standard_user')`      |

 <br>

|  Pattern 2  | Selecting using a *Class*                                 |
| ----------- | --------------------------------------------------------- |
| Syntax      | .class                                                    |
| Description | Selects element(s) with the given id class                |
| Example     | `cy.get('btn_action').click()`                            |

 <br>

|  Pattern 3  | Combination of *Element name (Tag name)* and *Attribute*  |
| ----------- | --------------------------------------------------------- |
| Syntax      | tagname[attName = value]                                  |
| Description | Selects element(s) which matches given combination        |
| Example     | `cy.get('div[type=username]).type('standard_user)`        |

 <br>

|  Pattern 4  | Selecting using *Attribute Equal*
| ----------- | --------------------------------------------------------- |
| Syntax      | [attName = value] or [attName = “value”]                  |
| Description | Selects element which matches attribute name and value    |
| Example     | `cy.get('[class=inventory_list]').click()`                |

 <br>

|  Pattern 5  | Selecting using *Multiple Attributes*
| ----------- | --------------------------------------------------------- |
| Syntax      | [attName1 = value1] [attName2 = value2]                   |
| Description | Selects element(s) which matches this combination. <br> Optionally, the element name/tagname can be added  |
| Example     | `cy.get('[name=txtPassword][type=password`                |

### Other patterns

|  Pattern |  Syntax                                            |  Description                                  |
|  :----:  | -------------------------------------------------- | --------------------------------------------- |
|  6       |  Tagname(id/class) <br> e.g div.p or div#username  |  Combination of tag and id/class              |
|  7       |  parent>child                                      |  Selects the direct child                     |                
|  8       |  [attName*=value]                                  |  Attributes contains given substring          |
|  9       |  [attName^=value]                                  |  Attributes starts with given string          |
|  10      |  [attName$=value]                                  |  Attributes ends with given string            |
|  11      |  :eq(index)                                        |  Selects the specific index (starts from 0)   |
|  12      |  tagname                                           |  Selects the elemement(s) with given tagname  |
|  13      |  (selector1, selector 2, selector n)               |   Multiple valid selectors                    |

## CY commands to find elements

### CY.

1. get()
2. contains()
3. root()

**On exisitng DOM Element**

1. contains()
2. find()
3. filter()
4. children()
5. first(), last()
6. parent(), parents(), parentsUntil()
7. prev(), prevAll(), preveUntil()
8. siblings()
9. window()
10. within()

## /e2e Example
```
describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})
```
