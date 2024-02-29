FROM node:18-alpine as dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

FROM dev as prod

RUN yarn run build

CMD [ "node", "dist/main.js" ]