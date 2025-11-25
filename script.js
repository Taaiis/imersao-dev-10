let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function iniciarBusca() {
    const termoBusca = document.getElementById("search-input").value.toLowerCase();
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.genero.toLowerCase().includes(termoBusca) ||
        dado.sinopse.toLowerCase().includes(termoBusca) ||
        dado.lancamento.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos

    if (dados.length === 0) {
        cardContainer.innerHTML = `<p>Nenhum filme encontrado.</p>`;
        return;
    }

    for (let dado of dados) {
        let article = document.createElement("article")
        article.classList.add("card");
        article.innerHTML = `
        <img src="${dado.imagem}" alt="Banner do filme ${dado.nome}" class="card-image">
        <div class="card-content">
            <h2>${dado.nome}</h2>
            <p><strong>Gênero:</strong> ${dado.genero}</p>
            <p>${dado.descricao}</p>
            <p><strong>Data de lançamento:</strong> ${dado.data_criacao}</p>
            <a href="${dado.link}" target="_blank">Mais informações</a>
        </div>
        `;
        cardContainer.appendChild(article);
    }
}

window.addEventListener("load", carregarDados);
