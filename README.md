# Desafio Full-stack Júnior — Sistema de Gestão de Tarefas Colaborativo

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Full-Stack Júnior na Jungle Gaming.

## 🏗 Arquitetura

<img width="1160" height="676" alt="diagram-export-26-10-2025-10_58_45" src="https://github.com/user-attachments/assets/415f35d5-4114-483d-95e6-982854a7940b" />

O sistema utiliza um front-end em React com Vite e um back-end baseado em microsserviços NestJS, comunicando-se através de filas via RabbitMQ.

### 🧭 Front-end

O front-end foi construído com:

- React Vite como base.
- TanStack Router, Query e Table para navegação, gerenciamento de dados e tabelas dinâmicas.
- Zod + React Hook Form para validação de formulários.
- Socket.io para comunicação em tempo real.

### 🛠️ Back-end

O back-end é composto por:

- API Gateway: centraliza todas as requisições e distribui para os microsserviços.
- Microsserviços NestJS: separados por domínio (Auth, Task, Notifications).
- Autenticação: com `access_token` e `refresh_token`, enviados via cookies com flags `httpOnly` e `secure`.

O uso de módulos e decorators do NestJS acelerou o desenvolvimento e manteve a arquitetura limpa e organizada.

### 🐳 Banco de Dados, Docker, Turborepo

- Monorepo com Turborepo, integrando front-end, API Gateway e microsserviços.
- PostgreSQL gerenciado pelo TypeORM.
- Docker para containerização completa do projeto.

Para simplificar, todos os microsserviços compartilham o mesmo banco, mas utilizam schemas diferentes. Cada microsserviço tem sua configuração no app.module.ts para apontar para o schema correto, e cada entidade define explicitamente a tabela e o schema.

As migrations são gerenciadas de forma centralizada, com arquivos database.config.ts. Cada microsserviço possui uma migration inicial manual para criar o schema, e as demais são geradas automaticamente.

## 💻 Decisões técnicas

Por se tratar de um ambiente onde todos os componentes da arquitetura estarão dentro do mesmo container, optei por trabalhar com apenas um banco de dados via schemas diferentes. Em cada microsserviço que faz consultas ao banco, temos uma configuração dentro do `app.module.ts` para acessar o schema correto e cada arquivo de entidade especifica o nome da tabela e qual schema ela deve usar.

Para gerar as migrações, temos arquivos `database.config.ts` que implementa as migrations mas que não sabem diretamente quais schemas devem criar. Cada microsserviço que se conecta ao banco tem uma migration inicial criada manualmente que cria o schema e as demais migrations automatizadas são executadas para criar o restante da estrutura do banco.

Na autenticação usei uma estratégia que acho interessante onde os tokens de autenticação são retornados via cookies de resposta e armezados com a flag `httpOnly` e `secure`, se protegendo de ataques XSS. Com isso, eliminamos a necessidade de enviar o token no cabeçalho de cada requisição, precisamos apenas do credentials definido como `true` no front e no back da aplicação.

## 🔨 Problemas conhecidos e melhorias

Eu já havia criado um projeto que utiliza NestJS, TypeORM e PostgreSQL. Isso me economizou um certo tempo para estabelecer a arquitetura do back-end que é composta por uma arquitetura limpa com a aplicação de casos de uso e injeção de dependências.

Como melhoria, criaria fluxos de CI/CD com testes unitários e builds automatizados e logs mais precisos para cada microsserviço. Outro ponto a ser trabalhado é a criação de um Dockerfile que se integre ao ambiente de desenvolvimento e ao de produção também.


## 🕒 Tempo gasto

O maior tempo gasto foi em configurações de ambiente como o monorepo com turborepo, migrations do TypeORM e Docker. O tempo investido em pesquisas foi grande mas valoroso.

Monorepo com Turborepo - 2 horas
- Docker - 1 dia
- RabbitMQ - 4 horas
- API Gateway - 2 dias
- Microserviço de Auth  - 2 dias
- Microserviço de Task - 3 dia
- Microserviço de Notifications - 1 dia
- Migrations - 1 dia
- Web - 2 dias

Estas são apenas algumas estimativas do tempo gasto.

## 📝 Instruções

Para rodar este projeto, clone o repositório e em seguida:

1. Rode o comando abaixo na raiz do projeto via `git bash` ou renomeie os arquivos manualmente de `.env.example` para `.env`.

```
# Git Bash
find . -type f -name ".env.example" -exec bash -c 'mv "$0" "${0%.example}"' {} \;
```
2. Execute os comandos:
```
docker compose build
docker compose up
````
3. Acesse o sistema no navegador:
```
http://localhost:3000
```
🎉 Com isso, o projeto estará rodando localmente.
