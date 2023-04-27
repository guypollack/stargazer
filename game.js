const gameState = {
	score: 0
};

const config = {
	type: Phaser.CANVAS,
	width: 900,
	height: 720,
	backgroundColor: "13102B",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},
  fps: {
    target: 10,
    forceSetTimeOut: true
  },
	scene: [ LoadingScene, StartScene, TutorialScene, GameScene, EndScene ]
};

const game = new Phaser.Game(config);