const mongoose = require('mongoose');
const Dinosaur = require('../../src/models/dinosaur');

describe('Dinosaur Model', () => {
    beforeAll(async () => {
        // Connexion à la base de données de test MongoDB
        await mongoose.connect('mongodb://localhost:27017/test-parc-touristique', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        // Déconnexion après les tests
        await mongoose.connection.close();
    });

    it('should create and save a new dinosaur', async () => {
        const dinoData = {
            name: 'T-Rex',
            specie: 'Tyrannosaurus Rex',
            weight: '8000kg',
            height: '12m',
            dangerLevel: 10,
            diet: 'carnivore',
            dateBorn: new Date(),
            enclosureId: 'E1',
        };

        const dino = new Dinosaur(dinoData);
        const savedDino = await dino.save();

        expect(savedDino._id).toBeDefined();
        expect(savedDino.name).toBe(dinoData.name);
        expect(savedDino.dangerLevel).toBe(dinoData.dangerLevel);
    });

    it('should throw an error if required fields are missing', async () => {
        const dinoData = {
            name: 'Velociraptor', // Manque des champs obligatoires
        };

        try {
            await new Dinosaur(dinoData).save();
        } catch (error) {
            expect(error.errors.specie).toBeDefined();
            expect(error.errors.weight).toBeDefined();
        }
    });
});
