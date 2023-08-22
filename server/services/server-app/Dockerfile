FROM node:latest

WORKDIR /server-app

COPY ["package.json", "package-lock.json*", "/server-app/"]

RUN npm install && npm cache clean --force

COPY . .

CMD ["npx", "nodemon", "app.js"]