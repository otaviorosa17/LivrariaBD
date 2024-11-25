from flask import Blueprint, jsonify, request

from servicos.evento import EventoDatabase


evento_blueprint = Blueprint("evento", __name__)

@evento_blueprint.route("/evento", methods=["GET"])
def get_evento():
    IDEvento = request.args.get("IDEvento", "")
    return jsonify(EventoDatabase().get_evento(IDEvento)), 200