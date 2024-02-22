FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

RUN yarn global add ts-node

COPY . .

RUN yarn run build

RUN yarn global add ts-node

EXPOSE 3000

CMD ["yarn", "start"]
