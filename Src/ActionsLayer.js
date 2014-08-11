var ActionsLayer = cc.Layer.extend({
    player: null,
    keyboardArrows: {},
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super();


        player = cc.Sprite.create(s_player);
        player.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(player);

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
            bgLayer.moveLeft();
        }
        if (this.keyboardArrows.right) {
            bgLayer.moveRight();
        }
        if (this.keyboardArrows.up) {
            bgLayer.moveUp();
        }
        if (this.keyboardArrows.down) {
            bgLayer.moveDown();
        }
    }
});