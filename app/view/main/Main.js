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
            width: 250,
            split: true,
            layout: 'vbox',
            defaults: {
                xtype: 'button'
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
            xtype: 'draw'
        }
    ]
});
