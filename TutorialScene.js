class TutorialScene extends Phaser.Scene {
	constructor(){
		super({ key: 'TutorialScene' })
	}

	preload() {
    this.load.image('star1', './star-1.png');
    this.load.image('star2', './star-2.png');
    this.load.image('star3', './star-3.png');
	}


	create() {

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

    gameState.backgroundStars = this.add.group();

    // const BackgroundStarDataWhite = [
    //   '2'
    // ];

    // this.textures.generate('backgroundStarWhite', { data: BackgroundStarDataWhite, pixelWidth: 2 });

    for (let i = 0; i < 1000; i++) {
      const randomXCoord = Math.random() * 900;
      const randomYCoord = Math.random() * 600;
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

    gameState.targetSquare = this.add.rectangle(400, 600, 100, 100, 0x000000).setOrigin(0);
    gameState.targetSquare.setDepth(3);
    gameState.stars = this.add.group();
    const starImage1 = this.add.image(100, 100, 'star1').setScale(0.5);
    gameState.stars.add(starImage1);
    const starImage2 = this.add.image(155, 120, 'star1').setScale(0.7);
    gameState.stars.add(starImage2);
    const starImage3 = this.add.image(130, 100, 'star2').setScale(0.5);
    gameState.stars.add(starImage3);
    const starImage4 = this.add.image(120, 160, 'star2').setScale(0.3);
    gameState.stars.add(starImage4);

    const starImage5 = this.add.image(420, 620, 'star1').setScale(0.5);
    starImage5.setDepth(3);
    gameState.stars.add(starImage5);
    const starImage6 = this.add.image(475, 640, 'star1').setScale(0.7);
    starImage6.setDepth(3);
    gameState.stars.add(starImage6);
    const starImage7 = this.add.image(450, 620, 'star2').setScale(0.5);
    starImage7.setDepth(3);
    gameState.stars.add(starImage7);
    const starImage8 = this.add.image(440, 680, 'star2').setScale(0.3);
    starImage8.setDepth(3);
    gameState.stars.add(starImage8);

    const starImage9 = this.add.image(500, 200, 'star3').setScale(0.5);
    gameState.stars.add(starImage9);
    const starImage10 = this.add.image(555, 300, 'star1').setScale(0.7);
    gameState.stars.add(starImage10);
    const starImage11 = this.add.image(520, 250, 'star2').setScale(0.5);
    gameState.stars.add(starImage11);
    const starImage12 = this.add.image(550, 250, 'star3').setScale(0.5);
    gameState.stars.add(starImage12);

    gameState.telescope = this.add.circle(450, 300, 90, 0xFFFFFF, 0);
    gameState.telescope.setDepth(2);
    gameState.telescope.strokeColor = 0x000000;
    // gameState.telescope.lineWidth = 1200;
    gameState.telescope.lineWidth = 20;
    gameState.telescope.isStroked = true;

    gameState.telescopeTopRect = this.add.rectangle(0, -370, 1300, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeTopRect.setDepth(2);
    gameState.telescopeBottomRect = this.add.rectangle(-400, 370, 1800, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeBottomRect.setDepth(2);
    gameState.telescopeLeftRect = this.add.rectangle(-520, -200, 900, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeLeftRect.setDepth(2);
    gameState.telescopeRightRect = this.add.rectangle(520, 0, 900, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeRightRect.setDepth(2);

    gameState.bottomBar = this.add.rectangle(0, 600, 900, 700, 0x13102B, 1).setOrigin(0);
    gameState.bottomBar.setDepth(2);

    gameState.instructionStep = 0;

    this.instructionsStep1();

    // setTimeout(() => {
    //   this.instructionsStep2();
    // }, 5000);

    // setTimeout(() => {
    //   this.instructionsStep3();
    // }, 10000);

    // setTimeout(() => {
    //   this.instructionsStep4();
    // }, 15000);

    
	}

	update() {
  

	}

  instructionsStep1() {
    gameState.instructionStep++;
    if (gameState.instructionStep !== 1) return;
    this.tweens.add({
      targets: [gameState.telescope, 
                gameState.telescopeTopRect, 
                gameState.telescopeBottomRect, 
                gameState.telescopeLeftRect, 
                gameState.telescopeRightRect],
      duration: 2000,
      x: "-= 350",
      y: "+= 200"
    })

    setTimeout(() => {
      gameState.instructionText = this.add.text(220, 480, "Use the mouse\nto move the telescope\nacross the sky", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.instructionText.setDepth(4);
    }, 2200)

    setTimeout(() => {
      gameState.promptText = this.add.text(220, 560, "Click to continue", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.promptText.setDepth(4);
      this.input.on("pointerup", () => {
        if (gameState.instructionStep === 1) {
          this.instructionsStep2();
        }
      })
    }, 3200)

  }

  instructionsStep2() {
    gameState.instructionStep++;
    if (gameState.instructionStep !== 2) return;
    gameState.instructionText.destroy();
    gameState.promptText.destroy();
    this.tweens.add({
      targets: [gameState.telescope, 
        gameState.telescopeTopRect, 
        gameState.telescopeBottomRect, 
        gameState.telescopeLeftRect, 
        gameState.telescopeRightRect],
      duration: 2000,
      x: "+= 600",
      y: "+= 0"
    })
    setTimeout(() => {
      gameState.instructionText = this.add.text(330, 480, "Search for the cluster\nof stars shown in\nthe target square", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.instructionText.setDepth(4);
    }, 2200)
    setTimeout(() => {
      gameState.targetSquare.strokeColor = 0xa7f66c;
      gameState.targetSquare.lineWidth = 3;
      gameState.targetSquare.isStroked = true;
    }, 3200)
    setTimeout(() => {
      gameState.promptText = this.add.text(330, 560, "Click to continue", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.promptText.setDepth(4);
      this.input.on("pointerup", () => {
        if (gameState.instructionStep === 2) {
          this.instructionsStep3();
        }
      })
    }, 4200)
  }

  instructionsStep3() {
    gameState.instructionStep++;
    if (gameState.instructionStep !== 3) return;
    gameState.instructionText.destroy();
    gameState.promptText.destroy();
    gameState.targetSquare.isStroked = false;
    this.tweens.add({
      targets: [gameState.telescope, 
        gameState.telescopeTopRect, 
        gameState.telescopeBottomRect, 
        gameState.telescopeLeftRect, 
        gameState.telescopeRightRect],
      duration: 2000,
      x: "-= 170",
      y: "-= 250"
    }) 
    setTimeout(() => {
      gameState.instructionText = this.add.text(650, 240, "Almost there!", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.instructionText.setDepth(4);
    }, 2200)
    setTimeout(() => {
      gameState.promptText = this.add.text(650, 280, "Click to continue", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.promptText.setDepth(4);
      this.input.on("pointerup", () => {
        if (gameState.instructionStep === 3) {
          this.instructionsStep4();
        }
      })
    }, 3200)
  }

  instructionsStep4() {
    gameState.instructionStep++;
    if (gameState.instructionStep !== 4) return;
    gameState.instructionText.destroy();
    gameState.promptText.destroy();
    this.tweens.add({
      targets: [gameState.telescope, 
        gameState.telescopeTopRect, 
        gameState.telescopeBottomRect, 
        gameState.telescopeLeftRect, 
        gameState.telescopeRightRect],
      duration: 2000,
      x: "-= 405",
      y: "-= 125"
    })
    setTimeout(() => {
      gameState.instructionText = this.add.text(250, 100, "Found it!", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.instructionText.setDepth(4);
    }, 2200)
    setTimeout(() => {
      gameState.promptText = this.add.text(250, 140, "Click to capture a\npicture of the cluster", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.promptText.setDepth(4);
      this.input.on("pointerup", () => {
        if (gameState.instructionStep === 4) {
          this.instructionsStep5();
        }
      })
    }, 3200)
  }

  instructionsStep5() {
    gameState.instructionStep++;
    if (gameState.instructionStep !== 5) return;
    gameState.instructionText.destroy();
    gameState.promptText.destroy();
    this.tweens.add({
      targets: gameState.telescope,
      lineWidth: 200,
      duration: 100,
      yoyo: true,
    })
    setTimeout(() => {
      gameState.instructionText = this.add.text(260, 100, "That's it!", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.instructionText.setDepth(4);
    }, 1000)
    setTimeout(() => {
      gameState.promptText = this.add.text(260, 140, "Click to start the game", { color: "white", fontSize: 18, fontFamily: "Courier New" });
      gameState.promptText.setDepth(4);
      this.input.on("pointerup", () => {
        if (gameState.instructionStep === 5) {
          gameState.backgroundStars.clear(true);
          gameState.byText.destroy();
          gameState.clickText.destroy();
          gameState.instructionStep = 0;
          gameState.instructionText.destroy();
          gameState.promptText.destroy();
          gameState.stars.clear(true);
          gameState.targetSquare.destroy();
          gameState.telescope.destroy();
          gameState.telescopeTopRect.destroy();
          gameState.telescopeBottomRect.destroy();
          gameState.telescopeLeftRect.destroy();
          gameState.telescopeRightRect.destroy();
          gameState.bottomBar.destroy();
          gameState.titleText.destroy();
          this.scene.stop("TutorialScene");
          this.scene.start("GameScene");
        }
      })
    }, 2000)
  }


}
