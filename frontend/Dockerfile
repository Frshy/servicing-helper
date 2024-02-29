FROM node:18-alpine as dev

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4000

CMD ["yarn", "dev"]