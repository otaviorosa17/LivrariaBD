from servicos.database.conector import DatabaseManager

class BookDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider

    def get_book(self, nome: str=""):
        # Esta query retorna o nome do livro, seu código e preço, juntamente com seu fornecedor e a quantidade fornecida.
        # A busca pode ser filtrada também, individualmente, pelo nome do livro.
        query = """
                SELECT F.cnpj, P.nome, P.codigoProduto, E.precoUnitario, E.quantidade FROM FORNECEDOR F
                LEFT JOIN FORNECE E ON F.cnpj = E.FornecedorCNPJ
                LEFT JOIN PRODUTO P ON E.codigo_Produto = P.codigoProduto 
                """
        if nome:
            query+= f"WHERE P.nome = '{nome}'"
        
        return self.db.execute_select_all(query)