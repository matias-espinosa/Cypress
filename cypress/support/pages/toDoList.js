export class ToDoListPage {
    constructor() {
        this.removeAll = 'removeAll'
        this.addTask = 'task'
    }

    removeAllTasks (){
        return cy.getByDataCy(this.removeAll)
    }
    addOneTask (){
        return cy.getByDataCy(this.addTask).type("Tarea Uno{enter}")
    }
}