// Mission Sunset - Palms

var enemies;
var movement_direction = [50, -50];
var timer = 60;
var countDownText;
var timerEvent;
var counter = 0;
var counterText;
var pass;
var fail;
var correct;
var wrong;
var game_end;

var pointingWhite,
    pointingFilled;

var movingWhite,
    movingFilled;

var scoreOverlay,
    multiplierOverlay,
    timerOverlay;

var scoreText,
    multiplierText,
    timerText;

var playState = {
    create: function() {
        game.add.tileSprite(0, 0, 1000, 600, 'background');
        timer = 60;
        timerEvent = this.time.events.loop(Phaser.Timer.SECOND, updateTimer);
        
        pointingWhite = this.add.sprite(230, 555, 'pointingWhite');
        movingWhite = this.add.sprite(370, 555, 'movingWhite');        
        
        pointingFilled = this.add.sprite(230, 555, 'pointingFilled');
        pointingFilled.visible = false;
        
        movingFilled = this.add.sprite(370, 555, 'movingFilled');        
        movingFilled.visible = false;
        
        pass = this.add.sprite(400, 300, 'correct');        
        pass.visible = false;
        pass.anchor.set(0.5);
        
        fail = this.add.sprite(400, 300, 'wrong');        
        fail.visible = false;
        fail.anchor.set(0.5);
        
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');
        game_end = game.add.audio('end');
        
        enemies = game.add.group();

        createFish();
        
        timerOverlay = this.add.sprite(360, 5, 'overlay');
        scoreOverlay = this.add.sprite(505, 5, 'overlay');
        multiplierOverlay = this.add.sprite(650, 5, 'overlay');
        
        countDownText = this.add.text(370, 5, timer, { font: "18px Arial", fill: "#000000"});
        counterText = this.add.text(100, 0, counter, { font: "65px Arial", fill: "#ff0044"});
        
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
            this.world.wrap( enemy, enemy.width / 2, true );            
        }        
    },
    
    Win: function() {
        counter++;
        game.state.start('play');
        //console.log(counter);
    }
}


function createFish() {     
    enemies.children = [];
    var fishOptions = ['blueFish', 'pinkFish']
    var fish = fishOptions[Math.floor(Math.random() * fishOptions.length)];
    
    for (var i = 0; i < 6; i++)
    {
        enemies.create(120 * i, game.rnd.integerInRange(100, 400), fish);    
    }
    
            
    for (var i = 0; i < enemies.children.length; i++)
    {
        var enemy = enemies.children[i];

        enemy.animations.add('walk');
        //enemy.animations.play('walk', 20, true);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        
        if (fish == 'pinkFish')
        {
            // get a nicer way to toggle;
            
            movingWhite.visible = false;
            movingFilled.visible = true;
            pointingWhite.visible = true;
            pointingFilled.visible = false;
            
            enemy.setRotation = false;            
        }
        else
        {
            movingWhite.visible = true;
            movingFilled.visible = false;
            pointingWhite.visible = false;
            pointingFilled.visible = true;
            
            enemy.setRotation = true;
        }
    }
            
    enemies.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 50, false);
        
};

function testKey (key) {
    var enemy = enemies.children[0];
    var position = enemy.position;
    var previous_position = enemy.previousPosition;
    function passed () {
        pass.visible = true;
        correct.play();
        setTimeout(function () {
            pass.visible = false;
        }, 200);  
    };
    
    function failed() {
        fail.visible = true;
        wrong.play();
        setTimeout(function () {
            fail.visible = false;
        }, 200);
    };
    
    switch(key) {
        case 'left': 
            if (  position.x < previous_position.x && position.y == previous_position.y)
            {
                passed();
                updateCounter(game);
            }
            else
                failed();
            break;
        case 'right':
            if (  position.x > previous_position.x && position.y == previous_position.y)
            {
                passed();
                updateCounter(game);
            }
            else
                failed();
            break;
        case 'up':
            if (  position.y < previous_position.y )
            {
                passed();
                updateCounter(game);
            }
            else
                failed();
            break;
        case 'down':
            if (  position.y > previous_position.y )
            {
                passed();
                updateCounter(game);
            }
            else
                failed();
            break;
    }
    
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
    var randomRotation = [-1, 1];
    var randomRotationX = randomRotation[Math.floor(Math.random() * randomRotation.length)];
    var randomRotationY = randomRotation[Math.floor(Math.random() * randomRotation.length)];
    createFish();
    
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
            
            if (enemy.setRotation)
            {
                if (direction == -50)
                    enemy.scale.x = 1;
                else
                    enemy.scale.x = -1;
            }
            else
            {
                enemy.scale.x = randomRotationX;
                enemy.scale.y = randomRotationY;
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
            if (enemy.setRotation)
            {
                if (direction == -50)
                    enemy.scale.x = -1;
                else
                    enemy.scale.x = 1;
            }
            else
            {
                enemy.scale.x = randomRotationX;
                enemy.scale.y = randomRotationY;
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
    
    if (timer == 3)
    {
        game_end.play();
        // play sound   
    }
}

function updateCounter() {
    counter++;
    counterText.setText(counter);
}
