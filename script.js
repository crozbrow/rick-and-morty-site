//Utilizei ‘use strict’ para ativar o modo estrito do JavaScript, ajudando na prevenção de erros e tornando o código mais seguro.

"use strict";

const container = document.getElementById("container-cards");

const loading = document.getElementById("loading");

const pesquisa = document.getElementById("pesquisa");

const modal = document.getElementById("modal");

const fecharModal = document.getElementById("fechar-modal");

let personagens = [];


// TRADUZIR STATUS

function traduzirStatus(status) {

    if (status === "Alive") {
        return "Vivo";
    }

    if (status === "Dead") {
        return "Morto";
    }

    return "Desconhecido";
}


// BUSCAR API

fetch("https://rickandmortyapi.com/api/character")

    .then(response => response.json())

    .then(data => {

        personagens = data.results;

        loading.style.display = "none";

        mostrarPersonagens(personagens);

    })

    .catch(error => {

        loading.innerHTML = "Erro ao carregar API";

        console.log(error);

    });


// MOSTRAR PERSONAGENS

function mostrarPersonagens(lista) {

    container.innerHTML = "";

    lista.forEach(personagem => {

        // CARD

        const card = document.createElement("div");

        card.classList.add("card");


        // NOME

        const nome = document.createElement("h2");

        nome.textContent = personagem.name;


        // IMAGEM

        const imagem = document.createElement("img");

        imagem.src = personagem.image;


        // STATUS

        const status = document.createElement("p");

        status.textContent =
            "Status: " + traduzirStatus(personagem.status);


        // MONTAR CARD

        card.appendChild(nome);

        card.appendChild(imagem);

        card.appendChild(status);


        // ABRIR MODAL AO CLICAR

        card.addEventListener("click", () => {

            abrirModal(personagem);

        });


        // ADICIONAR NA TELA

        container.appendChild(card);

    });

}


// PESQUISA

pesquisa.addEventListener("input", () => {

    const valor = pesquisa.value.toLowerCase();

    const filtrados = personagens.filter(personagem =>

        personagem.name.toLowerCase().includes(valor)

    );

    mostrarPersonagens(filtrados);

});


// MODAL

function abrirModal(personagem) {

    modal.classList.remove("hidden");


    document.getElementById("modal-img").src =
        personagem.image;

    document.getElementById("modal-nome").textContent =
        personagem.name;

    document.getElementById("modal-status").textContent =
        "Status: " + traduzirStatus(personagem.status);

    document.getElementById("modal-especie").textContent =
        "Espécie: " + personagem.species;

    document.getElementById("modal-genero").textContent =
        "Gênero: " + personagem.gender;

    document.getElementById("modal-origem").textContent =
        "Origem: " + personagem.origin.name;

    document.getElementById("modal-localizacao").textContent =
        "Última localização: " + personagem.location.name;

}


// FECHAR MODAL

fecharModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});


// FECHAR AO CLICAR FORA

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.add("hidden");

    }

});

