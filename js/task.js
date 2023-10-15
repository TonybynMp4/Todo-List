class Task { // permet de donée les paramètre d'une tâche
    constructor(id, name, date, done) {
        this.id = id,
        this.name = name;
        this.date = date && date.replace(/\//g, "-") || '';
        this.done = done || false;
    }

    check() { // permet de cocher si une tâche est accomplis ou non
        this.done = !this.done;
    }

    edit(newName, newDate) { // permet d'editer une tâche (nom et date)
        this.name = newName || this.name;
        this.date = newDate || this.date;
    }
}

function createTaskElement(listId, task) { // permet de crée une tâche
    let Element = document.createElement('div');
    Element.classList.add('task');
    Element.setAttribute("id", "list"+listId+".task" + task.id);//permet de mettre dans le HTML l'attribut id a la tâche et de lui donner une valeur
    Element.innerHTML = `
        <input type="checkbox" name="done"/>
        <p class="task-name">${task.name}</p>
        <input type="date" placeholder="00-00-0000" class="task-date" value="${task.date}"/>
        <div class="task-buttons">
            <button type="button" class="edit-button">✏️</button>
            <button type="button" class="delete-button">🗑️</button>
        </div>
    `;// rajoute le code nécéssaire pour chaque nouvelle tâche
    return Element
}

function addTaskButtonEvents(listElement, taskId) { // ajoute une bouton pour dire si la tâche est faite ou non
    const listId = listElement.id.replace("list", "")
    const list = Lists[listId]
    const tasksElement = listElement.getElementsByClassName("list-tasks")[0].getElementsByClassName("task")// sélectionne la tâche dans le DOM
    const taskElement = tasksElement[tasksElement.length-1]
    const taskNameElement = taskElement.getElementsByTagName("p")[0]

    // Coche la tâche
    taskElement.getElementsByTagName("input")[0].addEventListener("change", () => {
        list.tasks[taskId].check()
        saveLists();
    })
    // Modifie la date de la tâche
    taskElement.getElementsByTagName("input")[1].addEventListener("change", (e) => {
        list.tasks[taskId].edit(null, e.currentTarget.value)
        saveLists();
    })
    taskElement.getElementsByClassName("edit-button")[0].addEventListener("click", (e) => {
        e.preventDefault()
        taskNameElement.setAttribute("contenteditable", "true")
        taskNameElement.focus()
    })

    // Si focusout ou keydown Enter alors on enlève l'attribut contenteditable et on enregistre les changements
    taskNameElement.addEventListener("focusout", (e) => {
        e.preventDefault()
        taskNameElement.setAttribute("contenteditable", "false")
        Lists[listId].tasks[taskId].edit(taskNameElement.innerText, null)
        saveLists();
    })
    taskNameElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            taskNameElement.setAttribute("contenteditable", "false")
        }
    })

    // Supprime la tâche
    taskElement.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
        taskElement.remove()
        list.removeTask(taskId)
        saveLists();
    })
}

// permet de créer une tâche
function createTask(listId, taskName, taskDate, taskId, isLocal) {
    let task = new Task(taskId, taskName, taskDate);
    Lists[listId].addTask(task);
    let listElement = document.getElementById("list" + listId);
    listElement.getElementsByClassName("list-tasks")[0].appendChild(createTaskElement(listId, task));
    addTaskButtonEvents(listElement, taskId)
    if (!isLocal) {
        saveLists();
    }
}