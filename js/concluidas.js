
document.addEventListener('DOMContentLoaded', () => {
    const listaConcluidas = JSON.parse(localStorage.getItem('lista')).filter(task => task.concluida);
    const listContainer = document.getElementById('concluidas-list');
    listaConcluidas.forEach(task => {
        listContainer.innerHTML += `
        <li class="task done">
            <p class="task-text">${task.tarefa}</p>
        </li>
        `;
    });
});

let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial';
    menuContent.classList.toggle('on', show);
    show = !show;
});
