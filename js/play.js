// Mission Sunset - Palms

var enemies;
var movement_direction = [50, -50];
var timer = 60;
var countDownText;
var timerEvent;

var playState = {
    create: function() {
        timer = 60;
        timerEvent = this.time.events.loop(Phaser.Timer.SECOND, updateTimer);
        countDownText = this.add.text(0, 0, timer, { font: "65px Arial", fill: "#ff0044"});

        
        enemies = game.add.group();
        
        // add 8 rows and 4 cols of enemies
        // make this feel more continuous 
        var x = 0;
        for (var i = 0 ; i < 8; i++)
        {
            var y = 0;
            
            for (var j = 0; j < 5; j++)
            {
                enemies.create(x, y, 'mummy');
                y+=100;
            }            
            
            x+= 100;            
        }
        
        
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            
            enemy.animations.add('walk');
            enemy.animations.play('walk', 30, true);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            
            game.physics.arcade.velocityFromRotation(enemy.rotation, 50, enemy.body.velocity);
        
        }
        
        this.keyboard = game.input.keyboard;  
        
        var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        left.onDown.add(function (key) {
            setDirection();
        }, this);
        
        right.onDown.add(function (key) {
            setDirection();
        }, this);
        
        up.onDown.add(function (key) {
            setDirection();
        }, this);
        
        down.onDown.add(function (key) {
            setDirection();
        }, this);
    },
    
    update: function() {
        var firstenemy = enemies.children[0];
        
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            this.world.wrap( enemy, enemy.width / 50, false );            
        }        
    },
    
    Win: function() {
        counter++;
        game.state.start('play');
        //console.log(counter);
    }
}

function setDirection() {
    console.log('hey');
    var upOrDown = ['up', 'down'];    
    var xydirection = upOrDown[Math.floor(Math.random() * upOrDown.length)];
    
    var direction = movement_direction[Math.floor(Math.random() * movement_direction.length)];
    var enemy = enemies.children[0];
    
    if (xydirection == 'up')
    {
        //Needs some work, vertical is odd...
        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            game.physics.arcade.velocityFromRotation(55, direction, enemy.body.velocity);
            //enemy.angle = 100; 100 = down
            //enemy.angle = 0; // forward
            
        }
    }
    else
    {
        

        for (var i = 0; i < enemies.children.length; i++)
        {
            var enemy = enemies.children[i];
            game.physics.arcade.velocityFromRotation(enemy.rotation, direction, enemy.body.velocity);
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
        game.state.start('boot');
    } 
    else
    {
        countDownText.setText(timer);
    }
}

