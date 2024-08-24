
FROM node:18-alpine as bitdevs-pdx

COPY . /app
COPY .env /app

WORKDIR /app

## npm not necessary here
#RUN npm install

RUN apk add yarn
RUN yarn add next react react-dom contentlayer

RUN yarn install

# not sure if summarize should come after build
RUN yarn build
RUN yarn summarize

# expose command doesn't really do anything, just to mark intentions here
EXPOSE 3000

CMD ["yarn", "start"]
