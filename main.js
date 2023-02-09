const form = document.getElementById("inserirTarefa");
const lista = document.getElementById("lista");
const arrTarefas = JSON.parse(localStorage.getItem("tarefa")) || [];


arrTarefas.forEach((elemento) => {
    criarElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const tarefa = {
        campoTarefa : evento.target.elements['campoTarefa'].value,
        id : gerarId(),
    }

    criarElemento(tarefa);
    arrTarefas.push(tarefa);

    localStorage.setItem('tarefa', JSON.stringify(arrTarefas));

    campoTarefa.value = "";
})

function criarElemento(tarefa) {
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add("itemLista");
    novaTarefa.innerHTML = tarefa.campoTarefa;

    const div = document.createElement('div');

    const concluir = document.createElement('button');
    concluir.innerHTML = '<li class="fa fa-check"></li>';

    const deleta = document.createElement('button');
    deleta.innerHTML = '<li class="fa fa-trash"></li>';

    deleta.addEventListener("click", function() {
        deletarElemento(novaTarefa, tarefa);
    })
    
    div.appendChild(concluir);
    div.appendChild(deleta);

    novaTarefa.appendChild(div);
       
    lista.appendChild(novaTarefa);         
}

function gerarId (){
    return Math.floor(Math.random() * 1000);
}

function deletarElemento(elemento, tarefa) {
    elemento.remove();
    arrTarefas.splice(arrTarefas.findIndex(elemento => elemento.id === tarefa.id), 1);
    
    localStorage.setItem('tarefa', JSON.stringify(arrTarefas));
}