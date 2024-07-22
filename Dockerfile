FROM node:20.15-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE ${API_PORT}


ENTRYPOINT [ "sh", "-c", "node ace migration:run && node ace db:seed" ] 


