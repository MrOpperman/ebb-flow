var button;

var menuState = {
    create: function () {
        game.add.tileSprite(0, 0, 1000, 600, 'background');
        var nameLabel = game.add.text(400, 150, 'EBB & FLOW', { font: '60px Lato', fill: '#ffffff' });
        nameLabel.anchor.set(0.5);
        
        var label2 = game.add.text(400, 200, 'of life', { font: '40px Lato', fill: '#ffffff'});
        label2.anchor.set(0.5);
        
        var fish1 = this.add.sprite(150, 250, 'fish1');
        var fish2 = this.add.sprite(650, 250, 'fish2');
        fish2.scale.x = -1;
        var enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
        enterkey.onDown.addOnce(this.start, this);
        
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