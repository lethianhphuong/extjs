Ext.define('DEMO.view.pages.Analytics.Analytics_View', {
    extend: 'Ext.container.Container',
    xtype: 'Analytics_View',
    controller: 'analytics',
    viewModel: 'analytics',
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Analytics</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">VISITORS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">28,459</div><div style="font-size:12px;color:#22c55e;">&#9650; +18.2%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">PAGE VIEWS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">142,856</div><div style="font-size:12px;color:#22c55e;">&#9650; +12.4%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">BOUNCE RATE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">38.6%</div><div style="font-size:12px;color:#ef4444;">&#9660; -2.1%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">AVG SESSION</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">4m 32s</div><div style="font-size:12px;color:#22c55e;">&#9650; +8.7%</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            height: 300,
            defaults: {
                flex: 1, margin: '0 10 0 0',
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
                padding: 16, layout: 'fit'
            },
            items: [
                { xtype: 'panel', title: 'Traffic Sources', header: { titleAlign: 'left' } },
                { xtype: 'panel', title: 'User Behavior', header: { titleAlign: 'left' }, margin: '0 0 0 10' }
            ]
        }
    ]
});
