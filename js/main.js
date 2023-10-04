let Lists = []

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addList').addEventListener("click", () => {
        const name = prompt("nom")
        const id = Lists.length ? Lists[Lists.length-1].id + 1 : 0
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
        const taskDate = prompt("date limite (aaaa-mm-jj)")
        const tasks = Lists[id].tasks
        const newTaskId = tasks.length ? tasks[tasks.length-1].id + 1 : 0
        if (taskName === null) {
            return
        }
        createTask(id, taskName, taskDate, newTaskId)
    })
    document.getElementById("list" + id).getElementsByTagName("button")[1].addEventListener("click", () => {
        document.getElementById("list" + id).remove()
        Lists.splice(id, 1)
    })
}

function createList(id, name, tasks) {
    let list = new List(id, name, tasks);
    Lists[id] = list;
    document.getElementById("lists-container").appendChild(createListElement(id, name));
    addListButtonEvents(id)
}

function createTaskElement(listId, task) {
    let Element = document.createElement('div');
    Element.classList.add('task');
    Element.setAttribute("id", "list"+listId+".task" + task.id);
    Element.innerHTML = `
    <input type="checkbox" name="done"/>
    <input type="text" placeholder="Tâche" class="task-name" name="task-name" value="${task.name}"/>
    <input type="date" placeholder="00-00-0000" class="task-date" value="${task.date}"/>
    <button type="button" class="delete-button">🗑️</button>
  `;
    return Element
}

function addTaskButtonEvents(listElement, id) {
    const listId = listElement.id.replace("list", "")
    const list = Lists[listId]
    const tasksElement = listElement.getElementsByClassName("list-tasks")[0].getElementsByClassName("task")
    const taskElement = tasksElement[tasksElement.length-1]
    taskElement.getElementsByTagName("input")[0].addEventListener("change", () => {
        list.tasks[id].check()
    })
    taskElement.getElementsByTagName("input")[1].addEventListener("change", (event) => {
        list.tasks[id].edit(event.currentTarget.value)
    })
    taskElement.getElementsByTagName("input")[2].addEventListener("change", (event) => {
        list.tasks[id].edit(null, event.currentTarget.value)
    })
    taskElement.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
        taskElement.remove()
        list.removeTask(id)
    })
}

function createTask(listId, taskName, taskDate, taskId) {
    let task = new Task(taskId, taskName, taskDate);
    Lists[listId].addTask(task);
    let listElement = document.getElementById("list" + listId);
    listElement.getElementsByClassName("list-tasks")[0].appendChild(createTaskElement(listId, task));
    addTaskButtonEvents(listElement, taskId)
}