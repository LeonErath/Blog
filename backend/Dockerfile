FROM node:carbon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --ignore-engines

RUN npm install -g  nodemon

COPY . .


EXPOSE 3000
CMD [ "npm", "start" ]