Ext.define('DEMO.view.pages.OrderPage.OrderPage_View', {
    extend: 'Ext.container.Container',
    xtype: 'OrderPage_View',
    controller: 'orderview',
    viewModel: 'orderview',
    requires: [
        'DEMO.view.pages.OrderPage.OrderPage_ViewGrid'
    ],
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Order Management</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL ORDERS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">2,845</div><div style="font-size:12px;color:#22c55e;">▲ +12.3%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">PENDING</div><div style="font-size:28px;font-weight:800;color:#f97316;margin:8px 0;">186</div><div style="font-size:12px;color:#f97316;">Needs attention</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">SHIPPED</div><div style="font-size:28px;font-weight:800;color:#3b82f6;margin:8px 0;">428</div><div style="font-size:12px;color:#3b82f6;">In transit</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">COMPLETED</div><div style="font-size:28px;font-weight:800;color:#22c55e;margin:8px 0;">2,231</div><div style="font-size:12px;color:#22c55e;">78.4% of total</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'OrderPage_ViewGrid'
        }
    ]
});
