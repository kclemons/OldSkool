var BackgroundLayer = cc.Layer.extend({
    _tileMap: null,
    speed: 5,
    space: null,
    spriteSheet: null,
    collideObjects: [],
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
       
        
        this.addChild(this._tileMap);

        this.loadObjects();
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
    },
    loadObjects: function () {
        // add collide Objs
        var collideGroup = this._tileMap.getObjectGroup("collide");
        var collideArr = collideGroup.getObjects();
        for (var i = 0; i < collideArr.length; i++) {
            var obj = collideArr[i];
            this.objects.push(obj);

            var body = new cp.StaticBody();
            body.setPos(cc.p(obj.x, obj.y));
           var thisObj = new cp.BoxShape(body,
                obj.width,
                obj.height);
           thisObj.setCollisionType(SpriteTag.collide);

           //thisObj.addCollisionHandler(SpriteTag.player, SpriteTag.collide,
           //this.collisionWallBegin.bind(this), null, null, null);
           

           this.collideObjects.push(thisObj);
        }
    },
    collisionWallBegin: function (arbiter, space) {
        cc.log("==game over");
    },
});