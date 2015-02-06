/**
 * main controller
 */
Ext.define('TitanWeb.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'TitanWeb.view.Space'
    ],

    alias: 'controller.main',

    startNewGame: function () {

        var me = this;

        Ext.Ajax.request({
            url: 'resources/boards/Standard.json',
            success: function(results) {
                me.drawBoard(Ext.decode(results.responseText));
            }
        });
    },

    drawBoard: function(board) {
        var me = this,
            gameBoard = me.lookupReference('gameBoard'),
            surface = gameBoard.getSurface(),
            radius = 25,
            scale = 55,
            padding = 30;

        Ext.each(board.spaces, function(space) {
            var newSpace = surface.add(Ext.create('TitanWeb.view.Space', Ext.apply(space, {
                r: radius,
                myScale: scale,
                myPadding: padding
            })));
        });

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
