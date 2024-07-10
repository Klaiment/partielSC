const Survivor = require('../class/survivor.js');

describe('Survivor', () => {
    let survivor;

    beforeEach(() => {
        survivor = new Survivor(0, 0, 'north', 100);
    });

    test('should initialize with given properties', () => {
        expect(survivor.x).toBe(0);
        expect(survivor.y).toBe(0);
        expect(survivor.orientation).toBe('north');
        expect(survivor.health).toBe(100);
    });

    test('should move in the correct direction', () => {
        survivor.move('north');
        expect(survivor.y).toBe(1);

        survivor.move('south');
        expect(survivor.y).toBe(0);

        survivor.move('east');
        expect(survivor.x).toBe(1);

        survivor.move('west');
        expect(survivor.x).toBe(0);
    });

    test('should add items to inventory', () => {
        survivor.addItem('food');
        expect(survivor.inventory).toContain('food');
    });

    test('should lose health when encountering a zombie', () => {
        survivor.encounterZombie();
        expect(survivor.health).toBe(90);
    });

    test('should be dead if health is 0 or less', () => {
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        survivor.encounterZombie();
        expect(survivor.isAlive()).toBe(false);
    });
});
