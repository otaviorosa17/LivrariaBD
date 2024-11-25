async function fetchLivros() {
    try {
        const response = await fetch("http://127.0.0.1:5000/book");
        const livros = await response.json();
        console.log(livros); // Exibe os livros no console
        return livros; // Retorna os dados para uso posterior
    } catch (error) {
        console.log("Erro na requisição:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

async function fetchLivrosComFiltro() {
    try {
        const url = new URL("http://127.0.0.1:5000/book");
        const params = new URLSearchParams();
        const nome = document.getElementById("filtro-nome").value

        if (nome) params.append("nome",nome);
        url.search = params.toString()

        const response = await fetch(url);
        const livros = await response.json();
    }catch(error){
        console.log(error)
    }

}


async function loadnomeFilter() {
    const livros = await fetchLivros(); // Chama a função fetchLivros e obtém os livros
    const nomesUnicos = [...new Set(livros.map(livro => livro.nome))]; // Corrigido para 'gênero', com acento
    const nomeSelect = document.getElementById("filtro-nome");

    // Preenche o filtro de gêneros
    nomesUnicos.forEach(nome => {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        nomeSelect.appendChild(option);
    });
} 



async function loadLivros() {
    const livros = await fetchLivros();
    const tableDiv = document.getElementById("livros"); // Obtém o elemento pelo ID
    if (!tableDiv) {
        console.error("Elemento com ID 'livros' não encontrado.");
        return;
    }

    tableDiv.innerHTML = ""; // Limpa o conteúdo do elemento antes de adicionar novos dados

    livros.forEach(livro => {
        const row = document.createElement("div"); // Alterado para "div" se for um container
        row.innerHTML = `
            <h2>${livro.nome}</h2>
            <p><strong>Valor:</strong> ${livro.precounitario}</p> <!-- Aqui também é 'gênero' -->
            <p><strong>Quantidade:</strong> ${livro.quantidade}</p>
        `;
        tableDiv.appendChild(row); // Adiciona a nova linha ao container
    });
}


async function loadLivrosComFiltro() {
    const livros = await fetchLivros(); // Chama a função fetchLivros e obtém todos os livros
    const nomeSelecionado = document.getElementById("filtro-nome").value; // Obtém o valor selecionado do filtro

    const livrosFiltrados = nomeSelecionado
        ? livros.filter(livro => livro.nome === nomeSelecionado) // Filtra os livros pelo gênero selecionado
        : livros; // Se não houver filtro, retorna todos os livros

    const tableDiv = document.getElementById("livros"); // Obtém o elemento de livros
    tableDiv.innerHTML = ""; // Limpa o conteúdo de livros antes de adicionar os novos

    livrosFiltrados.forEach(livro => {
        const row = document.createElement("div"); // Cria um novo elemento para cada livro
        row.innerHTML = `
            <h2>${livro.nome}</h2>
            <p><strong>Valor:</strong> ${livro.precounitario}</p> <!-- Aqui também é 'gênero' -->
            <p><strong>Quantidade:</strong> ${livro.quantidade}</p>
        `;
        tableDiv.appendChild(row); // Adiciona o livro na página
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadnomeFilter(); // Chama a função para carregar o filtro de gênero
    loadLivros(); // Carrega todos os livros inicialmente
});
