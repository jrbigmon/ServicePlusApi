# ServicePlusApi

## Sobre
Esse projeto consiste em uma plataforma de prestação de serviços que liga o cliente ao profissional. 
Onde o cliente pode fazer uma solicitação de serviço ao profissional, passando uma data e descrição das atividades que gostaria que o prestador realizasse.
O projeto possue a busca por profissionais de todas ou uma única area, avaliação e localidade.
A plataforma vem com um grande objetivo de facilitar a comunição entre cliente e profissional, fazendo com que ambos tenham essa agilidade na visualização 
dos estágios de cada serviço.

## Como utilizar
- Faça o clone para sua máquina
```bash
https://github.com/jrbigmon/ServicePlusApi.git
```

- Instale todas as dependências
```bash
npm install
```
- Vá até o arquivo .env.example e insira as configurações de sua máquina
```js
// Usuario de sua máquina (root padrão)
DB_USER=
// Sua senha padrão para servidor do banco de dados
DB_PASSWORD=
// Nome do banco de dados
DB_NAME='service_plus_api'
// Caso esteja rodando localmente, insira seu localhost aqui (127.0.0.1 padrão)
DB_HOST=
// Dialecto usado para o sequilize se comunicar com o banco de dados
DB_DIALECT='mysql'
// insira uma senha própria para decodificação do Json Web Token
JWT_KEY=
// Crie uma senha para o primeiro adm do projeto
FIRST_ADM_PASS=
```

- Inicie o servidor do Banco de Dados ```XAMPP``` (recomendado) 

- Crie o banco de dados com ```Sequelize```
```bash
npx sequelize db:create
```

- Crie as tabelas do banco de dados com ```Sequelize```
```bash
npx sequelize db:migrate
```

- Faça a inserção de valores padrão em seu banco de dados com ```Sequelize```
```bash
npx sequelize db:seed:all
```

- Após fazer todas as instalações e criação do banco de dados, faça:
```bash
npm start
```
## Documentação da API via Postman
https://documenter.getpostman.com/view/19952173/2s83f5naC8

