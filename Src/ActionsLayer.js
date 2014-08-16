var ActionsLayer = cc.Layer.extend({
    keyboardArrows: {},
    spriteSheet: null,
    player: null,
    playerState: null,
    heroDownAnim: null,
    heroUpAnim: null,
    heroLeftAnim: null,
    heroRightAnim: null,
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();


        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_heroplist);
        this.spriteSheet = cc.SpriteBatchNode.create(s_heroSprite);
        this.addChild(this.spriteSheet);

        this.initAction();

        this.player = cc.Sprite.createWithSpriteFrameName("down1.png");
        var contentSize = this.player.getContentSize();

        this.player.runAction(this.heroDownAnim);

        this.spriteSheet.addChild(this.player);
        this.player.setPosition(winSize.width/2, winSize.height/2);
        uz.player = this.player;
        this.playerState = "down";

        uz.bgPlayer = cc.Sprite.create();
        uz.bgPlayer.setTextureRect(cc.rect(0, 0, uz.player._contentSize.width, uz.player._contentSize.height / 2));
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
    onExit: function () {
        this.heroDownAnim.release();
        this.heroLeftAnim.release();
        this.heroRightAnim.release();
        this.heroUpAnim.release();

        this._super();
    },
    initAction: function () {
        // init runningAction
        var animFrames = [];
        // num equal to spriteSheet
        //down action
        for (var i = 1; i < 5; i++) {
            var str = "down" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.1);
        this.heroDownAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroDownAnim.retain();
        // init up action
        animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "up" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroUpAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroUpAnim.retain();
        //left action
        animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "left" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroLeftAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroLeftAnim.retain

        animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "right" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroRightAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroRightAnim.retain();
      
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
             
            if (this.keyboardArrows.up) {
                uz.bg.moveLeft();
            }else {
                uz.bg.moveLeft();
                if (this.playerState !== "left") {
                    this.player.stopAllActions();
                    this.player.runAction(this.heroLeftAnim);
                    this.playerState = "left";
                }
            }
            
            
        }
        if (this.keyboardArrows.right) {
            uz.bg.moveRight();
            if (this.playerState !== "right") {
                this.player.stopAllActions();
                this.player.runAction(this.heroRightAnim);
                this.playerState = "right";
            }
        }
        if (this.keyboardArrows.up) {
            uz.bg.moveUp();
            if (this.playerState !== "up") {
                this.player.stopAllActions();
                this.player.runAction(this.heroUpAnim);
                this.playerState = "up";
            }
        }
        if (this.keyboardArrows.down) {
            uz.bg.moveDown();
            if (this.playerState !== "down") {
                this.player.stopAllActions();
                this.player.runAction(this.heroDownAnim);
                this.playerState = "down";
            }
        }


        //this actually works pretty well...need to investigate it further.
        //potential camera changes...
        //this.runAction(cc.Follow.create(uz.bg._tileMap, cc.rect(winSize.width/2, winSize.height/2, uz.bg._tileMap.width * 2 - 100, uz.bg._tileMap.height)));
    }
});