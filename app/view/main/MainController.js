/**
 * main controller
 */
Ext.define('TitanWeb.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
    ],

    alias: 'controller.main',

    startNewGame: function () {

        var me = this,
            gameBoard = me.lookupReference('gameBoard'),
            surface = gameBoard.getSurface();



        gameBoard.renderFrame();
    },

    drawPiece: function(surface, x, y) {
        surface.add({
            type: 'circle',
            fill: '#ccc',
            radius: 50,
            x: x,
            y: y
        });
    }
});
