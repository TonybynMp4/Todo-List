document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addList').addEventListener("click", () => {
        openModal()
    })
    document.getElementById('export').addEventListener("click", () => {
        if (!Lists.length) {
            alert("Vous n'avez pas de liste a exporter!")
            return
        }
        openExportCSVmodal()
    })
    document.getElementById('import').addEventListener("click", () => {
        openImportCSVmodal()
    })
});

function openModal(isTask, listId) {
    const elem = document.createElement("dialog")
    elem.innerHTML = `
        <form method="dialog">
            <input type="text" class="modal-name" placeholder="Nom" name="name" required/>
            ${isTask ? `<input type="date" class="modal-date" placeholder="00-00-0000" name="date"/>` : ''}
            <div class="buttons">
                <button type="reset" id="cancel">Annuler</button>
                <button type="submit">Ajouter</button>
            </div>
        </form>
    `
    document.body.appendChild(elem)
    elem.showModal()
    elem.addEventListener('close', () => {
        elem.remove()
    })
    elem.addEventListener('reset', () => {
        elem.close()
    })
    elem.addEventListener('submit', (event) => {
        event.preventDefault()
        let modalData = {}
        if (isTask) {
            modalData.date = elem.getElementsByClassName("modal-date")[0].value
        }
        modalData.name = elem.getElementsByClassName("modal-name")[0].value
        elem.close()
        if (isTask) {
            const tasks = Lists[listId].tasks
            const newTaskId = tasks.length ? tasks[tasks.length-1].id + 1 : 0
            createTask(listId, modalData.name, modalData.date, newTaskId)
        } else {
            const newListId = Lists.length ? Lists[Lists.length-1].id + 1 : 0
            createList(newListId, modalData.name, [])
        }
    })
}