const Zombie = require('../class/zombie');
const Map = require('../class/map');

describe('Zombie', () => {
    let zombie;
    let map;

    beforeEach(() => {
        zombie = new Zombie(5, 5);
        map = new Map(10, 10);
    });

    test('should initialize with given coordinates', () => {
        expect(zombie.x).toBe(5);
        expect(zombie.y).toBe(5);
    });

    test('should move randomly without going out of bounds', () => {
        for (let i = 0; i < 100; i++) {
            zombie.moveRandomly(map);
            expect(zombie.x).toBeGreaterThanOrEqual(0);
            expect(zombie.x).toBeLessThan(10);
            expect(zombie.y).toBeGreaterThanOrEqual(0);
            expect(zombie.y).toBeLessThan(10);
        }
    });
});
