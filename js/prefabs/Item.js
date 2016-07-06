var DunCrawl = DunCrawl || {};

DunCrawl.Item = function(state, data) {

  var position = state.board.getXYFromRowCol(data);

  Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset);

  this.game = state.game;
  this.state = state;
  this.board = state.board;
  this.row = data.row;
  this.col = data.col;
  this.data = data;

  this.anchor.setTo(0.5);

  //invisible by default
  this.visible = false;

  this.inputEnabled = true;
  this.events.onInputDown.add(this.collect, this);
};

DunCrawl.Item.prototype = Object.create(Phaser.Sprite.prototype);
DunCrawl.Item.prototype.constructor = DunCrawl.Unit;

DunCrawl.Item.prototype.collect = function() {

  //consumable items
  if(this.data.type == 'consumable') {
    this.state.playerStats.health += this.data.health;
    this.state.playerStats.attack += this.data.attack;
    this.state.playerStats.defense += this.data.defense;
    this.state.playerStats.gold += this.data.gold;

    //refresh stats
    this.state.refreshStats();

    //show map
    this.board.clearDarknessTile(this, true);

    //items is consumed
    this.kill();
  }

  //key collection
  else if(this.data.type == 'key') {
    this.state.playerStats.hasKey = true;

    //refresh stats
    this.state.refreshStats();

    //show map
    this.board.clearDarknessTile(this, true);

    //items is consumed
    this.kill();
  }

  //exit door
  else if(this.data.type == 'exit') {

    //show map
    this.board.clearDarknessTile(this, true);

    //open if you have the key
    if(this.state.playerStats.hasKey) {
      this.state.playerStats.hasKey = false;
      this.state.nextLevel();
      return;
    }
  }
};