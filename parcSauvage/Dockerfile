FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ops .

EXPOSE 3001

CMD ["npm", "start"]
