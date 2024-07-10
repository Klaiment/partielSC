class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = this.createGrid();
    }

    createGrid() {
        const grid = [];
        for (let i = 0; i < this.width; i++) {
            grid[i] = [];
            for (let j = 0; j < this.height; j++) {
                grid[i][j] = { type: 'empty' };
            }
        }
        return grid;
    }

    addItem(x, y, item) {
        this.grid[x][y] = { type: 'item', item: item };
    }

    addZombie(x, y) {
        this.grid[x][y] = { type: 'zombie' };
    }

    getPosition(x, y) {
        return this.grid[x][y];
    }

    isOutOfBounds(x, y) {
        return x < 0 || y < 0 || x >= this.width || y >= this.height;
    }
}

module.exports = Map;
