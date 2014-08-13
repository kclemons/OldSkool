var ActionsLayer = cc.Layer.extend({
    keyboardArrows: {},
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();
        uz.player = cc.Sprite.create(s_player);
        uz.player.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(uz.player);

        uz.bgPlayer = cc.Sprite.create();
        uz.bgPlayer.setTextureRect(cc.rect(0, 0, uz.player._contentSize.width, uz.player._contentSize.height/2));
        uz.bgPlayer.setColor(cc.RED);
        var opacNum = 0;
        if (uz.debug) {
            opacNum = 128;
        }
        uz.bgPlayer.setOpacity(opacNum);
        uz.bgPlayer.setPosition(uz.player._position.x - uz.bg._position.x, uz.player._position.y - uz.bg._position.y);
        uz.bg.addChild(uz.bgPlayer, 100);

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
        this.scheduleUpdate();
    },
    createPhysicsSprite:function( pos, file, collision_type ) {
        var body = new cp.Body(1, cp.momentForBox(1, 48, 108) );
        body.setPos(pos);
        this.space.addBody(body);
        var shape = new cp.BoxShape( body, 48, 108);
        shape.setElasticity( 0.5 );
        shape.setFriction( 0.5 );
        shape.setCollisionType( collision_type );
        this.space.addShape( shape );

        var sprite = cc.PhysicsSprite.create(file);
        sprite.setBody( body );
        return sprite;
    },
    onKeyDown: function (e) {
        //make a case statement
        switch (e) {
            case 87:
                this.keyboardArrows.up = true;
                break;
            case 83:
                this.keyboardArrows.down = true;
                break;
            case 65:
                this.keyboardArrows.left = true;
                break;
            case 68:
                this.keyboardArrows.right = true;
                break;
            default:
                //do nothing
                break;
        }
    },
    onKeyUp: function (e) {
        switch (e) {
            case 87:
                this.keyboardArrows.up = false;
                break;
            case 83:
                this.keyboardArrows.down = false;
                break;
            case 65:
                this.keyboardArrows.left = false;
                break;
            case 68:
                this.keyboardArrows.right = false;
                break;
            default:
                //do nothing
                break;
        }
    },
    update: function (dt) {
        if (this.keyboardArrows.left) {
            uz.bg.moveLeft();
        }
        if (this.keyboardArrows.right) {
            uz.bg.moveRight();
        }
        if (this.keyboardArrows.up) {
            uz.bg.moveUp();
        }
        if (this.keyboardArrows.down) {
            uz.bg.moveDown();
        }
    }
});