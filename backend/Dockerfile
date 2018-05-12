FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn build

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]