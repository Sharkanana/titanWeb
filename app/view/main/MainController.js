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
            scale = gameBoard.getHeight() / 12;

        Ext.each(board.spaces, function(space) {
            surface.add(Ext.create('TitanWeb.view.Space', Ext.apply(space, {
                myScale: scale
            })));
        });

        gameBoard.renderFrame();
    }
});
