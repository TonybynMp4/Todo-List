document.addEventListener("DOMContentLoaded", () => {
    loadLocalLists()
    // Si l'utilisateur a déjà donné une préférence de thème, on l'applique par défaut
    if (localStorage.colorTheme) {
        document.documentElement.setAttribute('data-theme', localStorage.colorTheme);
        document.getElementById('theme').innerText = localStorage.colorTheme === 'dark' ? '🌙' : '☀️';
    }
})

// Save Lists to Local Storage
function saveLists() {
    localStorage.setItem("Lists", JSON.stringify(Lists))
}

// Load Lists from Local Storage
function loadLocalLists() {
    const localLists = localStorage.getItem("Lists")
    if (localLists) {
        const lists = [...JSON.parse(localLists)]
        console.log(lists)
        for (let i = 0; i < lists.length; i++) {
            const list = lists[i]
            createList(list.id, list.name, list.tasks, true)
        }
    }
}

function saveTheme() {
    localStorage.setItem("colorTheme", document.documentElement.getAttribute('data-theme'))
}