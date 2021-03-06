// Enemies our player must avoid
"use strict";
var Enemy = function(x, y) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //setting the initial location of enemies
    this.x = x;
    this.y = y;
    this.sprite = "images/enemy-bug.png";
    this.speed = Math.random() * (200);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + this.speed * dt;
        this.y = this.y;
    } else {
        this.positionreset();
    }
    this.detectCollision();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    if (player.lives > 0 && player.score < 200) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } else {
        document.getElementById("score").value = player.score;

    }

};
Enemy.prototype.detectCollision = function() {
    "use strict";
    var enemyBox = {
        x: this.x,
        y: this.y + 77,
        width: 100,
        height: 67
    };
    var playerBox = {
        x: player.x + 16,
        y: player.y + 63,
        width: 70,
        height: 75
    };
    if (enemyBox.x < playerBox.x + playerBox.width
        && enemyBox.x + enemyBox.width > playerBox.x
        && enemyBox.y < playerBox.y + playerBox.height
        && enemyBox.height + enemyBox.y > playerBox.y) {
        this.positionreset();
        player.lives--;
        document.getElementById("lives").value = player.lives;
        player.reset();
    }
};
Enemy.prototype.positionreset = function() {
    "use strict";
    this.x = 0;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    "use strict";
    //initial location
    //postions of player can be anywere in a grid of 6x5 matrix
    this.x = x;
    this.y = y;
    this.score = 0;
    this.lives = 5;
    this.count = 0;
    //initial score and lives are printed
    document.getElementById("score").value = this.score;
    document.getElementById("lives").value = this.lives;
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
    "use strict";
    if (this.y < 0) {
        this.count++; //this accounts for renders of the player in the river
        //and once it reaches 10 then it sets players position to initial position.
        if (this.count > 10) {
            this.counnt = 0;
            this.y = 5 * 81;
            //on reaching start postion again resetting the number of gems
            gemcl.randomnumbergenerator();
        }
    }
    if (this.y > 6 * 81) {
        this.y = 5 * 81;
    }
    if (this.x > 4 * 100) {
        this.x = 4 * 100;
    }
    if (this.x < 0) {
        this.x = 0;
    }
};

Player.prototype.render = function() {
    "use strict";
    if (this.lives > 0 && this.score < 200) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        gemcl.gemplace();
    }
    else {
        if (this.score > 200) {
            document.getElementById("gameover").value = " You " + " win!!";
        }
        else {
            document.getElementById("gameover").value = "Gameover" + " You " + " lose";
        }
    }

};
Player.prototype.handleInput = function(key) {
    "use strict";
    if (key == "left" && player.lives > 0 && player.score < 200) {
        this.x = this.x - 100;
    }
    else if (key == "right" && player.lives > 0 && player.score < 200) {
        this.x = this.x + 100;
    }
    else if (key == "down" && player.lives > 0 && player.score < 200) {
        this.y = this.y + 83;
    }
    else if (key == "up" && player.lives > 0 && player.score < 200) {
        this.y = this.y - 83;
    }
    this.itemCollision();

};
Player.prototype.itemCollision = function() {
    "use strict";
    var playerBox = {
        x: this.x + 16,
        y: this.y + 63,
        width: 70,
        height: 75
    };
    //three gemboxes for three category of gems
    var myobj = this;
    gemcl.gem.gems.forEach(function(eachgem) {
        "use strict";
        for (var i = 0; i < eachgem.rgn; i++) {
            //orginal gem height is 171 ie image height - blank space on top which is 33.33% of 171
            var gemBox = {
                x: eachgem.xpos[i],
                y: eachgem.ypos[i] + 0.3 * eachgem.spriteheight[i],
                width: eachgem.spritewidth[i],
                height: eachgem.spriteheight[i] - 0.33 * eachgem.spriteheight[i]
            };
            if (gemBox.x < playerBox.x + playerBox.width
                && gemBox.x + gemBox.width > playerBox.x
                && gemBox.y < playerBox.y + playerBox.height
                && gemBox.height + gemBox.y > playerBox.y) {
                myobj.score = myobj.score + eachgem.score;
                eachgem.xpos[i] = 600;
                eachgem.ypos[i] = 600;
                document.getElementById("score").value = myobj.score;

            }
        }
    });
};
Player.prototype.reset = function() {
    "use strict";
    this.x = player_initialX;
    this.y = player_initialY;
};

var Gem = function() {
    "use strict";
    this.gem = {
        "gems": [{
            "rgn": 0,
            "sprite": "images/Gem-Orange.png",
            "spritewidth": [],
            "spriteheight": [],
            "score": 10,
            "xpos": [],
            "ypos": []
        }, {
            "rgn": 0,
            "sprite": "images/Gem-Green.png",
            "spritewidth": [],
            "spriteheight": [],
            "score": 20,
            "xpos": [],
            "ypos": []
        }, {
            "rgn": 0,
            "sprite": "images/Gem-Blue.png",
            "spritewidth": [],
            "spriteheight": [],
            "score": 30,
            "xpos": [],
            "ypos": []
        }]
    };
    this.randomnumbergenerator();
};
Gem.prototype.gemplace = function() {
    "use strict";
    this.gem.gems.forEach(function(eachgem) {
        for (var t = 0; t < eachgem.rgn; t++) {
            ctx.drawImage(Resources.get(eachgem.sprite), eachgem.xpos[t], eachgem.ypos[t], eachgem.spritewidth[t], eachgem.spriteheight[t]);
        }
    });
}
Gem.prototype.getRandomValue = function(min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Gem.prototype.randomnumbergenerator = function() {
    "use strict";
    var myobj = this;
    this.gem.gems.forEach(function(eachgem) {
        eachgem.rgn = myobj.getRandomValue(1, 3);
        for (var i = 0; i < eachgem.rgn; i++) {
            eachgem.xpos[i] = myobj.getRandomValue(100, 400);
            eachgem.spritewidth[i] = myobj.getRandomValue(20, 100);
            eachgem.ypos[i] = myobj.getRandomValue(100, 400);
            eachgem.spriteheight[i] = myobj.getRandomValue(40, 80);
        }
    });
};
// Now instantiate  objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy(1, 65);
var bug2 = new Enemy(2, 150);
var bug3 = new Enemy(3, 230);
var allEnemies = [bug1, bug2, bug3];
var player_initialX = 2 * 100;
var player_initialY = 5 * 81;
var gemcl = new Gem();
var player = new Player(player_initialX, player_initialY);

// This listens for key presses and sends the keys to your
// player.handleInput() method. You don"t need to modify this.
document.addEventListener("keyup", function(e) {
    "use strict";
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//this works on play again button to reset lives scores and position and enemy positions
var playagain = function() {
    "use strict";
    player.lives = 5;
    player.score = 0;
    document.getElementById("score").value = player.score;

    player.reset();
    allEnemies.forEach(function(enemy) {
        enemy.positionreset();
    });
    //reset gems
    gemcl.randomnumbergenerator();
};