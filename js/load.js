var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#ffffff' });
        
        game.load.spritesheet('mummy', 'assets/metalslug_mummy.png', 37, 45, 18);
    },
    
    create: function() { 
        game.state.start('menu');
    }
}