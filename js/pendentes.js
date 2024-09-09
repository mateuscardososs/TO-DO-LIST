document.addEventListener('DOMContentLoaded', () => {
    const listaTarefas = JSON.parse(localStorage.getItem('lista')) || [];
    const listaPendentes = listaTarefas.filter(task => !task.concluida);
    
    const listContainer = document.getElementById('pendentes-list');
    
    listaPendentes.forEach(task => {
        listContainer.innerHTML += `
        <li class="task">
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
