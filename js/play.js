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

        game.add.tileSprite(0, 0, 800, 600, 'background');
        enemies = game.add.group();
                
        for (var i = 0; i < 6; i++)
        {
            enemies.create(120 * i, game.rnd.integerInRange(100, 400), 'blueFish');    
        }
        
        enemies.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 50, false);
        
        
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            
            enemy.animations.add('walk');
            //enemy.animations.play('walk', 20, true);
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
            this.world.wrap( enemy, enemy.width / 2, false );            
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
    // HORRIBLE HACK - google something better
    // http://www.html5gamedevs.com/topic/2794-how-to-add-an-animation-to-a-group-sprite/
    /*for (var i = 0; i < enemies.children.length; i++)
    {
        var enemy = enemies.children[i];
        enemy.animations.play('walk', 30, true);
        setTimeout(function () {
            for (var i = 0; i < enemies.children.length; i++)
            {
                var enemy = enemies.children[i];
                enemy.animations.stop();
            }
        }, 400);
        
    }*/
    
    enemies.callAll('animations.play', 'animations', 'spin');
    
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
    
    for (var i = 0; i < enemies.children.length; i++)
    {
        var enemy = enemies.children[i];
        enemy.position.x = 150 * i;
        enemy.position.y = game.rnd.integerInRange(100, 600)
        //enemies.create(120 * i, game.rnd.integerInRange(100, 400), 'blueFish');    
    }
    
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
