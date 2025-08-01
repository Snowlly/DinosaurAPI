const mongoose = require('mongoose');
const Incident = require('../../src/models/incident');

describe('Incident Model Unit Tests', () => {
    it('should create a valid incident', async () => {
        const incident = new Incident({
            title: 'Fence broken',
            severity: 'high',
            description: 'Fence in zone 3 broken by dino',
            assignedKeeper: new mongoose.Types.ObjectId(),
        });

        const saved = await incident.validate();
        expect(saved).toBeUndefined();
    });

    it('should be invalid without required fields', async () => {
        const incident = new Incident({ title: 'Incomplete incident' });

        let err;
        try {
            await incident.validate();
        } catch (validationError) {
            err = validationError;
        }

        expect(err).toBeDefined();
        expect(err.errors.severity).toBeDefined();
        expect(err.errors.description).toBeDefined();
        expect(err.errors.assignedKeeper).toBeDefined();
    });

    it('should reject invalid severity', async () => {
        const incident = new Incident({
            title: 'Wrong severity',
            severity: 'extreme',
            description: 'Invalid enum',
            assignedKeeper: new mongoose.Types.ObjectId(),
        });

        await expect(incident.validate()).rejects.toThrow(mongoose.Error.ValidationError);
    });
});
