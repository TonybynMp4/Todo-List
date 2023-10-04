let Lists = []

Lists.updateIds = function() {
    this.forEach((list, index) => {
        list.id = index
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addList').addEventListener("click", () => {
        const name = prompt("nom")
        const id = Lists.length
        createList(id, name, [])
    })
});

class List {
    constructor(id, name, tasks) {
        this.id = id
        this.name = name;
        this.tasks = tasks
    }

    edit(newName) {
        this.name = newName || this.name
    }

    addTask(task) {
        this.tasks[task.id] = task
    }

    removeTask(taskId) {
        this.tasks = this.tasks.slice(taskId)
    }

    updateIds() {
        this.tasks.forEach((task, index) => {
            task.id = index
        })
    }
}

class Task {
    constructor(id, name, date, done) {
        this.id = id,
        this.name = name;
        this.date = date && date.replace(/\//g, "-");
        this.done = done || false;
    }

    check() {
        this.done = !this.done;
    }

    edit(newName, newDate) {
        this.name = newName || this.name;
        this.date = newDate || this.date;
    }
}

function createListElement(id, name) {
    let Element = document.createElement("div");
    Element.classList.add("list");
    Element.setAttribute("id", "list" + id);
    Element.innerHTML = `
        <div class="list-header">
            <h2>${name}</h2>
            <div class="list-header-buttons">
                <button type="button">Ajouter Tache</button>
                <button type="button">Supprimer Liste</button>
            </div>
        </div>
        <div class="list-tasks"></div>
    `;
    return Element
}

function addListButtonEvents(id) {
    document.getElementById("list" + id).getElementsByTagName("button")[0].addEventListener("click", () => {
        const taskName = prompt("task name")
        const taskDate = prompt("date limite")
        const newTaskId = Lists[id].tasks.length
        if (taskName === null) {
            return
        }
        createTask(id, taskName, taskDate, newTaskId)
    })
    document.getElementById("list" + id).getElementsByTagName("button")[1].addEventListener("click", () => {
        document.getElementById("list" + id).remove()
        Lists.splice(id, 1)
        Lists.updateIds()
    })
}

function createList(id, name, tasks) {
    let list = new List(id, name, tasks);
    Lists[id] = list;
    document.getElementById("lists-container").appendChild(createListElement(id, name));
    addListButtonEvents(id)
}

function createTaskElement(task) {
    let Element = document.createElement('div');
    Element.classList.add('task');
    Element.setAttribute("id", "task" + task.id);
    Element.innerHTML = `
    <input type="checkbox" name="done"/>
    <input type="text" placeholder="Tâche" class="task-name" value="${task.name}"/>
    <input type="date" placeholder="00-00-0000" class="task-date" value="${task.date}"/>
    <button type="button" class="delete-button">🗑️</button>
  `;
    return Element
}

function addTaskButtonEvents(listElement, id) {
    const listId = listElement.id.replace("list", "")
    const list = Lists[listId]
    const task = listElement.getElementsByClassName("list-tasks")[0].getElementsByClassName("task")[id]
    task.getElementsByTagName("input")[0].addEventListener("change", () => {
        list.tasks[id].check()
    })
    task.getElementsByTagName("input")[1].addEventListener("change", (event) => {
        list.tasks[id].edit(event.currentTarget.value)
    })
    task.getElementsByTagName("input")[2].addEventListener("change", (event) => {
        list.tasks[id].edit(null, event.currentTarget.value)
    })
    task.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
        task.remove()
        list.removeTask(id)
        list.updateIds()
    })
}

function createTask(listId, name, date, id) {
    let task = new Task(id, name, date);
    Lists[listId].addTask(task);
    let listElement = document.getElementById("list" + listId);
    listElement.getElementsByClassName("list-tasks")[0].appendChild(createTaskElement(task));
    addTaskButtonEvents(listElement, id)
}