var menuState = {
    create: function () {
        var nameLabel = game.add.text(80, 80, 'EBB & FLOW', { font: '60px Arial' });
        
        var startLabel = game.add.text(80, game.world.height - 80, 'Press the "W" key to start', { font: '25px Arial' });
            
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    
        wkey.onDown.addOnce(this.start, this)
    },
    
    start: function() {
        game.state.start('play');   
    }
    
}