const express = require("express");
const { Client } = require("pg");
const cors = require("cors"); // Certifique-se de importar o cors aqui


const app = express();
const port = 5501; // Ou qualquer outra porta não utilizada

app.use(cors()); // Permite requisições de qualquer origem (como localhost:5500)
// Configuração do banco de dados PostgreSQL
const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "livraria_bd",
    password: "isabela",
    port: 5432
});

client.connect();

// Rota para obter os livros
app.get("/livros", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM LIVRO");
        res.json(result.rows); // Retorna os dados em formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao acessar o banco de dados.");
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
