var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        bgLayer = new BackgroundLayer();
        //add three layer in the right order
        this.addChild(bgLayer);
        this.addChild(new ActionsLayer());
        this.addChild(new StatusLayer());
    }
});