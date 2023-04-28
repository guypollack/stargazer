class LoadingScene extends Phaser.Scene {
	constructor(){
		super({ key: 'LoadingScene' })
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

    gameState.backgroundStars = this.add.group();

    const BackgroundStarDataWhite = [
      '2'
    ];

    const BackgroundStarDataYellow = [
      '8'
    ];

    const BackgroundStarDataGrey = [
      '1'
    ];

    const counterBarData = [
      'BBB',
      'BAA',
      'BAA',
      'BAA',
      'BAA',
      'BAA',
      'BAA',
      'BAA'
    ];

    this.textures.generate('backgroundStarWhite', { data: BackgroundStarDataWhite, pixelWidth: 2 });
    this.textures.generate('backgroundStarYellow', { data: BackgroundStarDataYellow, pixelWidth: 2 });
    this.textures.generate('backgroundStarGrey', { data: BackgroundStarDataGrey, pixelWidth: 2 });
    this.textures.generate('counterBar', { data: counterBarData, pixelWidth: 2 });

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

		gameState.shootingStarGenLoop = this.time.addEvent({
			delay: 3000,
			callback: shootingStarGen,
			callbackScope: this,
			loop: true,
		});

    gameState.loadingText = this.add.text(screenCenterX, 350, "Loading", { fontSize: 42, fontFamily: "Courier New" }).setOrigin(0.5);
    gameState.loadingText.setDepth(2);
    gameState.loadingBarOutline = this.add.rectangle(screenCenterX, 400, 400, 30, 0x13102B, 1).setOrigin(0.5);
    gameState.loadingBarOutline.strokeColor = 0xFFFFFF;
    gameState.loadingBarOutline.isStroked = true;
    gameState.loadingBarOutline.lineWidth = 2;
    gameState.loadingBarOutline.setDepth(2);

    gameState.loadingBar = this.add.rectangle(screenCenterX - 198, 387, 0, 26, 0xFFFFFF, 1).setOrigin(0);
    gameState.loadingBar.setDepth(2);

    // this.input.on('pointerup', () => {
    //   gameState.titleText.destroy();
    //   gameState.byText.destroy();
    //   gameState.clickText.destroy();
    //   gameState.backgroundStars.clear(true);
    //   gameState.shootingStars.clear(true);
    //   this.scene.stop("StartScene");
    //   this.scene.start("TutorialScene");
    // })
    
	}

	update() {
    if (gameState.loadingBar.width < 396) {
      gameState.loadingBar.width += Math.random() * 2;
    } else {
      gameState.loadingText.destroy();
      gameState.loadingBarOutline.destroy();
      gameState.loadingBar.destroy();
      gameState.backgroundStars.clear(true);
      gameState.shootingStarGenLoop.destroy();
      this.scene.stop("LoadingScene");
      this.scene.start("StartScene");
    }
	}


}
