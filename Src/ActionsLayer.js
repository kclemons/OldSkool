var ActionsLayer = cc.Layer.extend({
    keyboardArrows: {},
    spriteSheet: null,
    player: null,
    heroProps: {
        heroDirection: null,
        heroDownAnim: null,
        heroUpAnim: null,
        heroLeftAnim: null,
        heroRightAnim: null,
        heroStandDown: null,
        heroStandUp: null,
        heroStandLeft: null,
        heroStandRight: null,
    },
    numArrowKeysPressed: 0,
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

        this.player.runAction(this.heroProps.heroStandDown);

        this.spriteSheet.addChild(this.player);
        this.player.setPosition(winSize.width / 2, winSize.height / 2);
        uz.player = this.player;
        this.heroProps.heroDirection = "stand";

        uz.bgPlayer = cc.Sprite.create();
        uz.bgPlayer.setTextureRect(cc.rect(0, 0, uz.player._contentSize.width, uz.player._contentSize.height / 2));
        uz.bgPlayer.setColor(cc.RED);
        var opacNum = 0;
        if (uz.debug) {
            opacNum = 128;
        }
        uz.bgPlayer.setOpacity(opacNum);
        uz.bgPlayer.setPosition(uz.player._position.x - uz.bg._position.x, uz.player._position.y - uz.bg._position.y - uz.playerBoundOffset);
        uz.bg.addChild(uz.bgPlayer, 100);


        this.setTouchEnabled(true);
        this.setMouseEnabled(true);

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
        this.heroProps.heroDownAnim.release();
        this.heroProps.heroLeftAnim.release();
        this.heroProps.heroRightAnim.release();
        this.heroProps.heroUpAnim.release();

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
        this.heroProps.heroDownAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroDownAnim.retain();
        // init up action
        animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "up" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroUpAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroUpAnim.retain();
        //left action
        animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "left" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroLeftAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroLeftAnim.retain

        //right action
        animFrames = [];
        for (var i = 1; i < 5; i++) {
            var str = "right" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroRightAnim = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroRightAnim.retain();


        //standing down action
        animFrames = [];
        for (var i = 1; i < 3; i++) {
            var str = "standDown" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroStandDown = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroStandDown.retain();

        //standing up action
        animFrames = [];
        for (var i = 1; i < 3; i++) {
            var str = "standUp" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroStandUp = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroStandUp.retain();

        //standing left action
        animFrames = [];
        for (var i = 1; i < 3; i++) {
            var str = "standLeft" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroStandLeft = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroStandLeft.retain();

        //standing right action
        animFrames = [];
        for (var i = 1; i < 3; i++) {
            var str = "standRight" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        animation = cc.Animation.create(animFrames, 0.1);
        this.heroProps.heroStandRight = cc.RepeatForever.create(cc.Animate.create(animation));
        this.heroProps.heroStandRight.retain();
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
    doPlayerAttack:function(loc){
        cc.log('attack!');
    },
    onMouseUp: function (event) {
        var location = event.getLocation();
        this.doPlayerAttack(location);
    },
    doSingleMove: function () {
        if (this.keyboardArrows.left) {
            uz.bg.moveLeft();
            if (this.heroProps.heroDirection !== "left") {
                this.player.stopAllActions();
                this.player.runAction(this.heroProps.heroLeftAnim);
                this.heroProps.heroDirection = "left";
            }
        } else if (this.keyboardArrows.right) {
            uz.bg.moveRight();
            if (this.heroProps.heroDirection !== "right") {
                this.player.stopAllActions();
                this.player.runAction(this.heroProps.heroRightAnim);
                this.heroProps.heroDirection = "right";
            }
        } else if (this.keyboardArrows.up) {
            uz.bg.moveUp();
            if (this.heroProps.heroDirection !== "up") {
                this.player.stopAllActions();
                this.player.runAction(this.heroProps.heroUpAnim);
                this.heroProps.heroDirection = "up";
            }
        } else if (this.keyboardArrows.down) {
            uz.bg.moveDown();
            if (this.heroProps.heroDirection !== "down") {
                this.player.stopAllActions();
                this.player.runAction(this.heroProps.heroDownAnim);
                this.heroProps.heroDirection = "down";
            }
        }
    },
    doPlayerStand: function () {
        if (this.heroProps.heroDirection !== "stand") {
            switch (this.heroProps.heroDirection) {
                case "down":
                    this.player.stopAllActions();
                    this.player.runAction(this.heroProps.heroStandDown);
                    this.heroProps.heroDirection = "stand";
                    break;
                case "up":
                    this.player.stopAllActions();
                    this.player.runAction(this.heroProps.heroStandUp);
                    this.heroProps.heroDirection = "stand";
                    break;
                case "left":
                    this.player.stopAllActions();
                    this.player.runAction(this.heroProps.heroStandLeft);
                    this.heroProps.heroDirection = "stand";
                    break;
                case "right":
                    this.player.stopAllActions();
                    this.player.runAction(this.heroProps.heroStandRight);
                    this.heroProps.heroDirection = "stand";
                    break;
                default:
                    //do nothing
                    break;
            }
        }

    },
    doDoubleMove: function () {

        if (this.keyboardArrows.up) {
            uz.bg.moveUp();
            if (this.keyboardArrows.left) {
                uz.bg.moveLeft();
            }
            if (this.keyboardArrows.right) {
                uz.bg.moveRight();
            }
        }

        if (this.keyboardArrows.down) {
            uz.bg.moveDown();
            if (this.keyboardArrows.left) {
                uz.bg.moveLeft();
            }
            if (this.keyboardArrows.right) {
                uz.bg.moveRight();
            }
        }
    },
    updatePlayerMovement: function () {
        switch (this.numArrowKeysPressed) {
            case 0:
                //doNothing
                this.doPlayerStand();
                break;
            case 1:
                this.doSingleMove();
                break;
            case 2:
                //do MultiMove
                this.doDoubleMove();
                break;
            default:
                //doNothing
                this.doPlayerStand();
                break;
        }

    },
    update: function (dt) {
        this.numArrowKeysPressed = 0;
        this.numArrowKeysPressed = this.keyboardArrows.left ? this.numArrowKeysPressed + 1 : this.numArrowKeysPressed;
        this.numArrowKeysPressed = this.keyboardArrows.up ? this.numArrowKeysPressed + 1 : this.numArrowKeysPressed;
        this.numArrowKeysPressed = this.keyboardArrows.down ? this.numArrowKeysPressed + 1 : this.numArrowKeysPressed;
        this.numArrowKeysPressed = this.keyboardArrows.right ? this.numArrowKeysPressed + 1 : this.numArrowKeysPressed;
        this.updatePlayerMovement();

        //this actually works pretty well...need to investigate it further.
        //potential camera changes...
        //this.runAction(cc.Follow.create(uz.bg._tileMap, cc.rect(winSize.width/2, winSize.height/2, uz.bg._tileMap.width * 2 - 100, uz.bg._tileMap.height)));
    }
});