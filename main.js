class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SplashScene' });
    }

    preload() {
        this.load.image('logo', './images/logo_sundrop.png');
        this.load.image('start_screen', './images/homescreen4.png');
    }

    create() {
        // First splash screen 
        this.cameras.main.setBackgroundColor('#000000'); 
        
        const logoWidth = this.cameras.main.width * 0.5;
        const logoHeight = this.cameras.main.height * 0.8; 

        let logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'logo')
        .setDisplaySize(400, 300);
        let title = this.add.text(this.cameras.main.centerX, logo.y + logo.displayHeight / 2 + 20, 'Sundrop Entertainment', {
            fontSize: '32px', color: '#FFFFFF' 
        }).setOrigin(0.5);

        // Show first splash for 1 second, then show the second splash screen
        this.time.delayedCall(2000, () => {
            this.showSecondSplashScreen();
        });
    }

    showSecondSplashScreen() {
        // Clear previous splash elements
        this.cameras.main.setBackgroundColor('#FFFFFF'); 
        this.children.removeAll();

        // Second splash screen content
        let startText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Click to Start!', { 
            fontSize: '32px', color: '#000000' 
        }).setOrigin(0.5);

        // Wait for user input to start the game
        this.input.on('pointerdown', () => {
            this.scene.start('GameScene'); // Transition to the main game scene
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
    }
    
    create() {
        this.add.image(0, 0, 'start_screen')
        .setOrigin(0)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height)
        this.add.text(100, 100, 'Game', { fontSize: '32px', color: '#ffffff' });
    }

    update() {
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [SplashScene, GameScene], 
    parent: 'phaser-container',
};

const game = new Phaser.Game(config);