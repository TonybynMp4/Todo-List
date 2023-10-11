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

function createTaskElement(listId, task) {
    let Element = document.createElement('div');
    Element.classList.add('task');
    Element.setAttribute("id", "list"+listId+".task" + task.id);
    Element.innerHTML = `
        <input type="checkbox" name="done"/>
        <p class="task-name">${task.name}</p>
        <input type="date" placeholder="00-00-0000" class="task-date" value="${task.date}"/>
        <div class="task-buttons">
            <button type="button" class="edit-button">✏️</button>
            <button type="button" class="delete-button">🗑️</button>
        </div>
    `;
    return Element
}

function addTaskButtonEvents(listElement, taskId) {
    const listId = listElement.id.replace("list", "")
    const list = Lists[listId]
    const tasksElement = listElement.getElementsByClassName("list-tasks")[0].getElementsByClassName("task")
    const taskElement = tasksElement[tasksElement.length-1]
    const taskNameElement = taskElement.getElementsByTagName("p")[0]

    taskElement.getElementsByTagName("input")[0].addEventListener("change", () => {
        list.tasks[taskId].check()
    })
    taskElement.getElementsByTagName("input")[1].addEventListener("change", (e) => {
        list.tasks[taskId].edit(null, e.currentTarget.value)
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
    })
    taskNameElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            taskNameElement.setAttribute("contenteditable", "false")
        }
    })

    taskElement.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
        taskElement.remove()
        list.removeTask(taskId)
    })
}

function createTask(listId, taskName, taskDate, taskId) {
    let task = new Task(taskId, taskName, taskDate);
    Lists[listId].addTask(task);
    let listElement = document.getElementById("list" + listId);
    listElement.getElementsByClassName("list-tasks")[0].appendChild(createTaskElement(listId, task));
    addTaskButtonEvents(listElement, taskId)
}