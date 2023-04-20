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
    gameState.backgroundTiles = this.add.group();
    // const testRect = this.add.rectangle(0,0, 150, 150, 0xff0000)
    // gameState.backgroundTiles.add(testRect);
    let num = 0;
    for (let i = 0; i < 900; i += 100) {
      for (let j = 0; j < 600; j += 100) {
        const bgColor = gameState.bgColors[j / 100];
        const tile = this.add.rectangle(i, j, 100, 100, bgColor).setOrigin(0);
        tile.set
        gameState.backgroundTiles.add(tile);
      }
    }
    
    gameState.stars = this.add.group();

    const testStar = this.add.image(100, 100, 'star').setScale(0.1);
    gameState.stars.add(testStar);




		// gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);

		// const platforms = this.physics.add.staticGroup();

		// platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();

		// gameState.scoreText = this.add.text(195, 485, 'Score: 0', { fontSize: '15px', fill: '#000000' });

		gameState.player.setCollideWorldBounds(true);

		this.physics.add.collider(gameState.player, platforms);

		gameState.cursors = this.input.keyboard.createCursorKeys();

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
		if (gameState.cursors.left.isDown) {
			gameState.player.setVelocityX(-160);
		} else if (gameState.cursors.right.isDown) {
			gameState.player.setVelocityX(160);
		} else {
			gameState.player.setVelocityX(0);
		}
	}
}
