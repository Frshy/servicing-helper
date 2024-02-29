FROM node:18-alpine as dev

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn global add @nestjs/cli

COPY . .

RUN yarn install

RUN yarn prisma generate

EXPOSE 3001

CMD [ "yarn", "start:dev" ]

FROM dev as prod

RUN yarn run build

CMD [ "node", "dist/main.js" ]