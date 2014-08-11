var BackgroundLayer = cc.Layer.extend({
    _tileMap: null,
    speed:5,
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        //create the background image and position it at the center of screen
        var winSize = cc.Director.getInstance().getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        this._tileMap = cc.TMXTiledMap.create(s_tilemap);
        this._tileMap.setPosition(0, 0);
       

        this.addChild(this._tileMap);
    },
    moveLeft: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
            this._tileMap.setPosition(xCord + spd, yCord);
            player._flipX = true;
    },
    moveRight: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
            this._tileMap.setPosition(xCord - spd, yCord);
            player._flipX = false;
    },
    moveUp: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
            this._tileMap.setPosition(xCord, yCord - spd);
    },
    moveDown: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
            this._tileMap.setPosition(xCord, yCord + spd);
    }
});