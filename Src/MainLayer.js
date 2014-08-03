var audioEngine = cc.AudioEngine.getInstance();

var MainLayer = cc.LayerColor.extend({

    _monsters: [],
    _projectiles: [],
    _monstersDestroyed: 0,
    _tileMap: null,
    keyboardArrows: {},
    speed: 5,
    player: null,
    ctor: function () {

        // Rest of file...
        this._super();

        cc.associateWithNative(this, cc.LayerColor);
    },

    onEnter: function () {
        this._super();

        if ('touches' in sys.capabilities) {
            this.setTouchEnabled(true);
        }
        if ('mouse' in sys.capabilities) {
            this.setMouseEnabled(true);
        }
        this.setKeyboardEnabled(true);
        this.keyboardArrows = {
            left: false,
            right: false,
            up: false,
            down: false
        }
        this._tileMap = cc.TMXTiledMap.create(s_tilemap);
        var xCord = 0;
        var yCord = (this._tileMap.height / 2) / (winSize.height / 2);
        this._tileMap.setPosition(xCord, yCord);
        var collidableLayer = this._tileMap.getLayer("collision");

        this.addChild(this._tileMap);
        this.player = cc.Sprite.create(s_player);
        this.player.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(this.player);

        this.scheduleUpdate();

    },
    locationTapped: function (location) {
       
    },

    onMouseUp: function (event) {
        var location = event.getLocation();
        this.locationTapped(location);
    },

    onTouchesEnded: function (touches, event) {
        if (touches.length <= 0)
            return;
        var touch = touches[0];
        var location = touch.getLocation();
        this.locationTapped(location);
    },
    moveLeft: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
        if (xCord !== 0) {
            this._tileMap.setPosition(xCord + spd, yCord);
            this.player._flipX = true;
        }
    },
    moveRight: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
        if (xCord !== -Math.abs(this._tileMap._contentSize.width / 2)) {
            this._tileMap.setPosition(xCord - spd, yCord);
            this.player._flipX = false;

        }
    },
    moveUp: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
        if (!(yCord <= -Math.abs(this._tileMap._contentSize.height - winSize.height))) {
            this._tileMap.setPosition(xCord, yCord - spd);
        }
    },
    moveDown: function () {
        var xCord = this._tileMap._position.x;
        var yCord = this._tileMap._position.y;
        var spd = this.speed;
        if (!(yCord >= 0)) {
            this._tileMap.setPosition(xCord, yCord + spd);
        }
    },
    onKeyDown: function (e) {
        //make a case statement
        switch(e) {
            case cc.KEY.w:
                this.keyboardArrows.up = true;
                break;
            case cc.KEY.s:
                this.keyboardArrows.down = true;
                break;
            case cc.KEY.a:
                this.keyboardArrows.left = true;
                break;
            case cc.KEY.d:
                this.keyboardArrows.right = true;
                break;
            default:
                //do nothing
                break;
        }
    },
    onKeyUp : function(e) {
        switch (e) {
            case cc.KEY.w:
                this.keyboardArrows.up = false;
                break;
            case cc.KEY.s:
                this.keyboardArrows.down = false;
                break;
            case cc.KEY.a:
                this.keyboardArrows.left = false;
                break;
            case cc.KEY.d:
                this.keyboardArrows.right = false;
                break;
            default:
                //do nothing
                break;
        }
    },
    update: function (dt) {
        pos = this._tileMap.getPosition();
        if (this.keyboardArrows.left) {
            this.moveLeft();
        }
        if (this.keyboardArrows.right) {
            this.moveRight();
        }
        if (this.keyboardArrows.up) {
            this.moveUp();
        }
        if (this.keyboardArrows.down) {
            this.moveDown();
        }
    }

});

MainLayer.create = function () {
    var sg = new MainLayer();
    if (sg && sg.init(cc.c4b(255, 255, 255, 255))) {
        return sg;
    }
    return null;
};

MainLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = MainLayer.create();
    scene.addChild(layer);
    return scene;
};