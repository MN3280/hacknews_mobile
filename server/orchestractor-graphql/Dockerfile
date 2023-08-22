FROM node:latest

WORKDIR /orchestractor_graphql

COPY ["package.json", "package-lock.json*", "/orchestractor_graphql/"]

RUN npm install && npm cache clean --force

COPY . .

CMD ["npx", "nodemon", "app.js"]