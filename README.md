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
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/GuilhermeSSilva/teste-nodejs.git

# Acesse a pasta do projeto no terminal/cmd
$ cd teste-nodejs

# Abra o projeto no seu editor de código

# Crie um arquivo .env baseado no .envexemple

# Caso queria rodar os teses crie um .env.test baseado no .envexemple.test

# Iniciar os containers com o Postgres e o Redis
$ make up

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn run dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>

# Execute as migrations para criar as tabelas no banco de dados
$ yarn sequelize db:migrate

```


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2ba815c93b6c5f3fd7d8)


  
  
  