const Survivor = require('./class/survivor.js');
const Map = require('./class/map.js');
const Zombie = require('./class/zombie.js');
const Resource = require('./class/resource.js');

const map = new Map(10, 10);
const survivor = new Survivor(0, 0, 'north', 100);

const food = new Resource('food');
map.addItem(3, 3, food);

const water = new Resource('water');
map.addItem(5, 5, water);

const zombie1 = new Zombie(7, 7);
const zombie2 = new Zombie(8, 8);
map.addZombie(7, 7);
map.addZombie(8, 8);

function explore(direction) {
    survivor.move(direction);
    if (map.isOutOfBounds(survivor.x, survivor.y)) {
        console.log('You moved out of bounds and died!');
        survivor.kill();
    } else {
        const position = map.getPosition(survivor.x, survivor.y);
        if (position.type === 'item') {
            survivor.addItem(position.item);
            console.log(`You found ${position.item.name}`);
        } else if (position.type === 'zombie') {
            survivor.encounterZombie();
            console.log('You encountered a zombie and lost 10 health!');
        }
    }

    zombie1.moveRandomly(map);
    zombie2.moveRandomly(map);
    if ((zombie1.x === survivor.x && zombie1.y === survivor.y) || (zombie2.x === survivor.x && zombie2.y === survivor.y)) {
        survivor.encounterZombie();
        console.log('A zombie caught you and you lost 10 health!');
    }

    if (!survivor.isAlive()) {
        console.log('You died!');
    } else {
        console.log(`Your health: ${survivor.health}`);
    }
}

// deplacement du survivant
explore('north');
console.log(survivor.x, survivor.y);
explore('east');
console.log(survivor.x, survivor.y);
explore('east');
console.log(survivor.x, survivor.y);
explore('south');
console.log(survivor.x, survivor.y);
explore('east');
console.log(survivor.x, survivor.y);
