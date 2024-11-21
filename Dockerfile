FROM node:18-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código-fonte para dentro do container
COPY . .

# Compila o projeto NestJS
RUN npm run build

# Expõe a porta 3000
EXPOSE 3006

# Comando para iniciar o serviço
CMD ["node", "dist/main"]
