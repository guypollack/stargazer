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
	}


	create() {
    gameState.bgColors = {
      0: 0x13102B,
      1: 0x15152D,
      2: 0x181435,
      3: 0x1C183D,
      4: 0x1E1B46,
      5: 0x231F52
    }

    gameState.canvasWidth = document.querySelector("canvas").offsetWidth;
    gameState.canvasHeight = document.querySelector("canvas").offsetHeight;


    gameState.backgroundTiles = this.add.group();
    // const testRect = this.add.rectangle(0,0, 150, 150, 0xff0000)
    // gameState.backgroundTiles.add(testRect);
    let num = 0;
    for (let i = 0; i < 900; i += 100) {
      for (let j = 0; j < 600; j += 100) {
        const bgColor = gameState.bgColors[j / 100];
        const tile = this.add.rectangle(i, j, 100, 100, bgColor).setOrigin(0);
        tile.strokeColor = 0xa7f66c;
        // tile.isStroked = true;
        tile.lineWidth = 2
        tile.column = i / 100;
        tile.row = j / 100;
        tile.number = ((i * 6 + j) / 100);
        tile.removed = false;
        tile.setInteractive();
        tile.on('pointerup', () => {
          if (tile.number === gameState.target.number) {
            // alert("You win!");
            this.markCorrect(tile.number);
            this.pickTarget();
          }
        })
        gameState.backgroundTiles.add(tile);
      }
    }

    console.log(gameState.backgroundTiles);
    
    // gameState.backgroundTiles.children.entries[0].y = 600;
    const randNumber = Math.floor(Math.random() * gameState.backgroundTiles.children.entries.length);
    // gameState.backgroundTiles.children.entries[randNumber].y = 600;

    // gameState.stars = this.add.group();


    for (let i = 0; i < gameState.backgroundTiles.children.entries.length; i++) {
      gameState.backgroundTiles.children.entries[i].stars = this.add.group();
      for (let j = 0; j < 8; j++) {
        const xOrigin = gameState.backgroundTiles.children.entries[i].x;
        const yOrigin = gameState.backgroundTiles.children.entries[i].y;
        const xCoord = xOrigin +  Math.random() * 85 + 5;
        const yCoord = yOrigin + Math.random() * 85 + 5;
        const star = this.add.image(xCoord, yCoord, 'star').setScale(0.1);
        gameState.backgroundTiles.children.entries[i].stars.add(star);
      }
      // console.log(tile);

    }

    console.log(gameState.stars);

    gameState.target = this.add.group();
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
		// if (gameState.cursors.left.isDown) {
		// 	gameState.player.setVelocityX(-160);
		// } else if (gameState.cursors.right.isDown) {
		// 	gameState.player.setVelocityX(160);
		// } else {
		// 	gameState.player.setVelocityX(0);
		// }
	}

  pickTarget() {
    let randNumber = Math.floor(Math.random() * gameState.backgroundTiles.children.entries.length);

    while (gameState.backgroundTiles.children.entries[randNumber].removed) {
      randNumber = Math.floor(Math.random() * gameState.backgroundTiles.children.entries.length);
    }

    gameState.target.clear(true);

    const targetSquare = this.add.rectangle(400, 600, 100, 100, 0x000000).setOrigin(0);
    gameState.target.add(targetSquare);

    gameState.target.number = randNumber;

    gameState.target.stars = this.add.group();

    gameState.target.xOrigin = gameState.backgroundTiles.children.entries[randNumber].x;
    gameState.target.yOrigin = gameState.backgroundTiles.children.entries[randNumber].y;
    // console.log(randNumber);
    gameState.backgroundTiles.children.entries[randNumber].stars.children.entries.forEach(star => {
      const xOffset = star.x - gameState.target.xOrigin;
      const yOffset = star.y - gameState.target.yOrigin;
      const starToGenerate = this.add.image(400 + xOffset, 600 + yOffset, 'star').setScale(0.1);
      gameState.target.stars.add(starToGenerate);
    });

  }

  markCorrect(number) {
    gameState.backgroundTiles.children.entries[number].removed = true;
    gameState.backgroundTiles.children.entries[number].stars.children.entries.forEach(star => {
      star.setTint(0x19fa4d);
    })
  }
}
