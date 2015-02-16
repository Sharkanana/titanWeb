
/**
 * A space on the main movement game board
 */
Ext.define('TitanWeb.view.Space', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.space',
    type: 'space',

    /**
     * x position in the grid
     */
    xPos: null,

    /**
     * y position in the grid
     */
    yPos: null,

    /**
     * type of terrain for this space
     */
    terrain: null,

    /**
     * marks the direction the vertical exit will be oriented
     */
    orientation: 'top',

    /**
     * settings for movement arrows
     */
    left: null,
    right: null,
    up: null,
    down: null,

    /**
     * scale for space spacing
     */
    myScale: null,

    constructor: function(config) {
        var me = this,
            scale = config.myScale,
            halfScale = scale / 2,
            xTrans = scale * Math.sin(me.degToRad(30)),
            yTrans = scale * Math.sin(me.degToRad(60)),
            x = config.xPos * scale + scale,
            isBot = config.orientation === 'bot',
            startingY = (isBot ? yTrans/2 : 0) + 10,
            y = startingY + ((isBot ? (config.yPos-1) : config.yPos) * scale * .85),
            bs = function(xAdjust, yAdjust) {
                x += xAdjust;
                y += yAdjust;
                config.path += 'L' + x + ' ' + y + ' ';
            };

        me.initX = x;
        me.initY = y;
        me.xTrans = xTrans;
        me.yTrans = yTrans;

        config.path = 'M'+x+' '+y+' ';

        if(isBot) {
            bs(halfScale/2, 0);
            bs(xTrans, yTrans);
            bs(-xTrans/2, yTrans/2);
            bs(-scale, 0);
            bs(-xTrans/2, -yTrans/2);
            bs(xTrans, -yTrans);
            bs(halfScale/2, 0);
        }
        else {
            bs(scale/2, 0);
            bs(xTrans/2, yTrans/2);
            bs(-xTrans, yTrans);
            bs(-scale/2, 0);
            bs(-xTrans, -yTrans);
            bs(xTrans/2, -yTrans/2);
            bs(scale/2, 0);
        }

        config.fillStyle = TitanWeb.view.Space.TERRAIN_COLOR_MAP[config.terrain];
        config.strokeStyle = 'black';
        config.lineWidth = 2;

        me.callParent(arguments);
    },

    degToRad: function(deg) {
        return deg / 180 * Math.PI;
    },

    /**
     * Build the sprites for the directional arrows
     */
    buildIndicators: function() {
        var me = this,
            arrows = [],
            scale = me.myScale,
            isTop = me.orientation === 'top';

        if(me.left) {
            if(isTop) {
                arrows.push(me.buildIndicator(me.left, me.initX - scale/2 - me.xTrans/4, me.initY + me.yTrans * .75));
            }
            else {
                arrows.push(me.buildIndicator(me.left, me.initX - scale/4 - me.xTrans/4, me.initY + me.yTrans/4));
            }
        }

        if(me.right) {
            if(isTop) {
                arrows.push(me.buildIndicator(me.right, me.initX + scale/2 - me.xTrans/4, me.initY + me.yTrans * 1.25));
            }
            else {
                arrows.push(me.buildIndicator(me.right, me.initX + scale/4 + me.xTrans * .75, me.initY + me.yTrans * .75));
            }
        }

        if(me.up) {
            arrows.push(me.buildIndicator(me.up, me.initX + me.xTrans/2, me.initY));
        }

        if(me.down) {
            arrows.push(me.buildIndicator(me.down, me.initX - me.xTrans/2, me.initY + me.yTrans * 1.5));
        }

        return arrows;
    },

    buildIndicator: function(type, x, y) {
        var me = this,
            isTop = me.orientation === 'top';

        switch(type) {
            case 'circle':
                return {
                    type: 'circle',
                    r: 5,
                    x: x,
                    y: y,
                    fillStyle: 'white',
                    strokeStyle: 'black',
                    zIndex: 1
                };
            case 'square':
                return {
                    type: 'rect',
                    x: x - 5,
                    y: y - 5,
                    width: 10,
                    height: 10,
                    fillStyle: 'white',
                    strokeStyle: 'black',
                    zIndex: 1
                };
        }
    },

    statics: {
        TERRAIN_COLOR_MAP: {
            jungle: 'darkgreen',
            marsh: 'purple',
            plains: 'yellow',
            brush: '#996633',
            hills: '#663300',
            tundra: 'lightblue',
            mountains: 'red',
            desert: 'orange',
            tower: 'gray',
            swamp: 'blue',
            woods: 'lightgreen'
        }
    }
});