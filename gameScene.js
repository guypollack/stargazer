class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
		this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png');
		this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png');
		this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png');
		this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png');
		this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
    this.load.image('star', './star.png');
    this.load.image('star1', './star-1.png');
    this.load.image('star2', './star-2.png');
    this.load.image('star3', './star-3.png');
    this.load.image('star4', './star-4.png');
    this.load.image('star5', './star-5.png');
    this.load.image('shootingStar', './shooting-star.png');
    this.load.image('ufo', './ufo-test.png');
	}


	create() {

    this.time.desiredFps = 10;

    game.canvas.style.cursor = "none";

    gameState.bgColors = {
      0: 0x13102B,
      1: 0x15152D,
      2: 0x181435,
      3: 0x1C183D,
      4: 0x1E1B46,
      5: 0x231F52
    }

    gameState.backgroundStarColors = [0xFCFEDD, 0xFDFCAD];
    gameState.backgroundStarTweens = [];

    gameState.starImages = ["star1","star2","star3","star4","star5"];
    gameState.starTweens = [];

    gameState.isTakingPicture = false;
    gameState.shootingStarTweens = [];

    gameState.ufoTweens = [];

    gameState.telescopeTweens = [];

    gameState.pointerXPos = 0;
    gameState.pointerYPos = 0;

    gameState.shootingStarDetectionEnabled = true;
    gameState.ufoDetectionEnabled = true;

    gameState.canvasWidth = document.querySelector("canvas").offsetWidth;
    gameState.canvasHeight = document.querySelector("canvas").offsetHeight;

    gameState.backgroundTiles = this.add.group();
    // const testRect = this.add.rectangle(0,0, 150, 150, 0xff0000)
    // gameState.backgroundTiles.add(testRect);
    let num = 0;
    for (let i = 0; i < 900; i += 100) {
      for (let j = 0; j < 600; j += 100) {
        // const bgColor = gameState.bgColors[j / 100];
        const bgColor = gameState.bgColors[0];
        const tile = this.add.rectangle(i, j, 100, 100, bgColor).setOrigin(0);
        tile.strokeColor = 0xa7f66c;
        // tile.isStroked = true;
        tile.lineWidth = 2
        tile.column = i / 100;
        tile.row = j / 100;
        tile.number = ((i * 6 + j) / 100);
        tile.found = false;
        tile.setInteractive();
        tile.on('pointerup', () => {
          if (!gameState.isTakingPicture) {
            gameState.isTakingPicture = true;
            gameState.telescopeTweens.push(this.add.tween({
              targets: gameState.telescope,
              lineWidth: 200,
              duration: 100,
              yoyo: true,
              onComplete: () => {
                gameState.isTakingPicture = false;
              }
            }));
          }
          
          if (tile.number === gameState.target.number) {
            // alert("You win!");
            setTimeout(() => {
              this.markCorrect(tile.number);
            }, 200)
            if (this.isGameFinished()) {

              setTimeout(() => {
                alert("You win!");
              }, 200);

            } else {
              this.pickTarget(); 
            }
          }
        })
        gameState.backgroundTiles.add(tile);
      }
    }

    console.log(gameState.backgroundTiles);

    gameState.boundaries = this.add.group();
    const leftBoundary = this.add.rectangle(0,0,1,600,0xa7f66c).setOrigin(0);
    this.physics.add.existing(leftBoundary);
    leftBoundary.body.setGravity(0,-200);
    const bottomBoundary = this.add.rectangle(0,600,900,1,0xa7f66c).setOrigin(0);
    this.physics.add.existing(bottomBoundary);
    bottomBoundary.body.setGravity(0,-200);
    const rightBoundary = this.add.rectangle(899,0,1,600,0xa7f66c).setOrigin(0);
    this.physics.add.existing(rightBoundary);
    rightBoundary.body.setGravity(0,-200);
    gameState.boundaries.add(leftBoundary);
    gameState.boundaries.add(bottomBoundary);
    gameState.boundaries.add(rightBoundary);
    
    // gameState.backgroundTiles.children.entries[0].y = 600;
    const randNumber = Math.floor(Math.random() * gameState.backgroundTiles.children.entries.length);
    // gameState.backgroundTiles.children.entries[randNumber].y = 600;

    // gameState.stars = this.add.group();

    gameState.backgroundStars = this.add.group();

    for (let i = 0; i < 1000; i++) {
      const randomXCoord = Math.random() * 900;
      const randomYCoord = Math.random() * 600;
      const backgroundStarColor = gameState.backgroundStarColors[Math.floor(Math.random() * 2)];
      const backgroundStar = this.add.rectangle(randomXCoord, randomYCoord, 2, 2, backgroundStarColor);
      gameState.backgroundStars.add(backgroundStar);
      gameState.backgroundStarTweens.push(this.tweens.add({
        targets: backgroundStar,
        duration: Math.random() * 1000 + 500,
        alpha: 0.5,
        repeat: -1,
        yoyo: true
      }));
    }


    for (let i = 0; i < gameState.backgroundTiles.children.entries.length; i++) {
      gameState.backgroundTiles.children.entries[i].stars = this.add.group();
      gameState.backgroundTiles.children.entries[i].starCircles = this.add.group();
      for (let j = 0; j < 4; j++) {
        const xOrigin = gameState.backgroundTiles.children.entries[i].x;
        const yOrigin = gameState.backgroundTiles.children.entries[i].y;
        const xCoord = xOrigin +  Math.random() * 85 + 5;
        const yCoord = yOrigin + Math.random() * 85 + 5;
        const starImage = gameState.starImages[Math.floor(Math.random() * gameState.starImages.length)];
        const starScale = (Math.random() * 0.3) + 0.3;
        const star = this.add.image(xCoord, yCoord, starImage).setScale(starScale);
        gameState.starTweens.push(this.tweens.add({
          targets: star,
          duration: Math.random() * 3000 + 1000,
          alpha: 0.5,
          repeat: -1,
          yoyo: true
        }));
        gameState.backgroundTiles.children.entries[i].stars.add(star);
        const starCircle = this.add.circle(star.x, star.y, star.width * star._scaleX, 0x19fa4d, 0.3);
        starCircle.visible = false;
        gameState.backgroundTiles.children.entries[i].starCircles.add(starCircle);
        // gameState.backgroundTiles.children.entries[i].stars.add(starCircle);
        // if (i > 1) {
        //   this.markCorrect(i);
        // }
        // if (Math.random() > 0.9) {
        //   this.markCorrect(i);
        // }
      }
      // console.log(tile);

    }

    // console.log(gameState.stars);
    // gameState.telescope = this.add.circle(450, 300, 700, 0xFFFFFF, 0);
    gameState.telescope = this.add.circle(450, 300, 90, 0xFFFFFF, 0);
    gameState.telescope.setDepth(2);
    gameState.telescope.strokeColor = 0x000000;
    // gameState.telescope.lineWidth = 1200;
    gameState.telescope.lineWidth = 20;
    gameState.telescope.isStroked = true;
    this.physics.add.existing(gameState.telescope);
    // gameState.telescope.body.setGravity(500,0);
    gameState.telescope.body.setGravity(0,-200);
    // gameState.telescope.body.bounce.x = 1;
    // gameState.telescope.body.bounce.y = 1;
    // gameState.telescope.body.collideWorldBounds = true;

    gameState.telescopeTopRect = this.add.rectangle(0, -370, 900, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeTopRect.setDepth(2);
    gameState.telescopeBottomRect = this.add.rectangle(0, 370, 900, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeBottomRect.setDepth(2);
    gameState.telescopeLeftRect = this.add.rectangle(-520, 0, 900, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeLeftRect.setDepth(2);
    gameState.telescopeRightRect = this.add.rectangle(520, 0, 900, 600, 0x000000, 1).setOrigin(0);
    gameState.telescopeRightRect.setDepth(2);

    this.input.on("pointermove", (pointer) => {
      if (pointer.y <= 600) {
        this.moveTelescopeToPointer();
      }
    })

    // gameState.telescope.setAlpha(0);
    // gameState.telescopeTopRect.setAlpha(0);
    // gameState.telescopeBottomRect.setAlpha(0);
    // gameState.telescopeLeftRect.setAlpha(0);
    // gameState.telescopeRightRect.setAlpha(0);

    gameState.bottomBar = this.add.rectangle(0, 600, 900, 700, 0x13102B, 1).setOrigin(0);
    gameState.bottomBar.setDepth(2);


    // const r1 = this.add.rectangle(200, 150, 148, 148, 0x6666ff);
    // const r2 = this.add.rectangle(400, 150, 148, 148, 0x9966ff).setStrokeStyle(4, 0xefc53f);

    // this.physics.add.existing(r1);
    // this.physics.add.existing(r2);

    // r1.body.bounce.x = 1;
    // r1.body.bounce.y = 1;
    // r1.body.setGravity(200,0);
    // r1.body.collideWorldBounds = true;

    // this.physics.add.collider(gameState.telescope, r1, () => {
    //   console.log("bang");
    // })

    // r2.body.bounce.x = 1;
    // r2.body.bounce.y = 1;
    // r2.body.collideWorldBounds = true;

		gameState.shootingStars = this.physics.add.group();

		const shootingStarGen = () => {
			const xCoord = Math.random() * 900;
      // const shootingStar = gameState.shootingStars.create(xCoord, 10, 'shootingStar').setScale(0.2).setGravity(-200,-100);
      const shootingStar = gameState.shootingStars.create(xCoord, 10, 'shootingStar').setScale(0.2).setGravity(-2000,2000);
      gameState.shootingStarTweens.push(this.add.tween({
        targets: shootingStar,
        duration: 1000,
        scaleX: 1.05,
        scaleY: 1.05,
      }));
      // shootingStar.body.bounce.x = 1;
      // shootingStar.body.bounce.y = 1;
      // shootingStar.body.collideWorldBounds = true;
		}

		const shootingStarGenLoop = this.time.addEvent({
			delay: 5000,
			callback: shootingStarGen,
			callbackScope: this,
			loop: true,
		});

    gameState.ufos = this.physics.add.group();

		const ufoGen = () => {
			const yCoord = Math.random() * 400 + 50;
      // const shootingStar = gameState.shootingStars.create(xCoord, 10, 'shootingStar').setScale(0.2).setGravity(-200,-100);
      const ufo = gameState.ufos.create(-10, yCoord, 'ufo').setScale(0.1).setGravity(0,-200);
      gameState.ufoTweens.push(this.add.tween({
        targets: ufo,
        duration: 3000,
        x: 1000
      }));
      gameState.ufoTweens.push(this.add.tween({
        targets: ufo,
        delay: Math.random() * 100,
        duration: 200,
        y: "+=100",
        yoyo: true,
        hold: 500,
        repeat: 5,
        repeatDelay: 500
      }));
		}

    const ufoGenLoop = this.time.addEvent({
			delay: Math.random() * 10000 + 20000,
			callback: ufoGen,
			callbackScope: this,
			loop: true,
		});

    this.physics.add.overlap(gameState.boundaries, gameState.shootingStars, (boundary, shootingStar) => {
      shootingStar.destroy();
    })

    this.physics.add.overlap(gameState.telescope, gameState.shootingStars, () => {
      if (gameState.shootingStarDetectionEnabled) {
        console.log("Shooting star sighted");
        gameState.shootingStarDetectionEnabled = false;
        setTimeout(() => {
          gameState.shootingStarDetectionEnabled = true;
        }, 500);
      }
    });

    this.physics.add.overlap(gameState.boundaries.children.entries[2], gameState.ufos, (boundary, ufo) => {
      ufo.destroy();
    })

    this.physics.add.overlap(gameState.telescope, gameState.ufos, () => {
      if (gameState.ufoDetectionEnabled) {
        console.log("UFO sighted");
        gameState.ufoDetectionEnabled = false;
        setTimeout(() => {
          gameState.ufoDetectionEnabled = true;
        }, 500);
      }
    });

    gameState.target = this.add.group();
    gameState.bottomBar.setDepth(3);

    const targetSquare = this.add.rectangle(400, 600, 100, 100, 0x000000).setOrigin(0);
    gameState.target.add(targetSquare);
    gameState.target.setDepth(3);
    this.pickTarget();

    // for (let i = 0; i < 100; i++) {
    //   const xCoord = Math.random() * (gameState.canvasWidth - 20) + 10;
    //   const yCoord = Math.random() * (gameState.canvasHeight - 20) + 10;
    //   const star = this.add.image(xCoord, yCoord, 'star').setScale(0.1);
    //   gameState.stars.add(star);
    // }

		// gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

		// const platforms = this.physics.add.staticGroup();

		// platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

		// gameState.scoreText = this.add.text(195, 485, 'Score: 0', { fontSize: '15px', fill: '#000000' });

		// gameState.player.setCollideWorldBounds(true);

		// this.physics.add.collider(gameState.player, platforms);

		// gameState.cursors = this.input.keyboard.createCursorKeys();

		// const bugs = this.physics.add.group();

		// const bugList = ['bug1', 'bug2', 'bug3']

		// const bugGen = () => {
		// 	const xCoord = Math.random() * 640
		// 	let randomBug = bugList[Math.floor(Math.random() * 3)]
		// 	bugs.create(xCoord, 10, randomBug)
		// }

		// const bugGenLoop = this.time.addEvent({
		// 	delay: 100,
		// 	callback: bugGen,
		// 	callbackScope: this,
		// 	loop: true,
		// });

		// this.physics.add.collider(bugs, platforms, function (bug) {
		// 	bug.destroy();
		// 	gameState.score += 10;
		// 	gameState.scoreText.setText(`Score: ${gameState.score}`);
		// })

		// this.physics.add.collider(gameState.player, bugs, () => {
		// 	bugGenLoop.destroy();
		// 	this.physics.pause();
    //   this.scene.stop('GameScene');
    //   this.scene.start('EndScene');
		// 	this.add.text(180, 250, 'Game Over', { fontSize: '15px', fill: '#000000' });
		// 	this.add.text(152, 270, 'Click to Restart', { fontSize: '15px', fill: '#000000' });

		// 	this.input.on('pointerup', () => {
		// 		gameState.score = 0;
		// 		this.scene.restart();
		// 	});
		// });
	}

	update() {
    // if (this.input.activePointer.y <= 600) {
    //   if (Math.abs(this.input.activePointer.x - gameState.pointerXPos) > 2 || Math.abs(this.input.activePointer.y - gameState.pointerYPos) > 2) {
    //     gameState.pointerXPos = this.input.activePointer.x;
    //     gameState.pointerYPos = this.input.activePointer.y;
    //     gameState.telescope.x = gameState.pointerXPos;
    //     gameState.telescope.y = gameState.pointerYPos;
    //     gameState.telescopeTopRect.y = gameState.pointerYPos - 670;
    //     gameState.telescopeBottomRect.y = gameState.pointerYPos + 70;
    //     gameState.telescopeLeftRect.x = gameState.pointerXPos - 970;
    //     gameState.telescopeRightRect.x = gameState.pointerXPos + 70;
    //   }
    // }
    
		// if (gameState.cursors.left.isDown) {
		// 	gameState.player.setVelocityX(-160);
		// } else if (gameState.cursors.right.isDown) {
		// 	gameState.player.setVelocityX(160);
		// } else {
		// 	gameState.player.setVelocityX(0);
		// }
	}

  moveTelescopeToPointer() {
    gameState.pointerXPos = this.input.activePointer.x;
    gameState.pointerYPos = this.input.activePointer.y;
    gameState.telescope.x = gameState.pointerXPos;
    gameState.telescope.y = gameState.pointerYPos;
    gameState.telescopeTopRect.y = gameState.pointerYPos - 670;
    gameState.telescopeBottomRect.y = gameState.pointerYPos + 70;
    gameState.telescopeLeftRect.x = gameState.pointerXPos - 970;
    gameState.telescopeRightRect.x = gameState.pointerXPos + 70;
  }

  pickTarget() {
    let randNumber = Math.floor(Math.random() * gameState.backgroundTiles.children.entries.length);

    while (gameState.backgroundTiles.children.entries[randNumber].found) {
      randNumber = Math.floor(Math.random() * gameState.backgroundTiles.children.entries.length);
    }

    console.log(randNumber);

    // gameState.target.clear(true);

    // const targetSquare = this.add.rectangle(400, 600, 100, 100, 0x000000).setOrigin(0);
    // gameState.target.add(targetSquare);

    gameState.target.number = randNumber;

    if (gameState.target.stars) {
      gameState.target.stars.clear(true);
    } else {
      gameState.target.stars = this.add.group();
    }
    
    gameState.target.xOrigin = gameState.backgroundTiles.children.entries[randNumber].x;
    gameState.target.yOrigin = gameState.backgroundTiles.children.entries[randNumber].y;
    // console.log(randNumber);
    gameState.backgroundTiles.children.entries[randNumber].stars.children.entries.forEach(star => {
      const xOffset = star.x - gameState.target.xOrigin;
      const yOffset = star.y - gameState.target.yOrigin;
      const starToGenerate = this.add.image(400 + xOffset, 600 + yOffset, star.texture.key).setScale(star._scaleX);
      gameState.target.stars.add(starToGenerate);
    });
    gameState.target.stars.setDepth(3);
  }

  markCorrect(number) {
    gameState.backgroundTiles.children.entries[number].found = true;
    gameState.backgroundTiles.children.entries[number].stars.children.entries.forEach(star => {
      star.setTint(0x19fa4d);
    })
    gameState.backgroundTiles.children.entries[number].starCircles.children.entries.forEach(circle => {
      circle.visible = true;
    })
  }

  isGameFinished() {
    return gameState.backgroundTiles.children.entries.every(tile => tile.found);
  }

}
