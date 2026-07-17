Ext.define('DEMO.view.pages.UserPage.UserPage_View', {
    extend: 'Ext.container.Container',
    xtype: 'UserPage_View',
    controller: 'userview',
    viewModel: 'userview',
    requires: [
        'DEMO.view.pages.UserPage.UserPage_ViewGrid'
    ],
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">User Management</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL USERS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">18,765</div><div style="font-size:12px;color:#22c55e;">▲ +2.6% last 7 days</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">ACTIVE USERS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">14,320</div><div style="font-size:12px;color:#22c55e;">▲ +3.1%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">NEW SIGNUPS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">842</div><div style="font-size:12px;color:#22c55e;">▲ +18.4%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">CHURN RATE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">2.4%</div><div style="font-size:12px;color:#ef4444;">▼ +0.3%</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'UserPage_ViewGrid'
        }
    ]
});
