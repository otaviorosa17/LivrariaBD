from servicos.database.conector import DatabaseManager

class LivroDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider

    def get_livros(self, IDAutor: str=""):
        # Esta query retorna os dados do autor, juntamente com os dados de seu livro correspondente.
        # A busca pode ser também filtrada, individualmente, pelo id do Autor.
        query = """
                SELECT nome, IDAutor, pais_origem, LISBN, genero, numero_pagina, edicao, ano FROM LIVRO L
                LEFT JOIN ESCREVE E ON L.LISBN = E.ISBN
                LEFT JOIN AUTOR A ON E.ID_Autor = IDAutor
                """
        if IDAutor:
            query+= f"WHERE A.IDAutor = '{IDAutor}'"
        
        return self.db.execute_select_all(query)