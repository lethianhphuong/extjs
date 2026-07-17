Ext.define('DEMO.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',
    id: 'app-main',

    requires: [
        'Ext.list.Tree',
        'DEMO.view.main.Sidebar',
        'DEMO.view.main.Header',
        'DEMO.view.main.MainController',
        'DEMO.view.main.MainModel',
        'DEMO.view.dashboard.Dashboard_View'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'border',
        regions: true
    },

    defaults: {
        split: false
    },

    items: [
        // --- West: Sidebar ---
        {
            xtype: 'app-sidebar',
            region: 'west'
        },

        // --- North: Header ---
        {
            xtype: 'app-header',
            region: 'north'
        },

        // --- Center: Content Area (Card Layout) ---
        {
            xtype: 'container',
            reference: 'centerRegion',
            region: 'center',
            layout: 'card',
            itemId: 'centerRegion',
            items: [{
                xtype: 'Dashboard_View',
                itemId: 'view-app'
            }]
        }
    ]
});
