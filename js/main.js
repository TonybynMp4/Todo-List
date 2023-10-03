let Listes = []
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addList').addEventListener("click", () => {
        const name = prompt("nom")
        const id = Listes.length
        createList(id, name, [])
    })
});

class Liste {
    constructor(id, name, tasks) {
        this.id = id
        this.name = name;
        this.tasks = tasks
    }
}

class Task {
    constructor(id, name, date) {
        this.id = id,
            this.name = name;
        this.date = date;
        this.done = false;
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
    Element.setAttribute("id", "liste" + id);
    Element.innerHTML = `
        <div class="list-header">
            <h2>${name}</h2>
            <div class="list-header-buttons">
                <button class="button">Ajouter Tache</button>
                <button class="button">Supprimer Liste</button>
            </div>
        </div>
        <div class="list-tasks"></div>
    `;
    return Element
}

function addListButtonEvents(id) {
    console.log(document.getElementById("liste" + id))
    document.getElementById("liste" + id).getElementsByClassName("button")[0].addEventListener("click", () => {
        const taskName = prompt("task name")
        const taskDate = prompt("date limite")
        const newTaskId = Listes[id].tasks.length
        if (taskName === null) {
            return
        }
        createTask(id, taskName, taskDate, newTaskId)
    })
    document.getElementById("liste" + id).getElementsByClassName("button")[1].addEventListener("click", () => {
        document.getElementById("liste" + id).remove()
        Listes.splice(id, 1)
    })
}

function createList(id, name, tasks) {
    let list = new Liste(id, name, tasks);
    Listes[id] = list;
    document.getElementById("lists-container").appendChild(createListElement(id, name));
    addListButtonEvents(id)
}

function createTaskElement(id, name, date) {
    let Element = document.createElement('div');
    Element.classList.add('task');
    Element.setAttribute("id", "task" + id);
    Element.innerHTML = `
    <input type="checkbox" class="isDone" name="done"/>
    <input type="text" class="task-name" value="${name}"/>
    <span>${date}</span>
    <button class="button">🗑️</button>
  `;
    return Element
}

function addTaskButtonEvents(liste, id) {
    const listeId = liste.id.replace("liste", "")
    const task = liste.getElementsByClassName("list-tasks")[0].getElementsByClassName("task")[id]
    task.getElementsByClassName("isDone")[0].addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
            Listes[listeId].tasks[id].done = true
        } else {
            Listes[listeId].tasks[id].done = false
        }
    })
}

function createTask(listeId, name, date, id) {
    let task = new Task(id, name, date);
    Listes[listeId].tasks[id] = task;

    let liste = document.getElementById("liste" + listeId);
    liste.getElementsByClassName("list-tasks")[0].appendChild(createTaskElement(id, name, date));
    addTaskButtonEvents(liste, id)
}