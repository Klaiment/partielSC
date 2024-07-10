class Survivor {
    constructor(x, y, orientation, health) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.health = health;
        this.inventory = [];
        this.alive = true;
    }

    move(direction) {
        switch (direction) {
            case 'north':
                this.y++;
                break;
            case 'south':
                this.y--;
                break;
            case 'east':
                this.x++;
                break;
            case 'west':
                this.x--;
                break;
        }
    }

    addItem(item) {
        this.inventory.push(item);
    }

    encounterZombie() {
        this.health -= 10;
        if (this.health <= 0) {
            this.alive = false;
        }
    }

    isAlive() {
        return this.alive;
    }

    kill() {
        this.health = 0;
        this.alive = false;
    }
}

module.exports = Survivor;
