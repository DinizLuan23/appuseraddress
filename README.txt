Detalhes de execução:

1 - Tenha um banco Postgresql em seu computador e importe o arquivo "banco_app".

2 - Abra a pasta "backend" em seu editor de código e execute o comando "yarn" ou "npm install" em seu terminal ( estando na pasta backend ) para instalar as dependencias do projeto. 

2.1 - Abra o arquivo .env na raiz do projeto e altere as variaveis com a configuração de conexão do seu postgresql.

2.2 - Após essa execução, executar o comando "yarn dev" ou "npm run dev" para startar o backend da aplicacão.

3 - Abra a pasta "mobile" e execute o passo 2.

3.1 - Vá na pasta "services/api.ts" e altere no campo baseUrl, o ip da maquina onde estará rodando o backend.

3.2 execute o comando "yarn start" ou "expo start" ou "npm start" para iniciar a aplicação.

3.3 após o passo anterior, escaneie o QRcode com o aplicativo "Expo" em seu celular.