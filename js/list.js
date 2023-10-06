let Lists = []
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