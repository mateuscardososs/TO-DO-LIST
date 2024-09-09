document.addEventListener('DOMContentLoaded', function() {
    const calendarElement = document.getElementById('calendar');
    const clockElement = document.getElementById('clock');


    function atualizarRelogio() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        const segundos = String(agora.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${horas}:${minutos}:${segundos}`;
    }

    setInterval(atualizarRelogio, 1000);


    function carregarTarefas() {
        const tarefasDoLocalStorage = localStorage.getItem("lista");
        return tarefasDoLocalStorage ? JSON.parse(tarefasDoLocalStorage) : [];
    }


    function criarCalendario() {
        const agora = new Date();
        const ano = agora.getFullYear();
        const mes = agora.getMonth();
        const diaAtual = agora.getDate(); 

        const diasDoMes = new Date(ano, mes + 1, 0).getDate();
        const primeiroDia = new Date(ano, mes, 1).getDay();

        let calendarioHtml = '<table><thead><tr>';
        const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        diasDaSemana.forEach(dia => calendarioHtml += `<th>${dia}</th>`);
        calendarioHtml += '</tr></thead><tbody><tr>';


        for (let i = 0; i < primeiroDia; i++) {
            calendarioHtml += '<td></td>';
        }

        const tarefas = carregarTarefas(); 

        for (let dia = 1; dia <= diasDoMes; dia++) {
            const dataAtual = new Date(ano, mes, dia);
            const isCurrentDate = dia === diaAtual ? 'current-date' : '';


            const tarefasDoDia = tarefas.filter(tarefa => {
                const deadline = new Date(tarefa.deadline);
                return deadline.toDateString() === dataAtual.toDateString();
            });

            if (tarefasDoDia.length > 0) {
                calendarioHtml += `<td class="has-task ${isCurrentDate}">${dia}</td>`;
            } else {
                calendarioHtml += `<td class="${isCurrentDate}">${dia}</td>`;
            }

            if ((dia + primeiroDia) % 7 === 0) {
                calendarioHtml += '</tr><tr>';
            }
        }

        calendarioHtml += '</tr></tbody></table>';
        calendarElement.innerHTML = calendarioHtml;
    }

    criarCalendario();
});


let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial';
    menuContent.classList.toggle('on', show);
    show = !show;
});
