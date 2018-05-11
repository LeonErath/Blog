FROM node:9
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g npm@5.6.0
COPY package*.json ./

RUN npm cache verify
RUN npm install

COPY . .


EXPOSE 3000
CMD [ "npm", "start" ]



