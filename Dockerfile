
FROM node:18-alpine as build

COPY . /app
COPY .env /app

WORKDIR /app

# run npm install but we wont run the build or serve with npm run
RUN npm install
RUN apk add yarn

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
