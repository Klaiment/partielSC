const Resource = require('../class/resource');

describe('Resource', () => {
    test('should initialize with given name', () => {
        const food = new Resource('food');
        expect(food.name).toBe('food');
    });
});
