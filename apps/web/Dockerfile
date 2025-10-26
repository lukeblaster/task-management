FROM node:20-slim AS development

WORKDIR /app

# Copia arquivos de configuração do monorepo
COPY package.json package-lock.json turbo.json ./

# Copia os pacotes
COPY packages/ ./packages/

# Copia a aplicação web
COPY apps/web/ ./apps/web/

# Instala dependências
RUN npm install

EXPOSE 3000

# O comando será sobrescrito pelo docker-compose
CMD ["npm", "run", "dev", "-- --host 0.0.0.0", "--workspace=apps/web"]