FROM node:20.11.1-alpine

RUN apk update && apk add ca-certificates && update-ca-certificates

RUN mkdir /app
ADD ./transaction_service/ /app
ADD ./prisma /app/prisma
WORKDIR /app

RUN npm install
RUN npx prisma generate

CMD ["npm", "run", "dev"]