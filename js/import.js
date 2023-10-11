function openImportCSVmodal() {
    const elem = document.createElement("dialog")
    elem.innerHTML = `
        <form method="dialog">
            <input type="file" name="csv" accept=".csv" required/>
            <div class="buttons">
                <button type="reset" id="cancel">Annuler</button>
                <button type="submit">Importer</button>
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
        const csvFile = elem.getElementsByTagName("input")[0].files[0]
        if (!csvFile) {
            alert("Vous n'avez pas selectionné de fichier.")
            return
        }
        const reader = new FileReader()
        reader.onload = () => {
            const lists = convertFromCSV(reader.result)
            if (!lists) {
                return
            }
            for (let i = 0; i < lists.length; i++) {
                const list = lists[i]
                const newListId = Lists.length ? Lists[Lists.length-1].id + 1 : 0
                createList(newListId, list.name, list.tasks)
            }
        }
        reader.readAsText(csvFile)
        elem.close()
    })
}

function convertFromCSV(csvFile) {
    const lists = []
    const csv = csvFile.replaceAll(/"/g, "").split("\n")

    // on fais des groupes séparés par les noms de colonnes
    let groups = []
    let currentGroup = []
    for (let i = 1; i < csv.length+1; i++) {
        const line = csv[i]
        if (line === 'listName,id,name,date,checked' || i == csv.length) {
            groups.push(currentGroup)
            currentGroup = []
            continue
        }
        currentGroup.push(line)
    }

    if (!groups[0].length) {
        alert("Le fichier est vide ou ne contient pas de liste.")
        return null
    }

    // on crée les listes (et les tâches)
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        let list = {
            name: group[0].split(",")[0],
            tasks: []
        }
        let tasks = []
        if (group[0].slice(-3) === ",,,") {
            lists.push(list)
            continue
        }
        for (let j = 0; j < group.length; j++) {
            const task = group[j]
            const taskData = task.split(",")
            tasks.push({
                id: taskData[1],
                name: taskData[2],
                date: taskData[3] === 'null' ? null : taskData[3],
                checked: taskData[4]
            })
        }
        list.tasks = tasks
        lists.push(list)
    }
    return lists
}