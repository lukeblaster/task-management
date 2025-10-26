# Desafio Full-stack Júnior — Sistema de Gestão de Tarefas Colaborativo

Este é um projeto criado para o processo seletivo da vaga Full-stack Júnior na Jungle Gaming.

## Arquitetura

<img width="1160" height="676" alt="diagram-export-26-10-2025-10_58_45" src="https://github.com/user-attachments/assets/415f35d5-4114-483d-95e6-982854a7940b" />


Para este projeto, utilizei um front-end construído em React com Vite e um back-end composto por microsserviços NestJS se conectando através de filas (RabbitMQ).

### Front-end

Para o front, temos um roteamento feito pelo TanStack Router, o que ajuda quando temos muitas rotas já que elas são tipadas e não vão te deixar um parâmetro importante. Junto a isso, temos uma interface moderna e responsiva construída com TailwindCSS e componentes do shadcn/ui para compor um design atraente e funcional. E para comunicação em tempo real, WebSocket.

### Back-end

No back-end, temos alguns microsserviços criados com o NestJS. O processo do Nest em relação a micro-serviços e a outros componentes do back-end é bem orgânico pois temos várias ferramentas, como módulos e decorators, que auxiliam a configurar muitos pontos de uma aplicação back-end.

Para unir front-end ao back-end, configurei um API Gateway que trata de todas as requisições antes de envia e retornar os resultados dos microsserviços. Para autentição e segurança, implementei estratégias e guards que trabalham com `access_token` e `refresh_token`.

## Decisões técnicas

Por se tratar de um ambiente onde todos os componentes da arquitetura estarão dentro do mesmo container, optei por trabalhar com apenas um banco de dados via schemas diferentes. Em cada microsserviço que faz consultas ao banco, temos uma configuração dentro do `app.module.ts` para acessar o schema correto e cada arquivo de entidade especifica o nome da tabela e qual schema ela deve usar.

Para gerar as migrações, temos arquivos `database.config.ts` que implementas as migrations mas que não sabem diretamente quais schemas devem criar. Cada microsserviço deste tem uma migration inicial que cria o schema e as demais migrations são executadas para criar o restante da estrutura do banco.

Na autenticação usei uma estratégia que acho interessante onde os tokens de autenticação são retornados via cookies de resposta e armezados com a flag `httpOnly` e `secure`, se protegendo de ataques XSS. Com isso, eliminamos a necessidade de enviar o token no cabeçalho de cada requisição, precisamos apenas do credentials definido como `true` no front e no back da aplicação.

## Problemas conhecidos e melhorias

Eu já havia criado um projeto que utiliza NestJS, TypeORM e PostgreSQL. Isso me economizou um certo tempo para estabelecer a arquitetura do back-end que é composta por uma arquitetura limpa com a aplicação de casos de uso e injeção de dependências.

Como melhoria, criaria fluxos de CI/CD com testes unitários e builds automatizados e logs mais precisos para cada microsserviço. Outro ponto a ser trabalhado é a criação de um Dockerfile que se integre ao ambiente de desenvolvimento e ao de produção também.


## Tempo gasto

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

## Instruções

Para rodar este projeto, clone o repositório e em seguida:

1. Mude o nome do arquivo `.env.example` da raiz do projeto para `.env.production`.

2. Rode o comando abaixo na raiz do projeto.

```
find . -type f -name ".env.example" -exec bash -c 'mv "$0" "${0%.example}"' {} \;
```

Após isso, você deve ter um arquivo `.env.production` na raiz do projeto e arquivos `.env` dentro de cada pasta de `/apps/`.

Com isso feito, você pode rodar:
```
docker compose build
````
e então:
```
docker compose up
```
