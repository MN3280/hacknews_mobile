FROM node:latest

WORKDIR /server-user

COPY ["package.json", "package-lock.json*", "/server-user/"]

RUN npm install && npm cache clean --force

COPY . .

CMD ["npx", "nodemon", "app.js"]