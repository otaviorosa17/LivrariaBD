from flask import Flask, jsonify
from flask_cors import CORS  
from rotas.livros import livros_blueprint
from rotas.book import book_blueprint
from rotas.evento import evento_blueprint
from rotas.comprovante import comprovante_blueprint

app = Flask(__name__)

CORS(app, origins="*")

@app.route("/", methods=["GET"])
def get_autor():
    return jsonify("It's alive"), 200

app.register_blueprint(livros_blueprint)
app.register_blueprint(book_blueprint)
app.register_blueprint(evento_blueprint)
app.register_blueprint(comprovante_blueprint)
app.run("0.0.0.0", port=5000, debug=False)
