var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#ffffff' });
        
        game.load.spritesheet('blueFish', 'assets/spritealivefish.png', 200, 100, 12);
        game.load.image('fish1', 'assets/sprites1.png');
        game.load.image('fish2', 'assets/sprites2.png');
        
        game.stage.backgroundColor = '#ffffff' 
        game.load.image("background", 'assets/background.jpg'); 
    },
    
    create: function() { 
        game.state.start('menu');
    }
}