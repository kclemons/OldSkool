var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        uz.bg = new BackgroundLayer();
        //add three layer in the right order
        this.addChild(uz.bg);
        this.addChild(new ActionsLayer());
        this.addChild(new StatusLayer());
    }
});