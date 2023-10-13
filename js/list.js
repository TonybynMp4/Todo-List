let Lists = [] // crée les attribut d'une liste 
class List {
    constructor(id, name, tasks) {
        this.id = id
        this.name = name;
        this.tasks = tasks
    }

    edit(newName) { // modifier le nom d'une lilste
        this.name = newName || this.name
    }

    addTask(task) { // ajouter une tâche a une liste 
        this.tasks[task.id] = task
    }

    removeTask(taskId) { // permet de changer l'amplacement d'un tâche dans une liste 
        this.tasks = this.tasks.slice(taskId)
    }
}

function createListElement(id, name) {// crée la liste dans le dom
    let Element = document.createElement("div");
    const listId = "list" + id
    Element.classList.add("list");
    Element.setAttribute("id", listId);
    Element.innerHTML = `
        <div class="list-header">
            <h2 class="list-header-title">${name}</h2>
            <div class="list-header-buttons">
                <button type="button" class="addTask-button">Ajouter Tache</button>
                <button type="button" class="edit-button">Modifier Titre</button>
                <button type="button" class="delete-button">Supprimer Liste</button>
            </div>
        </div>
        <div class="list-tasks"></div>
    `;
    return Element
}

function filterListTasks(tasks, filterState) {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        const checkedTask = task.getElementsByTagName("input")[0].checked

        if (filterState === 0) {
            task.style.display = checkedTask && "none" || "flex"
        } else if (filterState === 1) {
            task.style.display = !checkedTask && "none" || "flex"
        } else {
            task.style.display = "flex"
        }
    }
}

function addListButtonEvents(listId) {
    const listElement = document.getElementById("list" + listId)
    const titleElement = listElement.getElementsByTagName("h2")[0]

    listElement.getElementsByClassName("addTask-button")[0].addEventListener("click", (e) => {
        e.preventDefault()
        openModal(true, listId)
    })
    listElement.getElementsByClassName("edit-button")[0].addEventListener("click", (e) => {
        e.preventDefault()
        titleElement.setAttribute("contenteditable", "true")
        titleElement.focus()
    })

    // Si focusout ou keydown Enter alors on enlève l'attribut contenteditable et on enregistre les changements
    titleElement.addEventListener("focusout", (event) => {
        event.preventDefault()
        titleElement.setAttribute("contenteditable", "false")
        Lists[listId].edit(titleElement.innerText)
        saveLists();
    })
    titleElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            titleElement.setAttribute("contenteditable", "false")
        }
    })

    listElement.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
        document.getElementById("list" + listId).remove()
        Lists.splice(listId, 1)
        saveLists();
    })
}

function createList(id, name, tasks, isLocal) {
    let list = new List(id, name, tasks);
    Lists[id] = list;
    document.getElementById("lists-container").appendChild(createListElement(id, name));
    addListButtonEvents(id)
    if (tasks.length) {
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i]
            const newTaskId = task.id
            createTask(id, task.name, task.date, newTaskId, isLocal)
        }
    }
    if (!isLocal) {
        saveLists();
    }
}