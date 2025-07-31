# DinosaurAPI

---

### 🐳 Dockerisation des services

Chaque microservice (`parc-sauvage` et `parc-touristique`) est conteneurisé via Docker. L'architecture suit cette structure :

```
DinosaurAPI/
├── docker-compose.yml
├── parcSauvage/
│   ├── app.js
│   ├── package.json
│   └── ops/
│       └── Dockerfile
├── parcTouristique/
│   ├── app.js
│   ├── package.json
│   └── ops/
│       └── Dockerfile
```

#### 🛠️ Contenu type d’un `Dockerfile`

Dans `parcSauvage/ops/Dockerfile` ou `parcTouristique/ops/Dockerfile` :

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

> ⚠️ Chaque `Dockerfile` est dans le dossier `ops/` propre à son microservice.

---

### 🚀 Lancement avec Docker Compose

À la racine du projet, le fichier `docker-compose.yml` orchestre les deux services :

```yaml
services:
  parc-sauvage:
    build:
      context: ./parcSauvage
      dockerfile: ops/Dockerfile
    ports:
      - "3001:3000"

  parc-touristique:
    build:
      context: ./parcTouristique
      dockerfile: ops/Dockerfile
    ports:
      - "3002:3000"
```

#### 🔧 Commandes utiles

* Lancer les services :

  ```bash
  docker-compose up --build
  ```

* Arrêter les conteneurs :

  ```bash
  docker-compose down
  ```

---
