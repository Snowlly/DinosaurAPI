const request = require('supertest');
const express = require('express');
const dinosaurRouter = require('../../src/routes/dinosaur');
const Dinosaur = require('../../src/models/dinosaur');

jest.mock('../../src/models/dinosaur');

const app = express();
app.use(express.json());
app.use('/dinosaurs', dinosaurRouter);

// POST
describe('Dinosaur Routes', () => {
  describe('POST /dinosaurs', () => {
    it('should create a new dinosaur and return it with status 201', async () => {
      const mockDino = {
        name: 'Raptor',
        specie: 'Velociraptor',
        weight: '70kg',
        height: '1.8m',
        dangerLevel: 8,
        diet: 'carnivore',
        dateBorn: '2020-01-01T00:00:00Z',
        enclosureId: 'A-02',
        _id: 'fakeid123'
      };

      Dinosaur.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockDino)
      }));

      const response = await request(app)
        .post('/dinosaurs')
        .send({
          name: 'Raptor',
          specie: 'Velociraptor',
          weight: '70',
          height: '1.8',
          dangerLevel: 8,
          diet: 'carnivore',
          dateBorn: '2020-01-01T00:00:00Z',
          enclosureId: 'A-02'
        })
        .expect(201);

      expect(response.body.name).toBe('Raptor');
      expect(response.body.specie).toBe('Velociraptor');
    });

    it('should handle errors and call next()', async () => {
      const error = new Error('Save failed');

      Dinosaur.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(error)
      }));

      const response = await request(app)
        .post('/dinosaurs')
        .send({
          name: 'FailDino',
          specie: 'Erroraurus',
          weight: '999',
          height: '5',
          dangerLevel: 10,
          diet: 'carnivore',
          dateBorn: '1999-01-01T00:00:00Z',
          enclosureId: 'Z-99'
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  // GET
  describe('GET /dinosaurs', () => {
    it('should return a list of dinosaurs', async () => {
      const mockDinos = [
        { name: 'Dino1', specie: 'Specie1' },
        { name: 'Dino2', specie: 'Specie2' }
      ];

      Dinosaur.find.mockResolvedValue(mockDinos);

      const res = await request(app).get('/dinosaurs').expect(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe('Dino1');
    });
  });

  // PUT
  describe('PUT /dinosaurs/:id', () => {
    it('should update a dinosaur and return it', async () => {
      const updatedDino = { name: 'UpdatedDino', specie: 'UpdatedSpecie' };

      Dinosaur.findByIdAndUpdate.mockResolvedValue(updatedDino);

      const res = await request(app)
        .put('/dinosaurs/fake-id-123')
        .send({ name: 'UpdatedDino', specie: 'UpdatedSpecie' })
        .expect(200);

      expect(res.body.name).toBe('UpdatedDino');
    });

    it('should return 404 if dinosaur not found', async () => {
      Dinosaur.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put('/dinosaurs/unknown-id')
        .send({ name: 'GhostDino' });

      expect(res.status).toBe(404);
    });
  });
});
