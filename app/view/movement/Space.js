
/**
 * A space on the main movement game board
 */
Ext.define('TitanWeb.view.Space', {
    extend: 'Ext.draw.sprite.Sprite',
    type: 'circle',
    fill: '#ff0',

    /**
     * type of terrain for this space
     */
    terrain: null,

    /**
     * marks the direction the vertical exit will be oriented
     */
    orientation: 'up',

    /**
     * Space's neighbors
     */
    verticalNeighbor: null,
    leftNeighbor: null,
    rightNeighbor: null
});