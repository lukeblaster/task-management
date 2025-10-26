FROM node:20-slim AS development

WORKDIR /app

# Copia arquivos de configuração do monorepo
COPY package.json package-lock.json turbo.json ./

# Copia os pacotes
COPY packages/ ./packages/

# Copia a aplicação notifications-service
COPY apps/notifications-service/ ./apps/notifications-service/

# Instala dependências
RUN npm install

EXPOSE 3004

# Copia o script wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

WORKDIR /app/apps/notifications-service

# Comando padrão: espera o banco, roda migrations e inicia o dev server
CMD ["/bin/sh", "-c", "\
    /wait-for-it.sh db:5432 --timeout=30 -- echo 'DB ready!' && \
    /wait-for-it.sh rabbitmq:5672 --timeout=30 -- echo 'RabbitMQ ready!' && \
    npm run docker:start \
    "]