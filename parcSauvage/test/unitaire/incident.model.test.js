const mongoose = require('mongoose');
const Incident = require('../../src/models/incident');

describe('Incident Model', () => {
  it('should create an incident with valid fields', () => {
    const incident = new Incident({
      title: 'Fence breach',
      severity: 'high',
      description: 'A dinosaur escaped through a damaged fence.',
      isDone: false,
      assignedKeepers: [new mongoose.Types.ObjectId()],
      dateCreation: new Date('2024-01-01')
    });

    expect(incident.title).toBe('Fence breach');
    expect(incident.severity).toBe('high');
    expect(incident.description).toMatch(/escaped/i);
    expect(incident.isDone).toBe(false);
    expect(incident.assignedKeepers).toHaveLength(1);
  });

  it('should throw validation error for missing required fields', async () => {
    const invalidIncident = new Incident({});
    let err;

    try {
      await invalidIncident.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
    expect(err.errors.severity).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });
});
