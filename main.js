const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets here, e.g., this.load.image('key', 'path/to/image.png');
}

function create() {
    showSplashScreen1();
    this.time.delayedCall(5000, showSplashScreen2, [], this);
}

function update() {
    // Game logic here if needed
}

function showSplashScreen1() {
    document.getElementById('splash1').style.display = 'flex';
    document.getElementById('splash2').style.display = 'none';
}

function showSplashScreen2() {
    document.getElementById('splash1').style.display = 'none';
    document.getElementById('splash2').style.display = 'flex';
}