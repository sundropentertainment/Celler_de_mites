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
        
        const maxlogoWidth = this.cameras.main.width * 0.5;
        const maxlogoHeight = this.cameras.main.height * 0.8; 

        const logo = this.textures.get('logo');
        const aspectRatio = logo.getSourceImage().width / logo.getSourceImage().height;

        let logoImage = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'logo')
        .setDisplaySize(400, 300);
        const baseFontSize =50; 
        const scalingFactor = Math.min(this.cameras.main.width / 1920, 1);
        const responsiveFontSize = baseFontSize * scalingFactor;

        let titleY = logoImage.y + logoImage.displayHeight / 2 + 20; // 20 pixels below the logo

        let title = this.add.text(this.cameras.main.centerX, titleY, 'Sundrop Entertainment', {
            fontSize: `${responsiveFontSize}px`, 
            color: '#FFFFFF'
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
            this.scene.start('NameInputScene'); // Transition to the name input game scene
        });
    }
}


    class NameInputScene extends Phaser.Scene {
        constructor() {
            super({ key: 'NameInputScene' });
        }
    
        create() {
          // Set background color
        this.cameras.main.setBackgroundColor('#FFFFFF');

        // Add the prompt text
       const promptText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 200, "Com et dius?", { 
            fontSize: '32px', color: '#000000' 
        }).setOrigin(0.5);

        // Create a text input field
        const inputElement = document.createElement('input');
        inputElement.style.position = 'fixed';
        inputElement.style.left = '50%'; // Center horizontally
        inputElement.style.top = '50%'; // Position above the button
        inputElement.style.transform = 'translate(-50%, -100%)'; // Center it above the accept button
        inputElement.style.fontSize = '32px';
        inputElement.style.color = '#000000';
        inputElement.style.backgroundColor = '#ffffff';
        inputElement.style.border = '2px solid #000000';
        inputElement.style.borderRadius = '5px';
        inputElement.placeholder = 'Enter your name';
        document.body.appendChild(inputElement);
        inputElement.focus();

        const adjustPositions = () => {
            const inputHeight = inputElement.offsetHeight;
            promptText.setPosition(this.cameras.main.centerX, this.cameras.main.centerY - (inputHeight + 20)); // 20 pixels gap
        };

        window.addEventListener('resize', adjustPositions);

        // Add an accept button
        const acceptButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, 'Accept', { 
            fontSize: '32px', color: 'red' 
        }).setOrigin(0.5).setInteractive();

        acceptButton.on('pointerdown', () => {
            const name = inputElement.value;
            document.body.removeChild(inputElement); // Remove input element

            // Transition to the confirmation scene
            this.scene.start('ConfirmationScene', { name: name });
        });
    }
}
    
    class ConfirmationScene extends Phaser.Scene {
        constructor() {
            super({ key: 'ConfirmationScene' });
        }
    
        create(data) {
            const name = data.name;
            
            this.cameras.main.setBackgroundColor('#FFFFFF');

            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 50, `Your name: ${name}`, { 
                fontSize: '32px', color: 'red' 
            }).setOrigin(0.5);
    
            const confirmText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'És correcte?', { 
                fontSize: '32px', color: 'red' 
            }).setOrigin(0.5);
    
           // Create "Yes" button
           const yesButton = this.add.text(this.cameras.main.centerX - 50, this.cameras.main.centerY + 100, 'Yes', { 
            fontSize: '32px', color: 'green' 
        }).setOrigin(0.5).setInteractive();

        // Create "No" button
        const noButton = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY + 100, 'No', { 
            fontSize: '32px', color: 'red' 
        }).setOrigin(0.5).setInteractive();

        // Yes button click event
        yesButton.on('pointerdown', () => {
            this.scene.start('GameScene', { name: name });
        });

        // No button click event
        noButton.on('pointerdown', () => {
            this.scene.start('NameInputScene');
        });
    }
}

    class GameScene extends Phaser.Scene {
        constructor() {
            super({ key: 'GameScene' });
        }
    
        preload() {
            this.load.image('start_screen', './images/homescreen4.png'); // Ensure this is loaded
        }
        
        create(data) {
            // Add the background image
            this.add.image(0, 0, 'start_screen')
                .setOrigin(0)
                .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
            // Display the name received from the previous scene
            this.add.text(100, 100, `Welcome, ${data.name}!`, { fontSize: '32px', color: '#ffffff' });
    
            // Here you can add more game elements as needed
        }
    
        update() {
        }
    }
    
    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        dom: {
            createContainer: true
        },
        scale:{
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        parent: "phaser-container",
        scene: [SplashScene, NameInputScene, ConfirmationScene, GameScene], 
    };
    
    const game = new Phaser.Game(config);
    