from servicos.database.conector import DatabaseManager

class EventoDatabase():
    def __init__(self, db_provider = DatabaseManager()) -> None:
        self.db = db_provider

    def get_evento(self, IDEvento: str=""):
        # Esta query retorna os dados do evento realizado tais quais: local, data, categoria. Além disso ambos id's (evento e autor), e autor responsável são retornados.
        # A busca pode ser filtrada pelo id do evento.
        query = """
                SELECT A.IDAutor, A.nome, E.IDEvento, E.categoria, E.local, E.data_evento FROM EVENTO E
                LEFT JOIN REALIZA R ON R.ID_Evento = E.IDEvento
                LEFT JOIN AUTOR A ON R.ID_Autor = A.IDAutor
                """
        if IDEvento:
            query+= f"WHERE E.IDEvento = '{IDEvento}'"
        
        return self.db.execute_select_all(query)