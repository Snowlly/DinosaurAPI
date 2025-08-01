const request = require('supertest');
const express = require('express');
const incidentRouter = require('../../src/routes/incident');
const Incident = require('../../src/models/incident');

jest.mock('../../src/models/incident');

const app = express();
app.use(express.json());
app.use('/incidents', incidentRouter);

describe('Incident Routes', () => {
    // POST
    describe('POST /incidents', () => {
        it('should create a new incident and return it', async () => {
            const mockIncident = {
                _id: 'incident123',
                title: 'Escape attempt',
                description: 'A dinosaur tried to escape',
                severity: 'high',
                isDone: false,
                dateCreation: '2023-07-15T12:00:00Z',
                assignedKeepers: [],
            };

            Incident.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockIncident),
            }));

            const res = await request(app)
                .post('/incidents')
                .send({
                    title: 'Escape attempt',
                    description: 'A dinosaur tried to escape',
                    severity: 'high',
                    isDone: false,
                })
                .expect(201);

            expect(res.body.title).toBe('Escape attempt');
            expect(res.body.severity).toBe('high');
        });

        it('should handle error when saving fails', async () => {
            Incident.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Save failed')),
            }));

            const res = await request(app)
                .post('/incidents')
                .send({
                    title: 'Failed incident',
                    description: 'Something went wrong',
                    severity: 'medium',
                    isDone: false,
                });

            expect(res.status).toBeGreaterThanOrEqual(400);
        });
    });


    // GET
    describe('GET /incidents', () => {
        it('should return all incidents', async () => {
            const mockData = [
                { title: 'Alert 1', severity: 'low' },
                { title: 'Alert 2', severity: 'critical' },
            ];

            Incident.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockData),
            });

            const res = await request(app).get('/incidents').expect(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[1].title).toBe('Alert 2');
        });
    });



    // PUT
    describe('PUT /incidents/:id', () => {
        it('should update and return the incident', async () => {
            Incident.findByIdAndUpdate.mockReturnValue({
                populate: jest.fn().mockResolvedValue({
                    _id: 'fake-id',
                    title: 'Updated Incident',
                    description: 'Updated desc',
                    severity: 'medium',
                    isDone: false,
                    assignedKeepers: [],
                    dateCreation: new Date()
                })
            });

            const res = await request(app)
                .put('/incidents/fake-id')
                .send({
                    title: 'Updated Incident',
                    description: 'Updated desc',
                    severity: 'medium',
                    isDone: false,
                })
                .expect(200);

            expect(res.body.title).toBe('Updated Incident');
        });

        it('should return 404 if not found', async () => {
            Incident.findByIdAndUpdate.mockResolvedValue(null);

            const res = await request(app)
                .put('/incidents/missing-id')
                .send({
                    title: 'Nope',
                    description: 'Missing incident',
                    severity: 'low',
                    isDone: false,
                })
                .expect(404);

            expect(res.body).toHaveProperty('error');
        });

    });
});