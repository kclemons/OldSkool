var GameScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        //add three layer in the right order
        this.addChild(new BackgroundLayer());
        this.addChild(new ActionsLayer());
        this.addChild(new StatusLayer());
    }
});