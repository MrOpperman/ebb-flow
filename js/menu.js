var button;

var menuState = {
    create: function () {
        game.add.tileSprite(0, 0, 1000, 600, 'background');
        var nameLabel = game.add.text(80, 80, 'EBB & FLOW', { font: '60px Arial' });
        
        //var startLabel = game.add.text(80, game.world.height - 80, 'Press the Enter to start', { font: '25px Arial' });
            
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
        wkey.onDown.addOnce(this.start, this);
        
        button = game.add.button(400, 500, 'play', this.start, this);
        button.anchor.set(0.5);
    },
    
    start: function() {
        // bit of a hack ...
        button = game.add.button(400, 500, 'play_press');
        button.anchor.set(0.5);
        game.state.start('play');   
    }
        
}