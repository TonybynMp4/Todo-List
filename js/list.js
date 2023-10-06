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

function addListButtonEvents(listId) {
    document.getElementById("list" + listId).getElementsByTagName("button")[0].addEventListener("click", () => {
        openModal(true, listId)
    })
    document.getElementById("list" + listId).getElementsByTagName("button")[1].addEventListener("click", () => {
        document.getElementById("list" + listId).remove()
        Lists.splice(listId, 1)
    })
}

function createList(id, name, tasks) {
    let list = new List(id, name, tasks);
    Lists[id] = list;
    document.getElementById("lists-container").appendChild(createListElement(id, name));
    addListButtonEvents(id)
}