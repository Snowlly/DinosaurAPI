const mongoose = require('mongoose');
const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');

const dinosaurRoutes = require('../../src/routes/dinosaur');
const Dinosaur = require('../../src/models/dinosaur');
const errorHandler = require('../../src/middleware/errorHandler');

let app;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app = express();
    app.use(express.json());
    app.use('/api/dinosaurs', dinosaurRoutes);
    app.use(errorHandler);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});

afterEach(async () => {
    await Dinosaur.deleteMany({});
});

describe('Dinosaur API Integration Tests', () => {
    it('GET /api/dinosaurs - should return all dinosaurs', async () => {
        await Dinosaur.create({
            name: 'T-Rex',
            specie: 'Tyrannosaurus Rex',
            weight: '8000kg',
            height: '12m',
            dangerLevel: 10,
            diet: 'carnivore',
            dateBorn: new Date(),
            enclosureId: 'E1',
        });

        const res = await request(app).get('/api/dinosaurs');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe('T-Rex');
    });

    it('POST /api/dinosaurs - should create a new dinosaur', async () => {
        const dinoData = {
            name: 'Stegosaurus',
            specie: 'Stegosaurus Armatus',
            weight: '5000kg',
            height: '8m',
            dangerLevel: 5,
            diet: 'herbivore',
            dateBorn: new Date(),
            enclosureId: 'E2',
        };

        const res = await request(app)
            .post('/api/dinosaurs')
            .send(dinoData)
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Stegosaurus');
        expect(res.body.dangerLevel).toBe(5);
    });

    it('GET /api/dinosaurs/:id - should return 404 if not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/dinosaurs/${nonExistentId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Dinosaur not found');
    });

    it('PUT /api/dinosaurs/:id - should update a dinosaur', async () => {
        const dino = await Dinosaur.create({
            name: 'Triceratops',
            specie: 'Triceratops horridus',
            weight: '6000kg',
            height: '9m',
            dangerLevel: 7,
            diet: 'herbivore',
            dateBorn: new Date(),
            enclosureId: 'E3',
        });

        const res = await request(app)
            .put(`/api/dinosaurs/${dino._id}`)
            .send({ name: 'Updated Triceratops' });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Updated Triceratops');
    });

    it('DELETE /api/dinosaurs/:id - should delete a dinosaur', async () => {
        const dino = await Dinosaur.create({
            name: 'Velociraptor',
            specie: 'Velociraptor mongoliensis',
            weight: '300kg',
            height: '2m',
            dangerLevel: 9,
            diet: 'carnivore',
            dateBorn: new Date(),
            enclosureId: 'E4',
        });

        const res = await request(app).delete(`/api/dinosaurs/${dino._id}`);
        expect(res.statusCode).toBe(204);

        const check = await Dinosaur.findById(dino._id);
        expect(check).toBeNull();
    });
});
