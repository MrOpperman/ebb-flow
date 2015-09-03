var winState = {
    create: function() {
        var winLabel = game.add.text(80, 80, 'You got ' + playerScore + ' points!', { font: '50px Arial', fill: '#00FF00' });
        var startLabel = game.add.text(80, game.world.height-80, 'press the "W" key to restart/', { font: '25px Arial'});
        
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        
        wkey.onDown.addOnce(this.restart, this);
        
        console.log(times, times.length, correctCount, wrongCount);
    },
    
    restart: function () { 
        playerScore = 0;
        game.state.start('menu');   
    }
}