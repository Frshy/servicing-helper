FROM node:18-alpine as dev

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn global add nodemon

RUN yarn install

COPY . .

RUN yarn prisma generate

EXPOSE 3001

CMD [ "yarn", "nodemon", "src/index.js" ]

FROM dev as prod

CMD [ "node", "src/index.js" ]