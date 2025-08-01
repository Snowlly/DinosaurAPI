const mongoose = require('mongoose');
const Keeper = require('../../src/models/keeper');

describe('Keeper Model', () => {
  it('should create a keeper with valid fields', () => {
    const keeper = new Keeper({
      name: 'John Doe',
      age: 34,
      dateStart: new Date('2020-01-01'),
      available: true,
      sector: 'Zone A',
    });

    expect(keeper.name).toBe('John Doe');
    expect(keeper.age).toBe(34);
    expect(keeper.dateStart).toBeInstanceOf(Date);
    expect(keeper.available).toBe(true);
    expect(keeper.sector).toBe('Zone A');
  });

  it('should throw validation error for missing required fields', async () => {
    const invalidKeeper = new Keeper({});

    let err;
    try {
      await invalidKeeper.validate();
    } catch (e) {
      err = e;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeDefined();
    expect(err.errors.age).toBeDefined();
    expect(err.errors.dateStart).toBeDefined();
    expect(err.errors.sector).toBeDefined();
  });
});
