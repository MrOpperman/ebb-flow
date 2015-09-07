var correctText;
var averageText;
var responseText;
var accuracyText;
var scoreText;

var winState = {
    create: function() {
        game.add.tileSprite(0, 0, 1000, 600, 'background');
        var nameLabel = game.add.text(400, 150, 'EBB & FLOW', { font: '60px Lato', fill: '#ffffff' });
        nameLabel.anchor.set(0.5);

        //var winLabel = game.add.text(80, 80, 'You got ' + playerScore + ' points!', { font: '50px Arial', fill: '#00FF00' });
       //var startLabel = game.add.text(80, game.world.height-80, 'press the "W" key to restart/', { font: '25px Arial'});

        getStats();
        
        var enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
        enterkey.onDown.addOnce(this.restart, this);
                
        button = game.add.button(400, 500, 'continue', this.restart, this);
        button.anchor.set(0.5);
    },
    
    restart: function () { 
        playerScore = 0;
        game.state.start('menu');   
    }
}

var getStats = function () {
    var sum = 0;
    var totalTries = correctCount + wrongCount;
    
    for (var i = 0; i < times.length; i++)
    {
        sum += parseFloat(times[i], 100);        
    }
    
    var avg = sum/times.length;    
    var accuracy = (correctCount / totalTries) * 100;
    
    scoreText  = game.add.text(400, 250, 'Score ' + playerScore, { font: '25px Lato', fill: '#ffffff' });
    scoreText.anchor.set(0.5);
    
    accuracyText  = game.add.text(400, 300, 'Accuracy ' + Math.round(accuracy) + '%', { font: '25px Lato', fill: '#ffffff' });
    accuracyText.anchor.set(0.5);
    
    responseText  = game.add.text(400, 350, 'Avg response time ' + Math.round(avg) + 'ms', { font: '25px Lato', fill: '#ffffff' });
    responseText.anchor.set(0.5);
    
    
};