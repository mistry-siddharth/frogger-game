// All the functions related to enemy begin from here
// Enemies our player must avoid
var Enemy = function(x, y, en_speed) {
    // Variables applied to each of our instances go here.
    this.x = x;
    this.y = y;
    this.speed = en_speed;

    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x >= 505) {
        this.x = 0;
    }
    // This checks for collision
    this.checkCollision();
};

// Function for checking if the player collided with the enemy
Enemy.prototype.checkCollision = function() {
    if(Math.round(this.x/85) === Math.round(player.x/85) &&
        Math.round(this.y/80) === Math.round(player.y/80) ) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// All the functions related to the player begin from here
var Player = function() {
    // Initial position and score for the player
    this.x = 200;
    this.y = 400;
    this.score = 0;

    // Sprite for the player image
    this.sprite = 'images/char-boy.png';
};

// This function is used to update player location to default location,
// and update the score once the player reaches water
Player.prototype.update = function() {
    this.x = 200;
    this.y = 400;
    this.score += 1;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function takes care for the movement of the player
// and makes sure it doesn't move out of the game area.
Player.prototype.handleInput = function(key) { 
    if(key === 'left') {
        if(this.x > 0) {
            this.x = this.x - 100;
        }
    }
    else if(key === 'right') {
        if(this.x < 400) {
            this.x = this.x + 100;
        }
    }
    else if(key === 'up') {
        if(this.y > 0) {
            this.y = this.y - 80;
        }
    }
    else if(key === 'down') {
        if(this.y < 380) {
            this.y = this.y + 80;
        } 
    }
};

// This function is used to reset the player and score to initial
// conditions if it collides with the enemy
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    this.score = 0;    
};

// An array to store all the enemies that are generated
var allEnemies = [];

// Frequency with which enemies are created and are stored in
// allEnemies array
for(var i = 0; i < 6; i++) {
    var enemy_row = 65 + (Math.floor(Math.random()*3 + 1) - 1)*80;
    var enemy_speed = Math.random()*300;
    var gen_enemy = new Enemy(0, enemy_row, enemy_speed);
    allEnemies.push(gen_enemy);
}

// Create a player object
var player = new Player();

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