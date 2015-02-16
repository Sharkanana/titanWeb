
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
    buildArrows: function() {
        var me = this,
            arrows = [],
            scale = me.myScale,
            isTop = me.orientation === 'top';

        if(me.left) {
            if(isTop) {
                arrows.push(me.buildArrow(me.initX - scale * .1,me.initY + scale * .5, me.left, true, true));
            }
            else {
                arrows.push(me.buildArrow(me.initX - scale / 3,me.initY + scale * 1/4, me.left, true, false));
            }
        }

        if(me.right) {
            if(isTop) {
                arrows.push(me.buildArrow(me.initX + scale * 1.1, me.initY + scale *.5, me.right, false, true));
            }
            else {
                arrows.push(me.buildArrow(me.initX + scale *.9, me.initY + scale *.25, me.right, false, false));
            }
        }

        if(me.up) {
            arrows.push(me.buildArrow(me.initX + scale *.4, me.initY - scale *.1, me.up, null, true));
        }

        if(me.down) {
            arrows.push(me.buildArrow(me.initX + scale *.4, me.initY + scale *.8, me.down, null, false));
        }

        return arrows;
    },

    buildArrow: function(x, y, type, isLeft, isTop) {
        //var me = this,
        //    scale = me.myScale;
        //
        //switch(type) {
        //    case 'one':
        //        return {
        //            type: 'path'
        //
        //        };
        //    case 'three':
        //        break;
        //    case 'circle':
        //        return {
        //            type: 'circle',
        //            r: scale / 6,
        //            x: x,
        //            y: y,
        //            fillStyle: 'black',
        //            zIndex: 1
        //        };
        //    case 'square':
        //        break;
        //}
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
            tower: 'white',
            swamp: 'blue',
            woods: 'lightgreen'
        }
    }
});