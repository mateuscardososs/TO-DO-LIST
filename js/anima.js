const button = document.querySelector('.button-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-task');
const timerModal = document.getElementById('timer-modal');
const closeModalBtn = document.querySelector('.close-btn');
const setDeadlineBtn = document.getElementById('set-deadline-btn');
const deadlineInput = document.getElementById('deadline-input');

let minhaLista = [];
let tarefaAtualId = null;


function adicionarTarefa() {
    const tarefaTexto = input.value.trim();
    if (tarefaTexto === "") return; 

    minhaLista.push({
        id: Date.now(), 
        tarefa: tarefaTexto,
        concluida: false,
        concluidaEm: null, 
        deadline: null 
    });
    input.value = '';  
    mostrarTarefa();  
}


function mostrarTarefa() {
    let novaLi = '';

    const tarefasNaoConcluidas = minhaLista.filter(item => !item.concluida);
    const tarefasConcluidas = minhaLista.filter(item => item.concluida);

 
    const agora = new Date().getTime();
    const tarefasConcluidasVisiveis = tarefasConcluidas.filter(item => {
        return !item.concluidaEm || (agora - item.concluidaEm < 24 * 60 * 60 * 1000); 
    });


    const todasTarefas = [...tarefasNaoConcluidas, ...tarefasConcluidasVisiveis];

    novaLi = '';
    todasTarefas.forEach((item) => {
        novaLi += `
        <li class="task ${item.concluida ? 'done' : ''} ${item.deadline && new Date().getTime() > new Date(item.deadline).getTime() ? 'overdue' : ''}" data-id="${item.id}">
            <i class="bi bi-check-circle" onclick="concluirTarefa(${item.id})"></i>
            <p class="task-text">${item.tarefa}</p>
            <div class="icons-right">
                <i class="bi bi-x-circle" onclick="deletarItem(${item.id})"></i>
                <i class="bi bi-three-dots" onclick="openTimerModal(${item.id})"></i>
            </div>
        </li>
    `;
    });


    novaLi += `</div>`;
    listaCompleta.innerHTML = novaLi;
    localStorage.setItem("lista", JSON.stringify(minhaLista)); 
}


function concluirTarefa(id) {
    const tarefa = minhaLista.find(item => item.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        tarefa.concluidaEm = tarefa.concluida ? new Date().getTime() : null; 
        mostrarTarefa();  
    }
}


function deletarItem(id) {
    const taskElement = document.querySelector(`.task[data-id="${id}"]`);
    if (taskElement) {
        taskElement.style.opacity = '0'; 
        setTimeout(() => {
            minhaLista = minhaLista.filter(item => item.id !== id); 
            mostrarTarefa();
        }, 300);  
    }
}


function openTimerModal(id) {
    tarefaAtualId = id;
    timerModal.style.display = 'block';
}


function setDeadline() {
    const deadline = deadlineInput.value;
    if (tarefaAtualId && deadline) {
        const tarefa = minhaLista.find(item => item.id === tarefaAtualId);
        if (tarefa) {
            tarefa.deadline = deadline; 
            mostrarTarefa();  
        }
    }
    timerModal.style.display = 'none';
}


closeModalBtn.addEventListener('click', () => {
    timerModal.style.display = 'none';
});

setDeadlineBtn.addEventListener('click', setDeadline);


function recarregarTarefa() {
    const tarefaDoLocalStorage = localStorage.getItem("lista");
    if (tarefaDoLocalStorage) {
        minhaLista = JSON.parse(tarefaDoLocalStorage);
    }
    mostrarTarefa();  
}

recarregarTarefa();


button.addEventListener('click', adicionarTarefa);


input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});


let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial';
    menuContent.classList.toggle('on', show);
    show = !show;
});

