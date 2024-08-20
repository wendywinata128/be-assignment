FROM node:20.11.1-alpine

RUN mkdir /app
COPY ./migration ./app
COPY ./prisma/. ./app/prisma
WORKDIR /app
RUN npm install prisma --save-dev

CMD ["npx", "prisma", "migrate", "deploy"]