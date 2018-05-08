FROM node:9
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn global add npm

RUN npm --version
COPY package*.json ./

RUN npm cache verify
RUN npm install

COPY . .


EXPOSE 3000
CMD [ "npm", "start" ]



