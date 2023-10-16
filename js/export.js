// Ouvre le modal pour exporter une liste
function openExportCSVmodal() {
    const elem = document.createElement("dialog");

    let listCheckboxes = "";
    // ajoute une checkbox pour chaque liste
    for (let i = 0; i < Lists.length; i++) {
        const list = Lists[i];
        listCheckboxes += `
            <div>
                <input type="checkbox" name="list${i}" id="list${i}" checked/>
                <label for="list${i}">${list.name}</label>
            </div>
        `;
    };

    elem.innerHTML = `
        <form method="dialog">
            <h2>Exporter</h2>
            <p>Choisissez au moins une liste a exporter</p>
            <div class="checkboxes">
                ${listCheckboxes}
            </div>
            <div class="buttons">
                <button type="reset" id="cancel">Annuler</button>
                <button type="submit">Exporter</button>
            </div>
        </form>
    `;

    document.body.appendChild(elem);
    elem.showModal();
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
    // Le bouton 'exporter' exporte les listes
    elem.addEventListener('submit', (event) => {
        event.preventDefault();
        const checkboxes = elem.getElementsByClassName("checkboxes")[0].getElementsByTagName("input");
        if (!checkboxes.length) {
            alert("Vous n'avez pas selectionné de liste.");
            return;
        };
        // On récupère les listes à exporter (les checkbox cochées)
        const listsToExport = [];
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                listsToExport.push(i);
            };
        };
        elem.close();
        exportList(listsToExport);
    });
};

// Exporte les listes données en paramètre en csv
function exportList(listsToExport) {
    let csvContent = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < listsToExport.length; i++) {
        // On récupère les tâches de la liste
        const listId = listsToExport[i];
        csvContent += convertToCSV(listId);
        if (i !== listsToExport.length-1) {
            csvContent += "\n";
        };
    };
    // Si on exporte une seule liste, on met son nom dans le nom du fichier, sinon on met un nom par défaut
    const filename = listsToExport.length === 1 ? Lists[listsToExport[0]].name + ".csv" : null;
    downloadCSV(csvContent, filename || null);
};

// Converti une liste en csv
function convertToCSV(listId) {
    const list = Lists[listId];
    const tasks = list.tasks;
    const csv = [];
    // On ajoute les noms des colonnes, qui servent aussi de séparateur
    csv.push('"listName","id","name","date","checked"');
    if (!tasks.length) {
        csv.push(`"${list.name}",,,`);
        return csv.join("\n");
    };
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        csv.push(`"${list.name}","${task.id}","${task.name}",${task.date || null},"${task.checked || false}"`);
    };
    return csv.join("\n");
};

// on télécharge le fichier csv automatiquement
function downloadCSV(csv, filename) {
    const data = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename || "listExport.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
};