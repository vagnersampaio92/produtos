<h1 align="center">Teste nodejs LuizaLabs/Magalu</h1>

<p align="center">Sistema de produtos favoritos</p>

### Features

- [x] Cadastro de usuário
- [x] Login e sessão
- [x] Criptografa a senha
- [x] Lista usuários
- [x] Lista usuário pelo id
- [x] Editar usuários
- [x] Deletar usuários
- [x] Lista de produtos
- [x] Cache de dados, para deixar o acesso recorrente mais rápido
- [x] Adiciona um produto a lista de favoritos
- [x] Lista todos os produtos favoritos
- [x] Deletar um produto da lista de favoritos

### Features futuras
- [ ] Logout de usuário
- [ ] Expiração e refresh token
- [ ] Pré-load em cache da página seguinte, para deixar a nevegação do usuário mais rápida (Utilizar a lib como o [BULL](https://www.npmjs.com/package/bull) para criar Background jobs)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e (opcional)[Yarn](https://yarnpkg.com/).
Para facilitar o uso é recomendado ter o [Docker](https://www.docker.com/), caso não queira utilizar o docker, é necessário ter o [Postgres](https://www.postgresql.org/) e o [Redis](https://redis.io/) instalado e rodando localmente.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/vagnersampaio92/produtos.git

# Acesse a pasta do projeto no terminal/cmd
$ cd produtos

# Abra o projeto no seu editor de código

# Crie um arquivo .env baseado no .envexemple

# Caso queria rodar os teses crie um .env.test baseado no .envexemple.test

# Iniciar os containers com o Postgres e o Redis
$ make up

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>

# Execute as migrations para criar as tabelas no banco de dados
$ yarn sequelize db:migrate

```

### Documentação

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2ba815c93b6c5f3fd7d8)


  Após rodar o projeto é possível utilizar a documentação feita no Swagger acessando a rota: http://localhost:3000/doc/ no seu navegador.
  
### Teste automatizados

```bash
# Execute os testes
$ yarn test
```
![Screenshot](https://imagensvagner.s3.sa-east-1.amazonaws.com/Captura+de+Tela+2021-09-13+a%CC%80s+16.23.15.png)


### Comandos do Makefile

```bash
#cria e inicia o container com os bancos de dados
$ make up
#apaga os containers
$ make down
#pausa a execução dos containers
$ make stop
#inicia os containers
$ make start
#mostra os logs
$ make logs

```