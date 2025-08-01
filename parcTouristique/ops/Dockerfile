
FROM node:18

WORKDIR /app

COPY parcTouristique/package*.json ./
RUN npm install

COPY parcTouristique ./

EXPOSE 3002

CMD ["node", "app.js"]
