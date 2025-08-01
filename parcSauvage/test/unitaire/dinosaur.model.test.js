const mongoose = require('mongoose');
const Dinosaur = require('../../src/models/dinosaur');

describe('Dinosaur Model', () => {
  it('should create a dinosaur with valid fields', () => {
    const dino = new Dinosaur({
      name: 'Raptor',
      specie: 'Velociraptor',
      weight: '70',
      height: '1.8',
      dangerLevel: 8,
      diet: 'carnivore',
      dateBorn: new Date('2020-01-01'),
      enclosureId: 'A-01',
    });

    expect(dino.name).toBe('Raptor');
    expect(dino.diet).toBe('carnivore');
    expect(dino.dangerLevel).toBeGreaterThan(5);
  });

  it('should throw validation error for missing required fields', async () => {
    const invalidDino = new Dinosaur({ name: 'DinoWithoutSpecie' });
    let err;

    try {
      await invalidDino.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.specie).toBeDefined();
  });
});
