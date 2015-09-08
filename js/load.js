var loadState = {
    preload: function() {
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Courier', fill: '#ffffff' });
        
        game.load.spritesheet('blueFish', 'assets/spritealivefish.png', 200, 100, 12);
        game.load.spritesheet('pinkFish', 'assets/spritespinkfish.png', 200, 100, 12);
        game.load.image('fish1', 'assets/sprites1.png');
        game.load.image('fish2', 'assets/sprites2.png');
        game.load.image('correct', 'assets/correct.png');
        game.load.image('wrong', 'assets/wrong.png');
        
        game.load.image('pointingWhite', 'assets/pointing1.png');
        game.load.image('pointingFilled', 'assets/pointing2.png');
        game.load.image('movingWhite', 'assets/moving1.png');
        game.load.image('movingFilled', 'assets/moving2.png');
        
        game.load.image('overlay', 'assets/transparent_overlay.png');
        game.load.image('scoreOverlay', 'assets/score.png');
        game.load.image('bonusOverlay', 'assets/bonus.png');
        game.load.image('timeOverlay', 'assets/time.png');
        
        game.load.image('clam', 'assets/clam.png');
        game.load.image('clam1', 'assets/clam1.png');
        game.load.image('clam2', 'assets/clam2.png');
        game.load.image('clam3', 'assets/clam3.png');
        game.load.image('clam4', 'assets/clam4.png');
        
        game.load.image('play', 'assets/play_btn_normal.png');
        game.load.image('play_press', 'assets/play_btn_press.png');
                
        game.load.image('continue', 'assets/continue_btn_normal.png');
        game.load.image('continue_press', 'assets/continue_btn_press.png');
        
        game.stage.backgroundColor = '#ffffff' 
        game.load.image("background", 'assets/background.jpg'); 
        
        
        game.load.audio('correct', [ 'assets/correct.wav' ]);
        game.load.audio('wrong', [ 'assets/wrong.wav' ]);
        game.load.audio('end', [ 'assets/game_end.mp3' ]);


    },
    
    create: function() { 
        game.state.start('menu');
    }
}