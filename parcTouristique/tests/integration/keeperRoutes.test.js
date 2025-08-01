const request = require('supertest');
const express = require('express');
const keeperRouter = require('../../src/routes/keeper');
const Keeper = require('../../src/models/keeper');

jest.mock('../../src/models/keeper');

const app = express();
app.use(express.json());
app.use('/keepers', keeperRouter);

describe('Keeper Routes', () => {
    // POST
    describe('POST /keepers', () => {
        it('should create and return the new keeper', async () => {
            const mockKeeper = {
                name: 'John Doe',
                age: 35,
                assignedEnclosure: 'A-01',
                _id: 'keeper123'
            };

            Keeper.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockKeeper)
            }));

            const res = await request(app)
                .post('/keepers')
                .send({
                    name: 'John Doe',
                    age: 35,
                    assignedEnclosure: 'A-01'
                })
                .expect(201);

            expect(res.body.name).toBe('John Doe');
            expect(res.body.age).toBe(35);
        });

        it('should handle error when saving fails', async () => {
            Keeper.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Save failed'))
            }));

            const res = await request(app)
                .post('/keepers')
                .send({
                    name: 'Error Guy',
                    age: 40,
                    assignedEnclosure: 'Z-99'
                });

            expect(res.status).toBeGreaterThanOrEqual(400);
        });
    });

    // GET
    describe('GET /keepers', () => {
        it('should return all keepers', async () => {
            const mockData = [
                { name: 'Alice', age: 28 },
                { name: 'Bob', age: 40 }
            ];

            Keeper.find.mockResolvedValue(mockData);

            const res = await request(app).get('/keepers').expect(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].name).toBe('Alice');
        });
    });

    // PUT
    describe('PUT /keepers/:id', () => {
        it('should update and return the keeper', async () => {
            const updated = { name: 'Updated Keeper' };

            Keeper.findByIdAndUpdate.mockResolvedValue(updated);

            const res = await request(app)
                .put('/keepers/123')
                .send({ name: 'Updated Keeper' })
                .expect(200);

            expect(res.body.name).toBe('Updated Keeper');
        });

        it('should return 404 if keeper not found', async () => {
            Keeper.findByIdAndUpdate.mockResolvedValue(null);

            const res = await request(app)
                .put('/keepers/unknown')
                .send({ name: 'DoesNotExist' });

            expect(res.status).toBe(404);
        });
    });
});