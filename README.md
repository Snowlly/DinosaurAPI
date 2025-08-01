# DinosaurAPI


Ce projet est une API REST développée en Node.js + Express avec une base MongoDB, permettant la gestion d’un parc de dinosaures (modèles : Dinosaur, Keeper, Incident).

**Membre de l'équipe :** 

* CLAIR Manon
* DORBANI Abdelmalek
* MARTIN Evan

Sur le Campus de **LYON**.

Lien utiles : 

* Tâches effectuées et structurées dans un tableau de Kanban : https://github.com/users/Snowlly/projects/6
* Lien de la production : ...
* Lien du Staging : ...

---

## Parc Sauvage

### Parc API – Models & Routes Documentation

#### Models

##### Dinosaur

**name**	String  Nom du dinosaure

**specie**	String  Espèce

**weight**	Number  Poids en kg

**height**	Number	Taille en mètres

**dangerLevel**	Number  Niveau de danger (1 à 10)

**diet**	String	carnivore, herbivore, omnivore


##### Keeper

**name**	String	"Nom du soigneur"

**age**	Number	Âge

**dateStart**	Date	"Date de début d’activité"`

**available**	Boolean	Disponible ou non

**sector**	String	"Zone assignée dans le parc"


##### Incident

**title**	String	Titre de l’incident

**severity**	String (enum)	"low, medium, high, critical"

**isDone**	String (enum) (default)	yes ou no

**description**	String	"Description de l’incident"

**assignedKeepers**	Array of ObjectId	"Références vers les Keeper affectés"

**dateCreation**	Date (default)	Date de création de l’incident

---

#### Routes API

Toutes les routes sont disponibles sous le préfixe /api.

**/api/dinosaurs**

GET	/api/dinosaurs	Liste tous les dinos

GET	/api/dinosaurs/:id	Détail d’un dinosaure

POST	/api/dinosaurs	Crée un nouveau dinosaure

PUT	/api/dinosaurs/:id	Modifie un dinosaure

DELETE	/api/dinosaurs/:id	Supprime un dinosaure


**/api/keepers**

GET	/api/keepers	Liste tous les keepers

GET	/api/keepers/:id	Détail d’un keepers

POST	/api/keepers	Crée un nouveau keepers

PUT	/api/keepers/:id	Modifie un keepers

DELETE	/api/keepers/:id	Supprime un keepers


**/api/incidents**

GET	/api/incidents	Liste tous les incidents

GET	/api/incidents/:id	Détail d’un incident

POST	/api/incidents	Crée un nouvel incident

PUT	/api/incidents/:id	Modifie un incident

DELETE	/api/incidents/:id	Supprime un incident

Les routes GET et PUT d’incidents utilisent .populate('assignedKeepers') pour inclure les informations des soigneurs assignés.
Exemple fonctioinnel d'un JSON pour POST /api/dinosaurs

{
  "name": "Tyrannosaurus Rex",
  "specie": "Tyrannosauridae",
  "weight": 8000,
  "height": 4.0,
  "dangerLevel": 10,
  "diet": "carnivore"
}

---

### Dockerisation des services

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

### Contenu type d’un `Dockerfile`

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

Attention car chaque `Dockerfile` est dans le dossier `ops/` propre à son microservice.

---

### Lancement avec Docker Compose

À la racine du projet, le fichier `docker-compose.yml` orchestre les deux services :

```yaml
version: '3.8'

services:
  mongo:
    image: mongo
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db

  parc-sauvage:
    build:
      context: ./parcSauvage
      dockerfile: ./ops/Dockerfile
    ports:
      - "3001:3000"
    volumes:
      - ./parcSauvage:/app
    working_dir: /app
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/parcSauvage

  parc-touristique:
    build:
      context: ./parcTouristique
      dockerfile: ./ops/Dockerfile
    ports:
      - "3002:3000"
    volumes:
      - ./parcTouristique:/app
    working_dir: /app
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://mongo:27017/parcTouristique

volumes:
  mongodb-data:

```

--

#### Les commandes utiles

----
* Installer les node_modules dans chaques parcs :
Vérifier que vous êtes bien sur le dossier "parcSauvage" ou "parcTouristique"

```bash
cd DinosaurAPI/parcSauvage
npm install
```
  
Faire pareil pour DinosaurAPI/parcTouristique

----
* Lancer les services :

Il faut se positionner à la racine de l'application, puis faire :

```bash
docker-compose up --build
```
----
* Lancer le projet :

Il faut se positionner sur un des parcs : DinosaurAPI/parcSauvage, puis faire :

```bash
npm start
```
Et faire de même pour le parcTouristique.

----
* Lancer les tests :

Même principe que précédemment, il faut se positionner sur un des parcs, puis faire :

```bash
npm run parcSauvage
npm run parcTouristique
```
Et faire de même pour l'autre Parc.

----

* Arrêter les conteneurs :

Se mettre à la racine de l'application, puis faire :

  ```bash
  docker-compose down
  ```

---


