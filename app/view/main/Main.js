/**
 * Main container
 */
Ext.define('TitanWeb.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'TitanWeb.view.main.MainController',
        'TitanWeb.view.main.MainModel',
        'Ext.draw.Container'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
            xtype: 'panel',
            bind: {
                title: '{name}'
            },
            region: 'west',
            width: 100,
            split: true,
            layout: 'vbox',
            defaults: {
                xtype: 'button',
                margin: 10
            },
            items: [
                {
                    text: 'New Game',
                    handler: 'startNewGame'
                }
            ]
        },
        {
            region: 'center',
            reference: 'gameBoard',
            xtype: 'draw',
            sprites: [
                {
                    type: 'rect',
                    fillStyle: '#3C3C3C',
                    width: '10000',
                    height: '10000'
                }
            ]
        }
    ]
});
