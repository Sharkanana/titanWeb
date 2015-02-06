
/**
 * A space on the main movement game board
 */
Ext.define('TitanWeb.view.Space', {
    extend: 'Ext.draw.sprite.Circle',
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
    orientation: 'up',

    constructor: function(config) {
        var me = this;

        config.x = config.xPos * config.myScale + config.myPadding;
        config.y = config.yPos * config.myScale + config.myPadding;
        config.fillStyle = TitanWeb.view.Space.TERRAIN_COLOR_MAP[config.terrain];
        config.strokeStyle = 'black';

        me.callParent(arguments);
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