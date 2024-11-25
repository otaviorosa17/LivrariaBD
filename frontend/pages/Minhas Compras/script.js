async function fetchComprovante() {
    try {
        const response = await fetch("http://127.0.0.1:5000/comprovante");
        const compras = await response.json();
        console.log(compras); // Exibe os dados no console
        return compras; // Retorna os dados para uso posterior
    } catch (error) {
        console.error("Erro na requisição:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

async function loadComprovanteFilter() {
    const comprovantes = await fetchComprovante();
    const formasPagamentoUnicas = [...new Set(comprovantes.map(c => c.forma_pagamento))];
    const filtroSelect = document.getElementById("filtro-comprovante");

    // Limpa o filtro antes de preenchê-lo
    filtroSelect.innerHTML = `<option value="">Selecione a forma de pagamento</option>`;

    // Preenche o filtro com as formas de pagamento disponíveis
    formasPagamentoUnicas.forEach(forma => {
        const option = document.createElement("option");
        option.value = forma;
        option.textContent = forma;
        filtroSelect.appendChild(option);
    });
}

async function loadCompras() {
    const comprovantes = await fetchComprovante();
    const formaSelecionada = document.getElementById("filtro-comprovante").value;

    const comprasFiltradas = formaSelecionada
        ? comprovantes.filter(c => c.forma_pagamento === formaSelecionada)
        : comprovantes;

    const comprasContainer = document.getElementById("compras");
    comprasContainer.innerHTML = ""; // Limpa o conteúdo antes de adicionar os novos dados

    comprasFiltradas.forEach(comprovante => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h2>${comprovante.forma_pagamento}</h2>
            <p><strong>Quantidade de Compras:</strong> ${comprovante.quantidade_compras}</p>
        `;
        comprasContainer.appendChild(div);
    });
}

// Inicializa os eventos ao carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
    loadCompras();
    loadComprovanteFilter(); // Carrega o filtro de formas de pagamento
});
