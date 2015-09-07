// Mission Sunset - Palms

var enemies;
var movement_direction = [50, -50];
var timer = 60;
var countDownText;
var timerEvent;
var counter = 0;
var playerScore = 0;
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

var clam;

var times = [];
var timemsEvent;

var time = 0,
    actionTime;

var timeSinceChange;

var playerTimer;
var correctCount = 0,
    wrongCount = 0;

var tally = 0;
var multiplier = 1,
    multiplierText;

var playState = {
    create: function() {
        game.add.tileSprite(0, 0, 1000, 600, 'background');
        timer = 10;
        tally = 0;
        multiplier = 1;
        timerEvent = this.time.events.loop(Phaser.Timer.SECOND, updateTimer);
        correctCount = 0; 
        wrongCount = 0;
        times = [];

        enemies = game.add.group();
        
        pointingWhite = this.add.sprite(250, 560, 'pointingWhite');
        movingWhite = this.add.sprite(390, 560, 'movingWhite');
        
        pointingFilled = this.add.sprite(250, 560, 'pointingFilled');
        pointingFilled.visible = false;
        
        movingFilled = this.add.sprite(390, 560, 'movingFilled');        
        movingFilled.visible = false;
        
        createFish();
        
        pass = this.add.sprite(400, 300, 'correct');
        pass.visible = false;
        pass.anchor.set(0.5);
        
        fail = this.add.sprite(400, 300, 'wrong');
        fail.visible = false;
        fail.anchor.set(0.5);
        
        correct = game.add.audio('correct');
        wrong = game.add.audio('wrong');
        game_end = game.add.audio('end');
         
        timerOverlay = this.add.sprite(356, 0, 'timeOverlay');
        scoreOverlay = this.add.sprite(478, 0, 'scoreOverlay');
        multiplierOverlay = this.add.sprite(650, 0, 'bonusOverlay');
        
        clam = this.add.sprite(660 , 10 ,'clam');
                
        countDownText = this.add.text(370, 7, "TIME " + timer, { font: "18px Arial", fill: "#182c3e"});
        counterText = this.add.text(500, 7, "SCORE " + counter, { font: "18px Arial", fill: "#182c3e"});
        multiplierText = this.add.text(740, 7, "x" + multiplier, { font: "18px Arial", fill: "#182c3e"});
        
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

    enemies.callAll('animations.play', 'animations', 'spin'); 
    
    time = new Date().getTime();

};

function testKey (key) {
    var enemy = enemies.children[0];
    var position = enemy.position;
    var previous_position = enemy.previousPosition;
    function passed () {
        pass.visible = true;
        correct.play();
        correctCount++;
        actionTime = new Date().getTime();
        playerTimePass();
        setTimeout(function () {
            pass.visible = false;
        }, 200);  
    };
    
    function failed() {
        fail.visible = true;
        wrong.play();
        wrongCount++;
        actionTime = new Date().getTime();
        playerTimeFail();
        setTimeout(function () {
            fail.visible = false;
        }, 200);
    };
    
    switch(key) {
        case 'left': 
            if (  position.x < previous_position.x && position.y == previous_position.y)
            {
                passed();
            }
            else
                failed();
            break;
        case 'right':
            if (  position.x > previous_position.x && position.y == previous_position.y)
            {
                passed();
            }
            else
                failed();
            break;
        case 'up':
            if (  position.y < previous_position.y )
            {
                passed();
            }
            else
                failed();
            break;
        case 'down':
            if (  position.y > previous_position.y )
            {
                passed();
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
    var directions = [0, 90];
    var randomRotationX = randomRotation[Math.floor(Math.random() * randomRotation.length)];
    var randomRotationY = randomRotation[Math.floor(Math.random() * randomRotation.length)];
    var randomDirection = directions[Math.floor(Math.random() * directions.length)];
    
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
                enemy.angle = randomDirection;
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
                enemy.angle = randomDirection;
                enemy.scale.x = randomRotationX;
                enemy.scale.y = randomRotationY;
            }
        }
    }    
};

function updateScore (timeTaken) {
    var newScore = multiplier * 1000 - (timeTaken * multiplier);
    
    if (newScore < 0)
        playerScore = playerScore + 0;
    else
        playerScore = playerScore + newScore;
    
    counterText.setText("SCORE " + playerScore);
};

function playerTimePass () {
    var timeTaken = actionTime - time;
    times.push(timeTaken);
    increaseMultiplier(timeTaken);
};

function playerTimeFail () {
    var timeTaken = actionTime - time;
    times.push(timeTaken);
    reduceMultiplier();
};

function reduceMultiplier() {
    if (tally == 0 && multiplier == 1)
    {
    // do nonthing
    }
    else if (tally == 0 && multiplier > 1)
    {
        multiplier--;
        tally = 4;
    }
    else
    {
        tally--;        
    }
    
    setMultiplier();
};

function increaseMultiplier (timeTaken) {

    if (tally == 4)
    {
        tally = 0;
        multiplier++;        
    }
    else
        tally++;

    setMultiplier();
    updateScore(timeTaken);
};

function setMultiplier () {
    clam.kill();
    
    if (tally == 0)
        clam = game.add.sprite(660 , 10 ,'clam');  
    if (tally == 1)
        clam = game.add.sprite(660 , 10 ,'clam1');   
    if (tally == 2)
        clam = game.add.sprite(660 , 10 ,'clam2');
    if (tally == 3)
        clam = game.add.sprite(660 , 10 ,'clam3');
    if (tally == 4)
        clam = game.add.sprite(660 , 10 ,'clam4');
    
    multiplierText.setText("x" + multiplier);
};

function updateTimer() {
    timer -= 1;
    
    if(timer === 0) 
        game.state.start('win');
    else
        countDownText.setText("TIME " + timer);
    
    if (timer == 3)
        game_end.play();
}

function updateCounter() {
    counter++;
    counterText.setText("SCORE " + counter);
}
