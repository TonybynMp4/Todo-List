let filterState = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Ouverture du modal pour ajouter une liste
    document.getElementById('addList').addEventListener("click", () => {
        openModal(false, null);
    });
    // Bouton pour exporter les listes au format CSV
    document.getElementById('export').addEventListener("click", () => {
        if (!Lists.length) {
            alert("Vous n'avez pas de liste a exporter!");
            return;
        };
        openExportCSVmodal();
    });
    // Bouton pour importer un fichier CSV
    document.getElementById('import').addEventListener("click", () => {
        openImportCSVmodal();
    });
    // filtre les taches de toutes les listes entre "toutes", "non complétées" et "complétées"
    document.getElementById('filter').addEventListener("click", () => {
        filterTasks(filterState);
        filterState = (filterState + 1) % 3;
    });
    // Switch entre dark et light mode
    document.getElementById('theme').addEventListener("click", () => {
        const currentTheme = localStorage.colorTheme || document.documentElement.getAttribute('data-theme');
        const switchToTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', switchToTheme);
        document.getElementById('theme').innerText = switchToTheme === 'dark' ? '🌙' : '☀️';
        saveTheme();
    });
});

// Filtre liste par liste
function filterTasks(filterState) {
    for (let i = 0; i < Lists.length; i++) {
        const list = Lists[i];
        const tasks = document.getElementById("list" + list.id).getElementsByClassName("list-tasks")[0].getElementsByClassName("task");
        filterListTasks(tasks, filterState);
    };
};

// Créer puis ouvre le menu pour ajouter une liste/tâche
function openModal(isTask, listId) {
    const elem = document.createElement("dialog");
    elem.innerHTML = `
        <form method="dialog">
            <input type="text" class="modal-name" placeholder="Nom" name="name" required/>
            ${isTask ? `<input type="date" class="modal-date" placeholder="00-00-0000" name="date"/>` : ''}
            <div class="buttons">
                <button type="reset" id="cancel">Annuler</button>
                <button type="submit">Ajouter</button>
            </div>
        </form>
    `;
    document.body.appendChild(elem);
    // retire le modal du dom quand il est fermé
    elem.addEventListener('close', () => {
        elem.remove();
    });
    // Ferme le modal si on clique sur annuler
    elem.addEventListener('reset', () => {
        elem.close();
    });
    // Ferme le modal si on clique en dehors de celui-ci
    elem.addEventListener('click', (e) => {
        if (e.target.nodeName === "DIALOG") {
            elem.close();
        };
    });
    elem.addEventListener('submit', (event) => {
        event.preventDefault();
        let modalData = {};
        if (isTask) {
            modalData.date = elem.getElementsByClassName("modal-date")[0].value;
        };
        modalData.name = elem.getElementsByClassName("modal-name")[0].value;
        elem.close();
        if (isTask) {
            const tasks = Lists[listId].tasks;
            const newTaskId = tasks.length ? tasks[tasks.length-1].id + 1 : 0;
            createTask(listId, modalData.name, modalData.date, newTaskId);
        } else {
            const newListId = Lists.length ? Lists[Lists.length-1].id + 1 : 0;
            createList(newListId, modalData.name, []);
        };
    });

    // Ouvre le modal
    elem.showModal();
};