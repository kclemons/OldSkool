var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        //create the background image and position it at the center of screen
        var winSize = cc.Director.getInstance().getWinSize();
        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);

        var _tileMap = cc.TMXTiledMap.create(s_tilemap);
        _tileMap.setPosition(0, 0);
       

        this.addChild(_tileMap);
    }
});