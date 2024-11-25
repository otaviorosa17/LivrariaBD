from flask import Blueprint, jsonify, request
from servicos.livros import LivroDatabase  # Gerenciador específico para operações no banco de dados

livros_blueprint = Blueprint("livro", __name__)
livro_db = LivroDatabase()  # Instância da classe gerenciadora de livros

# Rota para buscar livros, opcionalmente filtrando por ID do autor
@livros_blueprint.route("/livros", methods=["GET"])
def get_livros():
    IDAutor = request.args.get("IDAutor", "")
    try:
        livros = livro_db.get_livros(IDAutor)  # Método específico no serviço
        return jsonify(livros), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para adicionar um novo livro
@livros_blueprint.route("/livros", methods=["POST"])
def add_livro():
    data = request.json  # Dados enviados pelo cliente (JSON)
    titulo = data.get("titulo")
    autor = data.get("autor")

    if not titulo or not autor:
        return jsonify({"error": "Os campos 'titulo' e 'autor' são obrigatórios"}), 400

    try:
        livro_db.add_livro(titulo, autor)  # Método específico para adicionar livro no serviço
        return jsonify({"message": "Livro adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500