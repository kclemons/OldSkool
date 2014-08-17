var BackgroundLayer = cc.Layer.extend({
    _tileMap: null,
    speed: 3.5,
    spriteSheet: null,
    collideObjects: [],
    player: null,
    ctor: function () {
        this._super();

        // clean old array here
        this.objects = [];

        this.init();
    },

    init: function () {
        this._super();

        //create the background image and position it at the center of screen
        var winSize = cc.Director.getInstance().getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        this._tileMap = cc.TMXTiledMap.create(s_tilemap);
        this._tileMap.setPosition(0, 0);
        this.player = uz.bgPlayer;

        this.addChild(this._tileMap);

        //loads the boudaries and other objects in the game...
        this.loadObjects();
    },
    moveLeft: function () {
        var xCord = this._position.x;
        var yCord = this._position.y;
        var spd = this.speed;
        if (this.noCollide(-spd, 0)) {
            this.setPosition(xCord + spd, yCord);
        }

    },
    moveRight: function () {
        var xCord = this._position.x;
        var yCord = this._position.y;
        var spd = this.speed;
        if (this.noCollide(spd, 0)) {
            this.setPosition(xCord - spd, yCord);
        }
    },
    moveUp: function () {
        var xCord = this._position.x;
        var yCord = this._position.y;
        var spd = this.speed;
        if (this.noCollide(0, spd)) {
            this.setPosition(xCord, yCord - spd);
        }
    },
    moveDown: function () {
        var xCord = this._position.x;
        var yCord = this._position.y;
        var spd = this.speed;
        if (this.noCollide(0, -spd)) {
            this.setPosition(xCord, yCord + spd);
        }
    },
    noCollide: function (spdX, spdY) {
        var noCollision = true;
        uz.bgPlayer.setPosition(uz.player._position.x - uz.bg._position.x + spdX, uz.player._position.y - uz.bg._position.y + spdY - uz.playerBoundOffset);
        for (var i = 0; i < this.collideObjects.length; i++) {
            if (cc.rectIntersectsRect(uz.bgPlayer.getBoundingBox(), this.collideObjects[i].getBoundingBox())) {
                noCollision = false;
            }
        }
       return noCollision
    },
    loadObjects: function () {
        // add collide Objs
        var collideGroup = this._tileMap.getObjectGroup("collide");
        var collideArr = collideGroup.getObjects();
        for (var i = 0; i < collideArr.length; i++) {
            var obj = collideArr[i];

            var sprite = cc.Sprite.create();
            sprite.setTextureRect(cc.rect(0, 0, obj.width, obj.height));
            //sprite.setColor(cc.BLUE);
            sprite.setColor(cc.c3b(0, 0, 255));
            var opacNum = 0;
            if (uz.debug) {
                opacNum = 25;
            }
            sprite.setOpacity(opacNum);
            sprite.setPosition(obj.x + obj.width / 2, obj.y + obj.height / 2);
            this.addChild(sprite, 100);
            this.collideObjects.push(sprite);
        }
    }
});