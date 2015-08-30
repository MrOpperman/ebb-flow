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

        //this.scale.pageAlignHorizontally = true;

        //centerCountDownText();
        
        enemies = game.add.group();
        
        for (var i = 0; i < 1; i++)
        {
            enemies.create(100, 200, 'mummy');
            var enemy = enemies.children[i];
            
            enemy.animations.add('walk');
            enemy.animations.play('walk', 30, true);
            game.physics.enable(enemy, Phaser.Physics.ARCADE);
            
            game.physics.arcade.velocityFromRotation(enemy.rotation, 50, enemy.body.velocity);
            
            console.log(enemy.body);
        }
        
        this.keyboard = game.input.keyboard;
        
        /*this.player = game.add.sprite(16, 16, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        
        this.win = game.add.sprite(256, 256, 'win');
        game.physics.enable(this.win, Phaser.Physics.ARCADE);*/
        
        
    },
    
    update: function() {
        var enemy = enemies.children[0];
        this.world.wrap( enemy, enemy.width / 2, false );
        
        // positive = right
        // negative = left        
        // create function here, vertical movement will need to use y axis
        var movement =  enemy.position.x - enemy.previousPosition.x;
        var direction = movement_direction[Math.floor(Math.random() * movement_direction.length)];
        
        if (this.keyboard.isDown(Phaser.Keyboard.A) || this.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            if (movement > 0)
            {
                console.log("WRONG DIRECTION");
            }
            else if (movement < 0)
            {
                game.physics.arcade.velocityFromRotation(enemy.rotation, direction, enemy.body.velocity);
            }
            
            setDirection();
        }
        else if (this.keyboard.isDown(Phaser.Keyboard.D) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) 
        {
            if (movement < 0)
            {
                alert("WRONG DIRECTION");                
            }
            else if (movement > 0)
            {
                game.physics.arcade.velocityFromRotation(enemy.rotation, direction, enemy.body.velocity);
            }
        }
        
        
    },
    
    Win: function() {
        counter++;
        game.state.start('play');
        console.log(counter);
    }
}

function setDirection() {
    var upOrDown = ['up', 'down'];
    var xydirection = upOrDown[Math.floor(Math.random() * upOrDown.length)];
    var direction = movement_direction[Math.floor(Math.random() * movement_direction.length)];
    var enemy = enemies.children[0];
    
    if (xydirection == 'up')
    {
        console.log(enemy.body.velocity)
        enemy.body.velocity.x = 0;
        enemy.body.velocity.y = 90;
        game.physics.arcade.velocityFromRotation(55, 50, enemy.body.velocity);
        console.log(enemy.body.velocity)
    }
    else
    {
        game.physics.arcade.velocityFromRotation(enemy.rotation, direction, enemy.body.velocity)
    }
        
        
    console.log(xydirection);
    
};


function updateTimer() {
    timer -= 1;
    if(timer === 0) 
    {
        //To remove event:
        //game.time.events.remove(timerEvent);
        timer = 11;
        game.state.start('boot');
    } 
    else
    {
        countDownText.setText(timer);
    }
}

