
/**
 * A space on the main movement game board
 */
Ext.define('TitanWeb.view.Space', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.space',
    type: 'space',

    /**
     * scale for space spacing
     */
    myScale: null,

    /**
     * padding from borders of draw container
     */
    myPadding: null,

    /**
     * type of terrain for this space
     */
    terrain: null,

    /**
     * marks the direction the vertical exit will be oriented
     */
    orientation: 'top',

    constructor: function(config) {
        var me = this,
            scale = config.myScale,
            x = config.xPos * scale + scale,
            isBot = config.orientation === 'bot',
            startingY = (isBot ? scale/2 : 0) + 20,
            y = startingY + ((isBot ? (config.yPos-1) : config.yPos) * scale * .7),
            bs = function(xAdjust, yAdjust) {
                x += xAdjust;
                y += yAdjust;
                config.path += 'L' + x + ' ' + y + ' ';
            };

        if(isBot) {
            config.path = 'M'+x+' '+y+' ';
            bs(scale/2, 0);
            bs(scale/2, scale/2);
            bs(-scale/4, scale/4);
            bs(-scale, 0);
            bs(-scale/4, -scale/4);
            bs(scale/2, -scale/2);
        }
        else {
            x = x-scale/4;
            config.path = 'M'+x+' '+y+' ';
            bs(scale, 0);
            bs(scale/4, scale/4);
            bs(-scale/2, scale/2);
            bs(-scale/2, 0);
            bs(-scale/2, -scale/2);
            bs(scale/4, -scale/4);
        }


        config.fillStyle = TitanWeb.view.Space.TERRAIN_COLOR_MAP[config.terrain];
        config.strokeStyle = 'black';
        config.lineWidth = 2;

        me.callParent(arguments);
    },

    buildSegment: function() {

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