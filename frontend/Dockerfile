FROM node:latest

COPY . .

RUN yarn install --ignore-engines

RUN yarn build

RUN yarn global add serve

EXPOSE 3000
# Set the command to start the node server.
CMD ["yarn", "serve", "--port", "3000", "--clipless", "-s","build"]



