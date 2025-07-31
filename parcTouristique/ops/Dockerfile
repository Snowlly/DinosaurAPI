FROM node:18

WORKDIR /app

# On revient d'un niveau pour accéder aux fichiers de l'app
COPY ../package*.json ./

RUN npm install

COPY ../ ./

EXPOSE 3000

CMD ["npm", "start"]
