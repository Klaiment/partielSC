const Map = require('../class/map');
const Resource = require('../class/resource');
const Survivor = require('../class/survivor');
describe('Map', () => {
    let map;
    let survivor;

    beforeEach(() => {
        map = new Map(10, 10);
        survivor = new Survivor(0, 0, 'north', 100);

    });

    test('should create a grid with given dimensions', () => {
        expect(map.grid.length).toBe(10);
        expect(map.grid[0].length).toBe(10);
    });

    test('should add an item to the grid', () => {
        const food = new Resource('food');
        map.addItem(3, 3, food);
        expect(map.getPosition(3, 3).item).toBe(food);
    });

    test('should add a zombie to the grid', () => {
        map.addZombie(5, 5);
        expect(map.getPosition(5, 5).type).toBe('zombie');
    });

    test('should return out of bounds correctly', () => {
        expect(map.isOutOfBounds(-1, 0)).toBe(true);
        expect(map.isOutOfBounds(0, -1)).toBe(true);
        expect(map.isOutOfBounds(10, 0)).toBe(true);
        expect(map.isOutOfBounds(0, 10)).toBe(true);
        expect(map.isOutOfBounds(5, 5)).toBe(false);
    });

    test('should add item to survivor inventory when survivor steps on it', () => {
        const food = new Resource('food');
        map.addItem(1, 0, food);

        survivor.move('east'); // Move survivor to (1, 0)
        const position = map.getPosition(survivor.x, survivor.y);
        if (position.type === 'item') {
            survivor.addItem(position.item);
        }

        expect(survivor.inventory).toContain(food);
    });
});
