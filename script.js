// Ativa o modo estrito do JavaScript, ajudando na prevenção de erros
// e tornando o código mais seguro e organizado.
"use strict";


// Seleciona os elementos do HTML que serão manipulados pelo JavaScript
const container = document.getElementById("container-cards");

const loading = document.getElementById("loading");

const pesquisa = document.getElementById("pesquisa");

const modal = document.getElementById("modal");

const fecharModal = document.getElementById("fechar-modal");


// Array utilizado para armazenar os personagens recebidos da API
let personagens = [];


// Função responsável por traduzir os status dos personagens
function traduzirStatus(status) {

    if (status === "Alive") {
        return "Vivo";
    }

    if (status === "Dead") {
        return "Morto";
    }

    return "Desconhecido";
}


// Realiza o consumo da API Rick and Morty utilizando fetch
fetch("https://rickandmortyapi.com/api/character")

    // Converte a resposta da API para JSON
    .then(response => response.json())

    .then(data => {

        // Armazena os personagens recebidos da API
        personagens = data.results;

        // Remove a tela de carregamento
        loading.style.display = "none";

        // Exibe os personagens na tela
        mostrarPersonagens(personagens);

    })

    // Trata possíveis erros da requisição
    .catch(error => {

        loading.innerHTML = "Erro ao carregar API";

        console.log(error);

    });


// Função responsável por criar os cards dinamicamente
function mostrarPersonagens(lista) {

    // Limpa os cards antes de renderizar novamente
    container.innerHTML = "";

    // Percorre a lista de personagens
    lista.forEach(personagem => {

        // Criação do card principal
        const card = document.createElement("div");

        card.classList.add("card");


        // Criação do nome do personagem
        const nome = document.createElement("h2");

        nome.textContent = personagem.name;


        // Criação da imagem do personagem
        const imagem = document.createElement("img");

        imagem.src = personagem.image;


        // Criação do status do personagem
        const status = document.createElement("p");

        status.textContent =
            "Status: " + traduzirStatus(personagem.status);


        // Adiciona os elementos dentro do card
        card.appendChild(nome);

        card.appendChild(imagem);

        card.appendChild(status);


        // Evento de clique para abrir o modal com detalhes
        card.addEventListener("click", () => {

            abrirModal(personagem);

        });


        // Adiciona o card dentro do container principal
        container.appendChild(card);

    });

}


// Evento responsável pela pesquisa de personagens em tempo real
pesquisa.addEventListener("input", () => {

    // Captura o texto digitado pelo usuário
    const valor = pesquisa.value.toLowerCase();

    // Filtra os personagens pelo nome
    const filtrados = personagens.filter(personagem =>

        personagem.name.toLowerCase().includes(valor)

    );

    // Exibe apenas os personagens filtrados
    mostrarPersonagens(filtrados);

});


// Função responsável por abrir o modal com informações adicionais
function abrirModal(personagem) {

    // Remove a classe hidden para exibir o modal
    modal.classList.remove("hidden");


    // Exibe a imagem do personagem
    document.getElementById("modal-img").src =
        personagem.image;

    // Exibe o nome do personagem
    document.getElementById("modal-nome").textContent =
        personagem.name;

    // Exibe o status traduzido
    document.getElementById("modal-status").textContent =
        "Status: " + traduzirStatus(personagem.status);

    // Exibe a espécie do personagem
    document.getElementById("modal-especie").textContent =
        "Espécie: " + personagem.species;

    // Exibe o gênero do personagem
    document.getElementById("modal-genero").textContent =
        "Gênero: " + personagem.gender;

    // Exibe a origem do personagem
    document.getElementById("modal-origem").textContent =
        "Origem: " + personagem.origin.name;

    // Exibe a última localização conhecida
    document.getElementById("modal-localizacao").textContent =
        "Última localização: " + personagem.location.name;

}


// Evento responsável por fechar o modal ao clicar no botão X
fecharModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});


// Evento responsável por fechar o modal ao clicar fora da área de conteúdo
modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.add("hidden");

    }

});

