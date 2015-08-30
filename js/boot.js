var bootState = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ADCADE);
        
        game.state.start('load');
    }
};