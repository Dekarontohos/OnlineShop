FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p uploads

EXPOSE 3001

CMD ["node", "app.js"]