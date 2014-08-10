var ActionsLayer = cc.Layer.extend({
    player: null,
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();


        this.player = cc.Sprite.create(s_player);
        this.player.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(this.player);
    }
});