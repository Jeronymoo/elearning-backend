<h1 align="center">
    <img alt="elearning" title="elearning" src=".github/GithubLogo.svg" />
</h1>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação-e-uso">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

<br>

## Tecnologias

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Axios](https://github.com/axios/axios)
- [Yup](https://github.com/jquense/yup)
- [Docker](https://www.docker.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [BCrypt](https://www.npmjs.com/package/bcrypt)

## Projeto

E.learning é uma plataforma que oferece cursos de diversas áreas de conhecimento, com um conteúdo em formato de videoaulas.

## Instalação e Uso

Clone o repositório e faça a instalação dos pacotes do projeto
```bash
$ git clone https://github.com/Jeronymoo/elearning-backend.git
$ cd elearning-backend
$ npm install

# Caso utilize o yarn
$ yarn
```
Faça a instalação do <a href="https://www.docker.com/">Docker</a> e crie imagens para o banco de dados PostgreSQL e Redis. Lembre-se de alterar os campos especificados no arquvivo disponibilizado ormconfig.json.example, renomeando para ormconfig.json

```bash
# Instalando a imagem do PostgreSQL
$ docker run --name elearning-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=elearning -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Instalando a imagem do Redis
$ docker run --name elearning-redis -p 6379:6379 -d -t redis:alpine

# Com todos os containers sendo executados faça a criação das tabelas
$ yarn typeorm migration:run

# Inicie a API
$ yarn dev:server
```

## Licença

Esse projeto está sob a licença MIT.
