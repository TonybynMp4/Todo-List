document.addEventListener("DOMContentLoaded", () => {
    loadLocalLists();
    // Si l'utilisateur a déjà donné une préférence de thème, on l'applique par défaut
    if (localStorage.colorTheme) {
        document.documentElement.setAttribute('data-theme', localStorage.colorTheme);
        document.getElementById('theme').innerText = localStorage.colorTheme === 'dark' ? '🌙' : '☀️';
    };
});

// Sauvegarde les listes dans le local storage
function saveLists() {
    if (!Lists.length) {
        localStorage.removeItem("Lists");
        return;
    };
    localStorage.setItem("Lists", JSON.stringify(Lists));
};

// Charge les listes sauvegardées dans le local storage
function loadLocalLists() {
    const localLists = localStorage.getItem("Lists");
    if (!localLists) return;
    const lists = [...JSON.parse(localLists)];
    if (!lists.length || lists[0] === null) return;
    for (let i = 0; i < lists.length; i++) {
        const list = lists[i];
        createList(list.id, list.name, list.tasks, true);
    };
};

function saveTheme() {
    localStorage.setItem("colorTheme", document.documentElement.getAttribute('data-theme'));
};