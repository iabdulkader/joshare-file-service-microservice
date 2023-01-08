FROM node:latest

WORKDIR /src/app

COPY package*.json ./

RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/server.js"]