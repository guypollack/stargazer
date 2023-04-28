class StartScene extends Phaser.Scene {
	constructor(){
		super({ key: 'StartScene' })
	}

	preload() {
	}


	create() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    gameState.titleText = this.add.text(screenCenterX, 200, "STARGAZER", { fontSize: 100, fontFamily: "Rubik Moonrocks, Chalkduster" }).setOrigin(0.5);
    gameState.byText = this.add.text(screenCenterX, 280, "by Guy Pollack", { fontSize: 24, fontFamily: "Rubik Moonrocks, Chalkduster" }).setOrigin(0.5);
    // gameState.clickText = this.add.text(screenCenterX, 500, "Click to play", { fontSize: 42, fontFamily: "Courier New" }).setOrigin(0.5);
    // this.tweens.add({
    //   targets: gameState.clickText,
    //   duration: 1000,
    //   scaleX: 1.05,
    //   scaleY: 1.05,
    //   yoyo: true,
    //   hold: 200,
    //   repeat: -1
    // })

    gameState.backgroundStars = this.add.group();

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

    gameState.tutorialButton = this.add.rectangle(screenCenterX, 400, 400, 50, 0x13102B).setOrigin(0.5);
    gameState.tutorialButton.strokeColor = 0xFFFFFF;
    gameState.tutorialButton.isStroked = true;
    gameState.tutorialButton.lineWidth = 2;
    gameState.tutorialText = this.add.text(screenCenterX, 400, "Instructions", { fontSize: 36, fontFamily: "Courier New" }).setOrigin(0.5);
    gameState.tutorialButton.setInteractive();

    gameState.tutorialButton.on("pointerover", () => {
      gameState.tutorialButton.fillColor = 0xFFFFFF;
      gameState.tutorialText.setColor("#13102B");
      game.canvas.style.cursor = "pointer";
    })
    gameState.tutorialButton.on("pointerup", () => {
      this.clearVariables()
      this.scene.stop("StartScene");
      this.scene.start("TutorialScene");
    })
    gameState.tutorialButton.on("pointerout", () => {
      gameState.tutorialButton.fillColor = 0x13102B;
      gameState.tutorialText.setColor("#FFFFFF");
      game.canvas.style.cursor = "default";
    })

    gameState.playButton = this.add.rectangle(screenCenterX, 500, 400, 50, 0x13102B).setOrigin(0.5);
    gameState.playButton.strokeColor = 0xFFFFFF;
    gameState.playButton.isStroked = true;
    gameState.playButton.lineWidth = 2;
    gameState.playText = this.add.text(screenCenterX, 500, "Play", { fontSize: 36, fontFamily: "Courier New" }).setOrigin(0.5);
    gameState.playButton.setInteractive();

    gameState.playButton.on("pointerover", () => {
      gameState.playButton.fillColor = 0xFFFFFF;
      gameState.playText.setColor("#13102B");
      game.canvas.style.cursor = "pointer";
    })
    gameState.playButton.on("pointerup", () => {
      this.clearVariables();
      this.scene.stop("StartScene");
      this.scene.start("GameScene");
    })
    gameState.playButton.on("pointerout", () => {
      gameState.playButton.fillColor = 0x13102B;
      gameState.playText.setColor("#FFFFFF");
      game.canvas.style.cursor = "default";
    })
    

    // gameState.clickText = this.add.text(screenCenterX, 500, "Click to play", { fontSize: 42, fontFamily: "Courier New" }).setOrigin(0.5);

    // this.input.on('pointerup', () => {
    //   gameState.titleText.destroy();
    //   gameState.byText.destroy();
    //   gameState.clickText.destroy();
    //   gameState.backgroundStars.clear(true);
    //   gameState.shootingStars.clear(true);
    //   console.log(gameState);
    //   // this.scene.stop("StartScene");
    //   // this.scene.start("TutorialScene");
    // })
    
	}

	update() {
  

	}

  clearVariables() {
    gameState.titleText.destroy();
    gameState.byText.destroy();
    // gameState.clickText.destroy();
    gameState.tutorialButton.destroy();
    gameState.tutorialText.destroy();
    gameState.playButton.destroy();
    gameState.playText.destroy();
    gameState.backgroundStars.clear(true);
    gameState.shootingStars.clear(true);
    gameState.shootingStarGenLoop.destroy();
    game.canvas.style.cursor = "default";
  }


}
