class StartScene extends Phaser.Scene {
	constructor(){
		super({ key: 'StartScene' })
	}

	preload() {
    this.load.image('shootingStar', './shooting-star.png');
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
	}


	create() {
    WebFont.load({
      google: {
          families: [ 'Rubik Moonrocks' ]
      }
    });

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    gameState.titleText = this.add.text(screenCenterX, 200, "STARGAZER", { fontSize: 100, fontFamily: "Rubik Moonrocks, Chalkduster" }).setOrigin(0.5);
    gameState.byText = this.add.text(screenCenterX, 280, "by Guy Pollack", { fontSize: 24, fontFamily: "Rubik Moonrocks, Chalkduster" }).setOrigin(0.5);
    gameState.clickText = this.add.text(screenCenterX, 500, "Click to play", { fontSize: 42, fontFamily: "Courier New" }).setOrigin(0.5);
    this.tweens.add({
      targets: gameState.clickText,
      duration: 1000,
      scaleX: 1.05,
      scaleY: 1.05,
      yoyo: true,
      hold: 200,
      repeat: -1
    })

    gameState.backgroundStars = this.add.group();

    const BackgroundStarDataWhite = [
      '2'
    ];

    this.textures.generate('backgroundStarWhite', { data: BackgroundStarDataWhite, pixelWidth: 2 });

    for (let i = 0; i < 1000; i++) {
      const randomXCoord = Math.random() * 900;
      const randomYCoord = Math.random() * 700;
      const backgroundStar = this.add.image(randomXCoord, randomYCoord, 'backgroundStarWhite');
      this.tweens.add({
        targets: backgroundStar,
        duration: Math.random() * 1000 + 500,
        alpha: 0.5,
        repeat: -1,
        yoyo: true
      });
      gameState.backgroundStars.add(backgroundStar);
    }

    gameState.shootingStars = this.physics.add.group();

		const shootingStarGen = () => {
			const xCoord = Math.random() * 900;
      let shootingStar;
      if (Math.random() > 0.5) {
        shootingStar = gameState.shootingStars.create(xCoord, 10, 'shootingStar').setScale(0.2).setGravity(-2000,2000);
      } else {
        shootingStar = gameState.shootingStars.create(xCoord, 10, 'shootingStar').setScale(0.2).setGravity(2000,2000);
        shootingStar.flipX = true;
      }
      
      this.tweens.add({
        targets: shootingStar,
        duration: 1000,
        scaleX: 1.05,
        scaleY: 1.05,
      });
      setTimeout(() => {
        shootingStar.destroy();
      }, 3000)
		}

		const shootingStarGenLoop = this.time.addEvent({
			delay: 3000,
			callback: shootingStarGen,
			callbackScope: this,
			loop: true,
		});

    this.input.on('pointerup', () => {
      gameState.titleText.destroy();
      gameState.byText.destroy();
      gameState.clickText.destroy();
      gameState.backgroundStars.clear(true);
      gameState.shootingStars.clear(true);
      this.scene.stop("StartScene");
      this.scene.start("TutorialScene");
    })
    
	}

	update() {
  

	}


}
