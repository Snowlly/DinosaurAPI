FROM node:18

WORKDIR /app

COPY parcSauvage/package*.json ./
RUN npm install

COPY parcSauvage ./

EXPOSE 3001

CMD ["npm", "start"]
