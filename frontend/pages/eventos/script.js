async function fetchEventos() {
    try {
        const response = await fetch("http://127.0.0.1:5000/evento");
        const eventos = await response.json();
        console.log(eventos); // Exibe os eventos no console
        return eventos; // Retorna os dados para uso posterior
    } catch (error) {
        console.log("Erro na requisição:", error);
        return []; // Retorna um array vazio em caso de erro
    }
}

async function fetchEventosComFiltro() {
    try {
        const url = new URL("http://127.0.0.1:5000/evento");
        const params = new URLSearchParams();
        const evento = document.getElementById("filtro-evento").value; // Filtro de evento

        if (evento) params.append("evento", evento); // Adiciona o filtro se houver
        url.search = params.toString();

        const response = await fetch(url);
        const eventos = await response.json();
        console.log(eventos); // Exibe os eventos filtrados no console
        return eventos;
    } catch (error) {
        console.log("Erro ao buscar eventos com filtro:", error);
        return [];
    }
}


async function loadEventoFilter() {
    const eventos = await fetchEventos(); // Busca os eventos
    const categoriasUnicas = [...new Set(eventos.map(evento => evento.local))]; // Categorias únicas
    const eventoSelect = document.getElementById("filtro-evento");

    // Preenche o filtro de categorias de evento
    categoriasUnicas.forEach(local => {
        const option = document.createElement("option");
        option.value = local;
        option.textContent = local;
        eventoSelect.appendChild(option);
    });
}

async function loadEventos() {
    const eventos = await fetchEventos(); // Busca os eventos
    const tableDiv = document.getElementById("eventos"); // Obtém o elemento pelo ID
    if (!tableDiv) {
        console.error("Elemento com ID 'eventos' não encontrado.");
        return;
    }

    tableDiv.innerHTML = ""; // Limpa o conteúdo antes de adicionar novos dados

    eventos.forEach(evento => {
        const row = document.createElement("div");
        row.innerHTML = `
            <h2>${evento.categoria}</h2>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p><strong>Data:</strong> ${new Date(evento.data_evento).toLocaleDateString()}</p>
            <p><strong>Nome do Palestrante:</strong> ${evento.nome}</p>
            <p><strong>id do evento:</strong> ${evento.idevento}</p>
        `;
        tableDiv.appendChild(row); // Adiciona a nova linha ao container
    });
}

async function loadEventosComFiltro() {
    const eventos = await fetchEventos(); // Chama a função fetchEventos e obtém todos os eventos
    const eventoSelecionado = document.getElementById("filtro-evento").value; // Obtém o valor selecionado do filtro

    const eventosFiltrados = eventoSelecionado
        ? eventos.filter(evento => evento.local === eventoSelecionado) // Filtra os eventos pelo evento selecionado
        : eventos; // Se não houver filtro, retorna todos os eventos

    const tableDiv = document.getElementById("eventos"); // Obtém o elemento de eventos
    tableDiv.innerHTML = ""; // Limpa o conteúdo de eventos antes de adicionar os novos

    eventosFiltrados.forEach(evento => {
        const row = document.createElement("div"); // Cria um novo elemento para cada evento
        row.innerHTML = `
            <h2>${evento.categoria}</h2>
            <p><strong>Local:</strong> ${evento.local}</p>
            <p><strong>Data:</strong> ${new Date(evento.data_evento).toLocaleDateString()}</p>
            <p><strong>Nome do Palestrante:</strong> ${evento.nome}</p>
            <p><strong>ID do Evento:</strong> ${evento.idevento}</p>
        `;
        tableDiv.appendChild(row); // Adiciona o evento ao container
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadEventoFilter(); // Carrega o filtro de categorias
    loadEventos(); // Carrega todos os eventos inicialmente
});
