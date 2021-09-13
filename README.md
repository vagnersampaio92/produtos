<h1 align="center">Teste nodejs LuizaLabs/Magalu</h1>

<p align="center">Sistema de produtos favoritos</p>

### Features

- [x] Cadastro de usuário
- [x] Login e sessão
- [x] lista usuários
- [x] editar usuários
- [x] deletar usuários
- [x] deletar usuários


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
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
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>

# Execute as migrations para criar as tabelas no banco de dados
$ yarn sequelize db:migrate

```

### Documentação

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2ba815c93b6c5f3fd7d8)


  Após rodar o projeto é possível utilizar a documentação feita no Swagger acessando a rota: http://localhost:3000/doc/ no seu navegador.
  
  