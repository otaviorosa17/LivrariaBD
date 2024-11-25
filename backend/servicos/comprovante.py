from servicos.database.conector import DatabaseManager

class ComprovanteDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider

    def get_comprovante(self):
        # A query retorna os dados de uma compra, incluindo cpf e contato do cliente, nome do livro, quantidade, forma de pagamento e número da nota fiscal.
        # A busca pode ser filtrada pelo cpf do cliente.
        query = """
                SELECT P.forma_Pagamento, COUNT(*) AS quantidade_compras
                FROM CLIENTE C
                LEFT JOIN PAGO_POR P ON C.cpf = P.ClienteCPF
                LEFT JOIN COMPRA O ON P.nota_Fiscal = O.notaFiscal
                LEFT JOIN INCLUIDO_EM I ON O.notaFiscal = I.nota_Fiscal 
                LEFT JOIN PRODUTO D ON I.codigo_Produto = D.codigoProduto
                GROUP BY P.forma_Pagamento
                """
        
        return self.db.execute_select_all(query)