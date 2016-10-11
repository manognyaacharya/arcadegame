// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //setting th initial location of enemies
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random()*(200);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505 ) {
        this.x = this.x + this.speed*dt;
        this.y = this.y;
    }
    else {
        this.positionreset();
    }
    this.detectCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawBox(this.x, this.y + 77, 100, 67, "yellow");
};
//Enemy.prototype.detectCollision = function() {
    //if (this.x < player.x + 101 && this.x + 101 > player.x && this.y < player.y + 65 && 65 + this.y > player.y){
        //this.positionreset();
        //console.log("collision");
        //player.reset();
    //}
//};
Enemy.prototype.detectCollision = function() {
    //console.log("inside collision function");
    var enemyBox = {x: this.x, y: this.y + 77, width: 100, height:67};
    var playerBox = {x: player.x + 16 , y: player.y + 63 , width: 70, height: 75};
    //console.log(enemyBox,playerBox);
    if (enemyBox.x < playerBox.x + playerBox.width && enemyBox.x + enemyBox.width > playerBox.x && enemyBox.y < playerBox.y + playerBox.height && enemyBox.height + enemyBox.y > playerBox.y) {
         this.positionreset();
         console.log("collision");
         player.reset();
    }
};
Enemy.prototype.positionreset = function() {
    this.x=0;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player = function(x,y) {
    //initial location
    //postions of player can be anywere in a grid of 6x5 matrix
    this.x = x;
    this.y = y;
    this.ct = 0;
    this.sprite = 'images/char-boy.png';
    this.score = 10;
    this.gem = {
        "gems" : [{
            "rgn": 0,
            "imageurl":"images/Gem-Orange.png",
            "gemrows" : [65, 150, 230],
            "score": 10,
            "xpos": [],
            "ypos": []
        }, {
            "rgn": 0,
            "imageurl":"images/Gem-Green.png",
            "gemrows" : [65, 150, 230],
            "score": 20,
            "xpos": [],
            "ypos": []
        }, {
            "rgn": 0,
            "imageurl":"images/Gem-Blue.png",
            "gemrows" : [65, 150, 230],
            "score": 30,
            "xpos": [],
            "ypos": []
        }
    ]};
    this.randomnumbergenerator();

    // /this.gems();
};

player.prototype.update = function(){
    if( this.y < -81){
        this.y = 5*81;
        this.randomnumbergenerator();
        console.log(this.score);
    }
    if( this.y > 6*81){
       this.y = 5*81;
    }
    this.itemCollision();
};
player.prototype.randomnumbergenerator = function() {
        this.gem.gems.forEach( function(eachgem){
            eachgem.rgn = ((Math.random() * 10) % 2);
            console.log(eachgem.rgn);
            for(var i=0; i < eachgem.rgn ; i++){
               eachgem.xpos[i]=Math.floor((Math.random()*10 ) % 5) * 101;
               eachgem.ypos[i]=eachgem.gemrows[Math.floor((Math.random()*10 ) % 3)];
            }
        });
}
player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y );
    drawBox(this.x + 16,this.y + 63,70 , 75,"yellow" );
    this.gemplace();
};
player.prototype.gemplace = function() {
    this.gem.gems.forEach( function(eachgem){
        for (var t = 0; t < eachgem.rgn ;t++){
            ctx.drawImage(Resources.get(eachgem.imageurl), eachgem.xpos[t], eachgem.ypos[t]);
        }
    });
}
player.prototype.handleInput = function(key){
        if( key == 'left'){
            this.x = this.x - 100;
        }
        else if (key == 'right'){
            this.x = this.x + 100;
        }
        else if ( key == 'down'){
            this.y = this.y + 83;
        }
        else if (key == 'up'){
            this.y = this.y - 83;
        }
};
player.prototype.itemCollision = function(){
    var playerBox = {x: player.x + 16 , y: player.y + 63 , width: 70, height: 75};
    //three gemboxes for three category of gems
    this.gem.gems.forEach( function(eachgem){
        for(var i=0; i < eachgem.rgn ; i++){
            var gemBox = {x: eachgem.xpos[i], y: eachgem.ypos[i] + 77, width: 100, height:105};
            if (gemBox.x < playerBox.x + playerBox.width && gemBox.x + gemBox.width > playerBox.x && gemBox.y < playerBox.y + playerBox.height && gemBox.height + gemBox.y > playerBox.y) {
                this.score = this.score + eachgem.score;
                console.log("gem collision");
            }
        }
    });
    //console.log(this.score);
};
player.prototype.reset = function(){
    this.x = player_initialX;
    this.y = player_initialY;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var bug1 = new Enemy(1,65);
var bug2 = new Enemy(2,150);
var bug3 = new Enemy(3,230);
var allEnemies = [bug1,bug2,bug3];
var rows = [ 65, 150, 230];
var player_initialX = 2*100;
var player_initialY = 5*81;
var gemimages = ['images/Gem-Green.png', 'images/Gem-Blue.png', 'images/Gem-Orange.png'];
var player = new player(player_initialX, player_initialY);
//console.log(gemimages[1]);
var drawBox = function(x,y,width,height,color){
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

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
