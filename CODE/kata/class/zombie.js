class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveRandomly(map) {
        const directions = ['north', 'south', 'east', 'west'];
        const direction = directions[Math.floor(Math.random() * directions.length)];

        switch (direction) {
            case 'north':
                if (!map.isOutOfBounds(this.x, this.y + 1)) this.y++;
                break;
            case 'south':
                if (!map.isOutOfBounds(this.x, this.y - 1)) this.y--;
                break;
            case 'east':
                if (!map.isOutOfBounds(this.x + 1, this.y)) this.x++;
                break;
            case 'west':
                if (!map.isOutOfBounds(this.x - 1, this.y)) this.x--;
                break;
        }
    }
}

module.exports = Zombie;
