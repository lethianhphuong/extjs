Ext.define('DEMO.view.dashboard.Dashboard_View', {
    extend: 'Ext.container.Container',
    xtype: 'Dashboard_View',

    requires: [
        'DEMO.view.dashboard.Dashboard_ViewHeroCard',
        'DEMO.view.dashboard.Dashboard_ViewFeaturedApp',
        'DEMO.view.dashboard.Dashboard_ViewKpiCards',
        'DEMO.view.dashboard.Dashboard_ViewCharts'
    ],

    controller: 'dashboard',
    viewModel: 'dashboard',

    cls: 'dash-page',
    scrollable: 'y',
    padding: 20,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        // Row 1: Hero Card + Featured App
        {
            xtype: 'container',
            layout: 'hbox',
            align: 'stretch',
            width: '100%',
            margin: '0 0 16 0',
            height: 320,
            defaults: {
                height: 320
            },
            items: [
                {
                    xtype: 'Dashboard_ViewHeroCard'
                },
                {
                    xtype: 'Dashboard_ViewFeaturedApp'
                }
            ]
        },

        // Row 2: KPI Cards
        {
            xtype: 'Dashboard_ViewKpiCards'
        },

        // Row 3: Charts (Donut + Bar)
        {
            xtype: 'Dashboard_ViewCharts'
        }
    ]
});
