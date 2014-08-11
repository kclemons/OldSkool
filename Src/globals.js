var bgLayer = null;
var player = null;

// collision type for chipmunk
if (typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.bg = 0;
    SpriteTag.collide = 1;
    SpriteTag.player = 2;
};
