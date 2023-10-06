document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addList').addEventListener("click", () => {
        const name = prompt("nom")
        const id = Lists.length ? Lists[Lists.length-1].id + 1 : 0
        createList(id, name, [])
    })
});