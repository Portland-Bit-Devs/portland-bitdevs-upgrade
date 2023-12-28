
FROM node:18-alpine as build

COPY . /app
COPY .env /app

WORKDIR /app

RUN apk add yarn
RUN npm install -g contentlayer
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
