Ext.define('DEMO.view.pages.ProductPage.ProductPage_View', {
    extend: 'Ext.container.Container',
    xtype: 'ProductPage_View',
    controller: 'productview',
    viewModel: 'productview',
    requires: [
        'DEMO.view.pages.ProductPage.ProductPage_ViewGrid'
    ],
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Product Management</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL PRODUCTS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">4,876</div><div style="font-size:12px;color:#22c55e;">▲ +0.2% last 7 days</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">IN STOCK</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">3,542</div><div style="font-size:12px;color:#22c55e;">72.6%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">LOW STOCK</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">892</div><div style="font-size:12px;color:#f97316;">18.3%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">OUT OF STOCK</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">442</div><div style="font-size:12px;color:#ef4444;">9.1%</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'ProductPage_ViewGrid'
        }
    ]
});
