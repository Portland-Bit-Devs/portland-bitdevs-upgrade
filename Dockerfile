
FROM node:18-alpine as bitdevs-pdx

COPY . /app
COPY .env /app

WORKDIR /app

RUN npm install -g next contentlayer next-contentlayer date-fns
RUN npm install
RUN apk add yarn
RUN yarn add next react react-dom contentlayer

RUN yarn install
RUN yarn build
RUN yarn summarize

# expose command doesn't really do anything, just to mark intentions here
EXPOSE 80

CMD ["yarn", "start"]
