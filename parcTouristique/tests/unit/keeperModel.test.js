const mongoose = require('mongoose');
const Keeper = require('../../src/models/keeper');

describe('Keeper Model Unit Tests', () => {
    it('should create a valid keeper', async () => {
        const keeper = new Keeper({
            name: 'Alan Grant',
            age: 45,
            sector: 'Zone A',
        });

        const saved = await keeper.validate();
        expect(saved).toBeUndefined(); // pas d'erreur = succès
    });

    it('should be invalid without required fields', async () => {
        const keeper = new Keeper({ name: 'Ellie' }); // age + sector manquent

        let err;
        try {
            await keeper.validate();
        } catch (e) {
            err = e;
        }

        expect(err.errors.age).toBeDefined();
        expect(err.errors.sector).toBeDefined();
    });
});
