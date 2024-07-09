<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



## Paylod
{  
  "valor": 10000,
  "tipo": "Emprestimo pessoal",
  "proponenteDTO":{
  "nome": "TESTE",
  "dataNascimento": "2024-06-07T20:38:38.531Z",
  "cpf": "12345678912",
  "rg": "00000",
  "sexo": "M",
  "renda": 10000,
  "nomePai": "TESTE",
  "nomeMae": "TESTE",
  "enderecosDTO": [
    {
      "logradouro": "TESTE",
      "numero": 18,
      "complemento": "casa B",
      "bairro": "TESTE",
      "cep": "00000",
      "cidade": "TESTE",
      "estado": "TESTE",
      "tipo": "Residencial"
    }
  ],
  "telefonesDTO": [
    {
      "ddd": "11",
      "numero": "99999999",
      "tipo": "Celular"
    }
  ]
 }
}

## create tables

    CREATE TABLE PROPONENTE(
    id NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    NOME VARCHAR2 (200) NOT NULL,
    DATA_NASCIMENTO DATE NOT NULL,
    CPF VARCHAR2 (11) NOT NULL,
    RG VARCHAR2 (15) NOT NULL,
    SEXO VARCHAR2 (2) NOT NULL,
    RENDA NUMBER (20,2) NOT NULL,
    NOME_PAI VARCHAR2 (100) NOT NULL,
    NOME_MAE VARCHAR2 (100) NOT NULL,
    PRIMARY KEY (id)
    );

 CREATE TABLE PROPOSTA (
    id NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    STATUS VARCHAR2(20) NOT NULL,
    TIPO VARCHAR2(20) NOT NULL,
    PROPONENTE_ID NUMBER NOT NULL,
    VALOR NUMBER (20,2) NOT NULL,
    DATA_CRIACAO DATE NOT NULL,
    DATA_ALTERACAO DATE ,
    USUARIO_CRIACAO VARCHAR2(50) NOT NULL,
    USUARIO_ALTERACAO VARCHAR2(50),
    PRIMARY KEY (id),
    FOREIGN KEY(PROPONENTE_ID) REFERENCES PROPONENTE(id)
);

CREATE TABLE TELEFONE (
    id NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    DDD VARCHAR2(2) NOT NULL,
    NUMERO VARCHAR2 (9) NOT NULL,
    TIPO VARCHAR2(100) NULL,
    PROPONENTE_ID NUMBER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(PROPONENTE_ID) REFERENCES PROPONENTE(id)
);

CREATE TABLE ENDERECO (
    id NUMBER(10) GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    LOGRADOURO VARCHAR2(100) NOT NULL,
    NUMERO NUMBER (10) NOT NULL,
    COMPLEMENTO VARCHAR2(100) NULL,
    BAIRRO VARCHAR2(50) NOT NULL,
    CEP VARCHAR2(8),
    CIDADE VARCHAR2(50) NOT NULL,
    ESTADO VARCHAR2(50) NOT NULL,
    TIPO VARCHAR2(30) NOT NULL,
    PROPONENTE_ID NUMBER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(PROPONENTE_ID) REFERENCES PROPONENTE(id)
);
