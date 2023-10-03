let Listes = []
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addList').addEventListener("click", () => {
    const name = prompt("nom")
    const id = Listes.length
    addList(id, name, [])
  })
});

class Liste {
  constructor(id, name, tasks){
    this.id = id
    this.name = name;
    this.tasks = tasks
  }
}

class Task {
  constructor(id, name, date) {
    this.id = id,
    this.name = name;
    this.date = date;
    this.done = false;
  }

  check() {
    this.done = !this.done;
  }

  edit() {
    
  }
}

const toDoApp = {
  listes: [],
    
  creerListe(nom, date) {
    const nouvelleListe = new Liste(nom, date);
    this.listes.push(nouvelleListe);
    return nouvelleListe;
  },


  editerListe(nomListe, nouveauNom) {
    const liste = this.listes.find(liste => liste.nom === nomListe);
    if (liste) {
      liste.nom = nouveauNom;
    }
  },

  editerTache(nomListe, nomTache, nouvelleNom, nouvelleDate, nouvelleLimite) {
    const liste = this.listes.find(liste => liste.nom === nomListe);
    if (liste) {
      const tache = liste.taches.find(tache => tache.nom === nomTache);
      if (tache) {
        tache.nom = nouvelleNom;
        tache.date = nouvelleDate;
        tache.limite = nouvelleLimite;
      }
    }
  },

  cocherTache(nomListe, nomTache, etat) {
    const liste = this.listes.find(liste => liste.nom === nomListe);
    if (liste) {
      const tache = liste.taches.find(tache => tache.nom === nomTache);
      if (tache) {
        tache.faite = etat;
      }
    }
  }
};

function editerTache() {
  const listeSelectionnee = listeListes.querySelector('.selectionnee');
  const tacheSelectionnee = listeTaches.querySelector('.selectionnee');
  if (listeSelectionnee && tacheSelectionnee) {
    const nomListe = listeSelectionnee.textContent;
    const nomTache = tacheSelectionnee.textContent.split(',')[0].slice(7);
    const nouveauNom = prompt('Entrez le nouveau nom de la tâche :');
    const nouvelleDate = prompt('Entrez la nouvelle date de la tâche :');
    const nouvelleLimite = prompt('Entrez la nouvelle limite de la tâche :');
    if (nouveauNom !== null && nouvelleDate !== null && nouvelleLimite !== null) {
      toDoApp.editerTache(nomListe, nomTache, nouveauNom, nouvelleDate, nouvelleLimite);
      tacheSelectionnee.textContent = `Tâche: ${nouveauNom}, Date: ${nouvelleDate}`;
    }
  }
}

function cocherTache() {
  const tacheSelectionnee = listeTaches.querySelector('.selectionnee');
  if (tacheSelectionnee) {
    const nomListe = listeListes.querySelector('.selectionnee').textContent;
    const nomTache = tacheSelectionnee.textContent.split(',')[0].slice(7);
    const etat = confirm('La tâche est-elle faite ?');
    toDoApp.cocherTache(nomListe, nomTache, etat);
    tacheSelectionnee.style.textDecoration = etat ? 'line-through' : 'none';
  }
}

function addTask (liste, nom, date, limite) {
  const nouvelleTache = new Tache(nom, date, limite);
  liste.taches.push(nouvelleTache);
  return nouvelleTache;

}

function addList (id, name, tasks){
  let list = new Liste(id, name, tasks);
  Listes[id] = list;
  let Element = document.createElement("div");
  Element.classList.add("list");
  Element.setAttribute("id","liste" + id);
  Element.innerHTML = `
    <div class="list-header">
      <h2>${list.name}</h2>
      <button class="list-button">Ajouter Tache</button>
      <button class="list-button">Supprimer Liste</button>
      </div>
    <div class="list-tasks"></div>
  `;
  document.getElementById("lists-container").appendChild(Element);
  document.getElementById("liste"+id).getElementsByClassName("list-button")[0].addEventListener("click", () => {
    const taskName=prompt("task name")
    const taskDate = prompt("date limite")
    const newTaskId = Listes[id].tasks.length
    if (taskName ===  null) {
      return
    }
    createTask(id, taskName, taskDate, newTaskId)
  })
}

function createTask (listeId, name , date, id){
  let task = new Task (id, name, date);
  Listes[listeId].tasks[id] = task;
  let Element = document.createElement('div');
  Element.classList.add('task');
  Element.setAttribute ("id", "task"+id);
  Element.innerHTML = `
    <input type="checkbox" class="done" name="done"/>
    <label for="done">${name}</label>
  `; 
  let liste = document.getElementById("liste" + listeId);
  console.log(liste, id)
  liste.getElementsByClassName("list-tasks")[id].appendChild(Element);

  liste.getElementsByClassName("list-tasks")[id].getElementsByClassName("done")[0].addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      Listes[listeId].tasks[id].done = true
    } else {
      Listes[listeId].tasks[id].done = false
    }
    console.log(Listes[listeId].tasks[id])
  })


}
