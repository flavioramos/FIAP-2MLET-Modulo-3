FIAP - Machine Learning Engineering - Tech Challenge Módulo 3

Sistema com implementação de treinamento supervisionado, consumindo dataset Mushroom do UCI Machine Learning Repository.

Estrutura:

- API: Servidor em Flask (Python) para realizar download do dataset, treinar o modelo e fornecer a funcionaidade de predição através de API.
  - Depois de instaladas as dependências (pip3 -r requirements.txt), execute os comandos: 
    - flask init-db
    - flask train (para baixar o dataset, opcional caso queira rodar o notebook antes de inicializar o servidor da API)
    - flask run
      
- Frontend: Servidor HTTP simples para fornecer o frontend para as APIs.
  - Utilizado o http.server do Python3, basta executar o script run.sh para inicializar.

- Notebook: Explicação sobre o modelo e a abordagem do treinamento.

- Postman: Arquivo com a documentação da API.


Dependências:

- Python 3
- Flask
- Scikit-Learn
