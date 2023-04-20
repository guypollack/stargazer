const gameState = {
	score: 0
};

const config = {
	type: Phaser.AUTO,
	width: 900,
	height: 600,
	backgroundColor: "13102B",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
	scene: [ GameScene ]
};

const game = new Phaser.Game(config);