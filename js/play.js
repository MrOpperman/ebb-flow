// Mission Sunset - Palms

var enemies;
var movement_direction = [50, -50];
var timer = 60;
var countDownText;
var timerEvent;
var counter = 0;
var counterText;

var playState = {
    create: function() {
        timer = 60;
        timerEvent = this.time.events.loop(Phaser.Timer.SECOND, updateTimer);
        countDownText = this.add.text(0, 0, timer, { font: "65px Arial", fill: "#ff0044"});
        
        counterText = this.add.text(100, 0, counter, { font: "65px Arial", fill: "#ff0044"});

        
        enemies = game.add.group();
        
        // add 8 rows and 4 cols of enemies
        // make this feel more continuous 
        /*var x = 0;
        for (var i = 0 ; i < 8; i++)
        {
            var y = 0;
            
            for (var j = 0; j < 5; j++)
            {
                enemies.create(x, y, 'fish1');
                y += 150;
            }            
            
            x += 100;            
        }*/
        
        enemies.create(100, 200, 'fish2');
        enemies.create(150, 350, 'fish2');
        enemies.create(325, 250, 'fish2');
        enemies.create(400, 200, 'fish2');
 
        enemies.create(0, 400, 'fish2');
        enemies.create(600, 315, 'fish2');
        enemies.create(512, 152, 'fish2');
        enemies.create(800, 400, 'fish2');
        
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            
            //enemy.animations.add('walk');
            //enemy.animations.play('walk', 30, true);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
        
        }

        setDirection();

        this.keyboard = game.input.keyboard;  
        
        var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        left.onDown.add(function (key) {
            testKey('left');
        }, this);
        
        right.onDown.add(function (key) {
            testKey('right');
        }, this);
        
        up.onDown.add(function (key) {
            testKey('up');
        }, this);
        
        down.onDown.add(function (key) {
            testKey('down');
        }, this);
    },
    
    update: function() {
        var firstenemy = enemies.children[0];
        
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            this.world.wrap( enemy, enemy.width / 100, false );            
        }        
    },
    
    Win: function() {
        counter++;
        game.state.start('play');
        //console.log(counter);
    }
}

function testKey (key) {
    var enemy = enemies.children[0];
    var position = enemy.position;
    var previous_position = enemy.previousPosition;
    
    switch(key) {
        case 'left': 
            if (  position.x < previous_position.x )
                updateCounter(game);
            else
                console.log("INCORRECT LEFT");
            break;
        case 'right':
            if (  position.x > previous_position.x )
                updateCounter(game);
            else
                console.log("INCORRECT RIGHT");
            break;
        case 'up':
            if (  position.y < previous_position.y )
                updateCounter(game);
            else
                console.log("INCORRECT UP");
            break;
        case 'down':
            if (  position.y > previous_position.y )
                updateCounter(game);
            else
                console.log("INCORRECT DOWN");
            break;
    }
    
    setDirection();
}

function setDirection(key) {
    var key = key; 
    var upOrDown = ['up', 'down'];    
    var xydirection = upOrDown[Math.floor(Math.random() * upOrDown.length)];
    
    var direction = movement_direction[Math.floor(Math.random() * movement_direction.length)];
    
    var enemy = enemies.children[0];
    var position = enemy.position;
    var previous_position = enemy.previousPosition;
    
    if (xydirection == 'up')
    {
        //Needs some work, vertical is odd...
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            //enemy.scale.y = 0;
            game.physics.arcade.velocityFromRotation(55, direction, enemy.body.velocity);
            enemy.anchor.setTo(.5,.5);
            
            enemy.angle = 90;
            enemy.scale.x = 1;
            if (direction == -50)
            {
                enemy.scale.x = 1;
            }
            else
            {
                enemy.scale.x = -1;
            }
            
        }
    }
    else
    {

        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            enemy.angle = 0;

            game.physics.arcade.velocityFromRotation(enemy.rotation, direction, enemy.body.velocity);
            enemy.anchor.setTo(.5,.5);
            if (direction == -50)
            {
                enemy.scale.x = -1;
            }
            else
            {
                enemy.scale.x = 1;
            }
        }
    }
    
};


function updateTimer() {
    timer -= 1;
    if(timer === 0) 
    {
        //To remove event:
        //game.time.events.remove(timerEvent);
        game.state.start('win');
    } 
    else
    {
        countDownText.setText(timer);
    }
}

function updateCounter() {
    counter++;
    counterText.setText(counter);
}
