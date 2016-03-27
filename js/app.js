// Enemies our player must avoid
var Enemy = function(x, y, vel, type) {
    // Variables applied to each of our instances go here.
    this.type = type; // Whether the bug is a red bug or a blue one(default).

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (this.type === 'red') {
        this.sprite = 'images/enemy-bug.png';
    } else {
        this.sprite = 'images/enemy-blue.png';
    }
    this.x = x;
    this.y = y;
    this.vel = vel;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter,
    // which will ensure the game runs at the same speed for
    // all computers.

    //Red bugs move forward, blue bugs move backward.
    if (this.type === 'red') {
        this.x += this.vel * dt;
    } else {
        this.x -= this.vel * dt;
    }

    //If enemy bug goes off canvas, reset it's x-coordinate to -100,
    //and give it a random velocity.

    //For the blue bugs, reset x to 900 and give them a random velocity.
    if (this.x > 900 && this.type === 'red') {
        this.x = -100;
        this.vel = Math.floor(Math.random() * 400 + 50);
    } else if (this.x < -100 && this.type !== 'red') { // !== 'red' implies the bug is a blue one, by default.
        this.x = 900;
    }

    //If the player collides with the bug, reset the player's position
    if (Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 50) {
        player.reset();
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-cat-girl.png';
    this.x = x;
    this.y = y;
    this.gemsCollected = 0; // Stores the number of gems that have been collected so far.
    this.hasKey = false; // Flag which indicates whether the player has the key or not.

};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function that increments, or decrements the player's x and y positions depending on 
// which key is pressed.

Player.prototype.handleInput = function(keyCode) {
    switch (keyCode) {

        case 'left':
            console.log('Moved left');
            if (this.x - 101 > -10) {
                this.x -= 101;
            }
            console.log(this.x, this.y);
            break;

        case 'right':
            console.log('Moved right');
            if (this.x + 101 < 905) {
                this.x += 101;
            }
            console.log(this.x, this.y);
            break;

        case 'up':
            console.log('Moved up');
            if (this.y - 83 > -20) {
                this.y -= 83;
            }
            console.log(this.x, this.y);
            break;

        case 'down':
            console.log('Moved down');
            if (this.y + 83 < 710) {
                this.y += 83;
            }
            console.log(this.x, this.y);
            break;

        default:
            console.log('Press either up, down, left, or right');
    }


};


//Function that resets the player's position.
Player.prototype.reset = function() {
    this.x = 402;
    this.y = 654;
};

// The gems, which need to be collected to display the key.
var Gem = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

Gem.prototype.update = function(dt) {
    //On collision of the player with the gems, increment the number of collected gems by one.
    if (Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 50) {
        player.gemsCollected += 1;
        console.log(player.gemsCollected);
        this.reset();
    }
};

Gem.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.reset = function() {
    this.x = -9999;
    this.y = -9999;
};

//Portal here refers to the star image. 
//The original intention was to use a dimensional portal, and hence the name 'portal'.
var Portal = function(x, y) {
    this.sprite = 'images/spaceportal.png';
    this.x = x;
    this.y = y;

};

Portal.prototype.update = function(dt) {
    if (player.hasKey && Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 50) {
        gameReset();
    }
};

Portal.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


var Key = function(x, y) {
    this.sprite = 'images/Key.png';
    this.x = x;
    this.y = y;
};

Key.prototype.update = function(dt) {
    //If player has collected all three gems and does not have the key, move the key into the screen.
    if (player.gemsCollected === 3 && player.hasKey === false) {
        this.x = 300;
        this.y = 300;
    }

    //If the player collects(collides with) the key, set the hasKey flag of player to true and hide the key.
    if (Math.abs(this.x - player.x) < 80 && Math.abs(this.y - player.y) < 50) {
        player.hasKey = true;
        console.log(player.hasKey);
        this.reset();
    }
};

Key.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Hide the key off the screen.
Key.prototype.reset = function() {
    this.x = -8888;
    this.y = -9999;
};

// Function to reset the game after the star has been activated.
// Does not  reset the bugs, however.
var gameReset = function() {
        player.reset();
        gemGreen.x = 75;
        gemGreen.y = 125;
        gemOrange.x = 500;
        gemOrange.y = 200;
        gemBlue.x = 700;
        gemBlue.y = 500;
        player.hasKey = false;
        player.gemsCollected = 0;
    };
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
var allEnemies = [];
var player = new Player(402, 654);
var gemGreen = new Gem(75, 125, 'images/gem-green.png');
var gemOrange = new Gem(500, 200, 'images/gem-orange.png');
var gemBlue = new Gem(700, 500, 'images/gem-blue.png');
var key = new Key(-9999, -9999);
var enemy1 = new Enemy(-2, 402, Math.floor(Math.random() * 350), 'red');
var enemy2 = new Enemy(800, 153, Math.floor(Math.random() * 250));

var enemy3 = new Enemy(-2, 236, Math.floor(Math.random() * 250), 'red');
var enemy4 = new Enemy(800, 319, Math.floor(Math.random() * 250));
var enemy5 = new Enemy(800, 485, Math.floor(Math.random() * 250));
var portal = new Portal(404, 2);
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);
});