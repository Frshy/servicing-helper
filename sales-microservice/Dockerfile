FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn global add @nestjs/cli

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]