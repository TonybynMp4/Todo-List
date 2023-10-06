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