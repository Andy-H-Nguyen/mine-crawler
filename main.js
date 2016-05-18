var DunCrawl = DunCrawl || {};

DunCrawl.game = new Phaser.Game(360, 640, Phaser.AUTO);

DunCrawl.game.state.add('Boot', DunCrawl.BootState);
DunCrawl.game.state.add('Preload', DunCrawl.PreloadState);
DunCrawl.game.state.add('Game', DunCrawl.GameState);

DunCrawl.game.state.start('Boot');
