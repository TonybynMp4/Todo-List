// Save Lists to Local Storage
function saveLists() {
    localStorage.setItem("Lists", JSON.stringify(Lists))
}

// Load Lists from Local Storage
function loadLocalLists() {
    console.log(localStorage.getItem("Lists") || "Lists is empty")
    const localLists = localStorage.getItem("Lists")
    if (localLists) {
        Lists = [...JSON.parse(localLists)]
        for (let i = 0; i < Lists.length; i++) {
            const list = Lists[i]
            createList(list.id, list.name, list.tasks, true)
        }
    }
}