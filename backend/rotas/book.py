from flask import Blueprint, jsonify, request

from servicos.book import BookDatabase


book_blueprint = Blueprint("book", __name__)

@book_blueprint.route("/book", methods=["GET"])
def get_book():
    nome = request.args.get("nome", "")
    return jsonify(BookDatabase().get_book(nome)), 200